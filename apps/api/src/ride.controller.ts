import type { NextFunction, Request, Response } from "express";
import { UserRole } from "./generated/prisma/enums";
import { DHAKA_ZONES } from "./config/zones";
import { prisma } from "./prisma";
import {
	InvalidRideRequestError,
	RideRequestNotCancellableError,
	cancelRideRequest,
	listPassengerRideHistory,
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

const paginationSchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0),
});

export async function getRideHistory(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.PASSENGER) {
		res.status(403).json({ error: "Passengers only" });
		return;
	}

	const pagination = paginationSchema.safeParse(req.query);
	if (!pagination.success) {
		res.status(400).json({ error: pagination.error.issues });
		return;
	}

	try {
		const history = await listPassengerRideHistory(
			user.userId,
			pagination.data.limit,
			pagination.data.offset,
		);
		res.json(history);
	} catch (error) {
		next(error);
	}
}

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
	const rideId = req.params.id;
	if (typeof rideId !== "string") {
		res.status(400).json({ error: "Ride request ID is required" });
		return;
	}

	try {
		const ride = await prisma.rideRequest.findUnique({
			where: { id: rideId },
		});
		if (!ride) {
			res.status(404).json({ error: "Ride request not found" });
			return;
		}

		const isOwner = ride.passengerId === user.userId;
		const [member, history] = await Promise.all([
			prisma.poolMember.findUnique({
				where: { rideRequestId: rideId },
				include: { pool: { include: { vehicle: true } } },
			}),
			prisma.rideStatusHistory.findMany({
				where: { rideRequestId: rideId },
				orderBy: { changedAt: "asc" },
			}),
		]);
		const isPoolDriver = member?.pool.vehicle.driverId === user.userId;
		if (!isOwner && !isPoolDriver) {
			res.status(403).json({ error: "Forbidden" });
			return;
		}

		res.json({ ...ride, member, history });
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
	const rideId = req.params.id;
	if (typeof rideId !== "string") {
		res.status(400).json({ error: "Ride request ID is required" });
		return;
	}

	try {
		const ride = await prisma.rideRequest.findUnique({
			where: { id: rideId },
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

		const cancelledRide = await cancelRideRequest(rideId, user.userId);
		res.json(cancelledRide);
	} catch (error) {
		if (error instanceof RideRequestNotCancellableError) {
			res.status(409).json({ error: error.message });
			return;
		}
		next(error);
	}
}