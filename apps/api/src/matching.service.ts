import { PoolStatus, RideStatus } from "./generated/prisma/enums";
import { prisma } from "./prisma";
import { COMPATIBLE_ROUTES } from "./config/zones";

export async function findEligiblePool(
	pickupZone: string,
	destinationZone: string,
	seatsNeeded: number,
) {
	const compatibleDestinations = COMPATIBLE_ROUTES[pickupZone];
	if (!compatibleDestinations?.includes(destinationZone)) {
		return null;
	}

	const candidatePools = await prisma.pool.findMany({
		where: {
			status: PoolStatus.OPEN,
			pickupZone,
			destinationZone: { in: compatibleDestinations },
			vehicle: { isOnline: true },
		},
		include: {
			vehicle: true,
			members: {
				where: { isActive: true },
				select: { seatsRequested: true },
			},
		},
	});

	return (
		candidatePools.find((pool) => {
			const seatsOccupied = pool.members.reduce(
				(total, member) => total + member.seatsRequested,
				0,
			);
			return seatsOccupied + seatsNeeded <= pool.vehicle.capacity;
		}) ?? null
	);
}

export async function findAvailableVehicle() {
	return prisma.vehicle.findFirst({
		where: {
			isOnline: true,
			pools: {
				none: {
					members: {
						some: {
							rideRequest: {
								is: {
									status: {
										notIn: [RideStatus.COMPLETED, RideStatus.CANCELLED],
									},
								},
							},
						},
					},
				},
			},
		},
	});
}