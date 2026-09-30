import { prisma } from "./prisma";

export class VehicleAlreadyRegisteredError extends Error {
	constructor() {
		super("Driver already has a registered vehicle");
		this.name = "VehicleAlreadyRegisteredError";
	}
}

export class VehicleNotOwnedError extends Error {
	constructor() {
		super("Vehicle not found or not owned by this driver");
		this.name = "VehicleNotOwnedError";
	}
}

export async function registerVehicle(driverId: string, capacity: number) {
	const existingVehicle = await prisma.vehicle.findUnique({
		where: { driverId },
	});
	if (existingVehicle) {
		throw new VehicleAlreadyRegisteredError();
	}

	try {
		return await prisma.vehicle.create({
			data: { driverId, capacity },
		});
	} catch (error) {
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			error.code === "P2002"
		) {
			throw new VehicleAlreadyRegisteredError();
		}
		throw error;
	}
}

export async function setVehicleOnlineStatus(
	vehicleId: string,
	driverId: string,
	isOnline: boolean,
) {
	const update = await prisma.vehicle.updateMany({
		where: { id: vehicleId, driverId },
		data: { isOnline },
	});
	if (update.count === 0) {
		throw new VehicleNotOwnedError();
	}

	return prisma.vehicle.findUniqueOrThrow({ where: { id: vehicleId } });
}

export function getVehicleForDriver(driverId: string) {
	return prisma.vehicle.findUnique({ where: { driverId } });
}

export async function listVehicleRequests(
	vehicleId: string,
	driverId: string,
) {
	const vehicle = await prisma.vehicle.findUnique({
		where: { id: vehicleId },
		select: { driverId: true },
	});
	if (!vehicle || vehicle.driverId !== driverId) {
		throw new VehicleNotOwnedError();
	}

	return prisma.pool.findMany({
		where: { vehicleId },
		orderBy: { createdAt: "desc" },
		include: {
			vehicle: {
				select: { id: true, capacity: true, isOnline: true },
			},
			members: {
				where: { isActive: true },
				include: {
					rideRequest: {
						include: { passenger: { select: { name: true } } },
					},
				},
			},
		},
	});
}

export async function listVehicleHistory(
	vehicleId: string,
	driverId: string,
	limit: number,
	offset: number,
) {
	const vehicle = await prisma.vehicle.findUnique({
		where: { id: vehicleId },
		select: { driverId: true },
	});
	if (!vehicle || vehicle.driverId !== driverId) {
		throw new VehicleNotOwnedError();
	}

	const where = { vehicleId };
	const [items, total] = await Promise.all([
		prisma.pool.findMany({
			where,
			orderBy: [{ createdAt: "desc" }, { id: "desc" }],
			take: limit,
			skip: offset,
			include: {
				members: {
					include: {
						rideRequest: {
							include: {
								history: { orderBy: { changedAt: "asc" } },
							},
						},
					},
				},
			},
		}),
		prisma.pool.count({ where }),
	]);

	return { items, total, limit, offset };
}