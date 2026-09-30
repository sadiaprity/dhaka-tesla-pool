import type { NextFunction, Request, Response } from "express";
import { RideStatus, UserRole } from "./generated/prisma/enums";
import {
	InvalidTransitionError,
	PoolNotFoundError,
	PoolNotOwnedError,
	advancePool as advancePoolService,
} from "./ride.service";
import { prisma } from "./prisma";
import {
	VehicleAlreadyRegisteredError,
	VehicleNotOwnedError,
	listVehicleHistory,
	listVehicleRequests,
	registerVehicle,
	setVehicleOnlineStatus,
} from "./vehicle.service";
import { z } from "zod";

const registerVehicleSchema = z.object({
	capacity: z.number().int().min(1),
});

const vehicleStatusSchema = z.object({
	isOnline: z.boolean(),
});

const advancePoolSchema = z.object({
	targetStatus: z.enum([
		RideStatus.ACCEPTED,
		RideStatus.DRIVER_ARRIVED,
		RideStatus.STARTED,
		RideStatus.COMPLETED,
	] as const),
});

const paginationSchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(20),
	offset: z.coerce.number().int().min(0).default(0),
});

export async function createVehicle(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.DRIVER) {
		res.status(403).json({ error: "Drivers only" });
		return;
	}

	const result = registerVehicleSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}

	try {
		const vehicle = await registerVehicle(user.userId, result.data.capacity);
		res.status(201).json(vehicle);
	} catch (error) {
		if (error instanceof VehicleAlreadyRegisteredError) {
			res.status(403).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function updateVehicleStatus(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.DRIVER) {
		res.status(403).json({ error: "Drivers only" });
		return;
	}

	const result = vehicleStatusSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}
	const vehicleId = req.params.id;
	if (typeof vehicleId !== "string") {
		res.status(400).json({ error: "Vehicle ID is required" });
		return;
	}

	try {
		const vehicle = await setVehicleOnlineStatus(
			vehicleId,
			user.userId,
			result.data.isOnline,
		);
		res.json(vehicle);
	} catch (error) {
		if (error instanceof VehicleNotOwnedError) {
			res.status(403).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function advanceVehiclePool(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.DRIVER) {
		res.status(403).json({ error: "Drivers only" });
		return;
	}

	const { vehicleId, poolId } = req.params;
	if (typeof vehicleId !== "string" || typeof poolId !== "string") {
		res.status(400).json({ error: "Vehicle and pool IDs are required" });
		return;
	}
	const result = advancePoolSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}

	try {
		const pool = await prisma.pool.findUnique({
			where: { id: poolId },
			select: { vehicleId: true, vehicle: { select: { driverId: true } } },
		});
		if (!pool) {
			res.status(404).json({ error: "Pool not found" });
			return;
		}
		if (pool.vehicleId !== vehicleId || pool.vehicle.driverId !== user.userId) {
			res.status(403).json({ error: "Pool is not owned by this driver" });
			return;
		}

		const advancement = await advancePoolService(
			poolId,
			result.data.targetStatus,
			user.userId,
		);
		res.json(advancement);
	} catch (error) {
		if (error instanceof InvalidTransitionError) {
			res.status(409).json({ error: error.message });
			return;
		}
		if (error instanceof PoolNotFoundError) {
			res.status(404).json({ error: error.message });
			return;
		}
		if (error instanceof PoolNotOwnedError) {
			res.status(403).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function getVehicleRequests(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.DRIVER) {
		res.status(403).json({ error: "Drivers only" });
		return;
	}
	const vehicleId = req.params.id;
	if (typeof vehicleId !== "string") {
		res.status(400).json({ error: "Vehicle ID is required" });
		return;
	}

	try {
		const pools = await listVehicleRequests(vehicleId, user.userId);
		res.json(pools);
	} catch (error) {
		if (error instanceof VehicleNotOwnedError) {
			res.status(403).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function getVehicleHistory(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const user = req.user;
	if (!user || user.role !== UserRole.DRIVER) {
		res.status(403).json({ error: "Drivers only" });
		return;
	}
	const vehicleId = req.params.id;
	if (typeof vehicleId !== "string") {
		res.status(400).json({ error: "Vehicle ID is required" });
		return;
	}

	const pagination = paginationSchema.safeParse(req.query);
	if (!pagination.success) {
		res.status(400).json({ error: pagination.error.issues });
		return;
	}

	try {
		const history = await listVehicleHistory(
			vehicleId,
			user.userId,
			pagination.data.limit,
			pagination.data.offset,
		);
		res.json(history);
	} catch (error) {
		if (error instanceof VehicleNotOwnedError) {
			res.status(403).json({ error: error.message });
			return;
		}
		next(error);
	}
}