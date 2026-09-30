import type { NextFunction, Request, Response } from "express";
import { UserRole } from "./generated/prisma/enums";
import { DHAKA_ZONES } from "./config/zones";
import { prisma } from "./prisma";
import {
	InvalidRideRequestError,
	RideRequestNotCancellableError,
	cancelRideRequest,
	requestRide,
} from "./ride.service";
import { z } from "zod";

const zoneSchema = z.string().refine((zone) => DHAKA_ZONES.includes(zone), {
	message: "Zone must be a configured Dhaka zone",
});

const requestRideSchema = z
	.object({
		pickupZone: zoneSchema,
		destinationZone: zoneSchema,
		seatsRequested: z.number().int().min(1),
	})
	.refine((ride) => ride.pickupZone !== ride.destinationZone, {
		path: ["destinationZone"],
		message: "Pickup and destination zones must be different",
	});

export async function createRide(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.PASSENGER) {
		res.status(403).json({ error: "Passengers only" });
		return;
	}

	const result = requestRideSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}

	try {
		const ride = await requestRide(
			user.userId,
			result.data.pickupZone,
			result.data.destinationZone,
			result.data.seatsRequested,
		);
		res.status(201).json(ride);
	} catch (error) {
		if (error instanceof InvalidRideRequestError) {
			res.status(400).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function getRide(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}

	try {
		const ride = await prisma.rideRequest.findUnique({
			where: { id: req.params.id },
			include: {
				member: {
					include: {
						pool: { include: { vehicle: true } },
					},
				},
				history: { orderBy: { changedAt: "asc" } },
			},
		});
		if (!ride) {
			res.status(404).json({ error: "Ride request not found" });
			return;
		}

		const isOwner = ride.passengerId === user.userId;
		const isPoolDriver = ride.member?.pool.vehicle.driverId === user.userId;
		if (!isOwner && !isPoolDriver) {
			res.status(403).json({ error: "Forbidden" });
			return;
		}

		res.json(ride);
	} catch (error) {
		next(error);
	}
}

export async function cancelRide(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.PASSENGER) {
		res.status(403).json({ error: "Passengers only" });
		return;
	}

	try {
		const ride = await prisma.rideRequest.findUnique({
			where: { id: req.params.id },
			select: { passengerId: true },
		});
		if (!ride) {
			res.status(404).json({ error: "Ride request not found" });
			return;
		}
		if (ride.passengerId !== user.userId) {
			res.status(403).json({ error: "Forbidden" });
			return;
		}

		const cancelledRide = await cancelRideRequest(req.params.id, user.userId);
		res.json(cancelledRide);
	} catch (error) {
		if (error instanceof RideRequestNotCancellableError) {
			res.status(409).json({ error: error.message });
			return;
		}
		next(error);
	}
}