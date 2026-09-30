import { RideStatus } from "./generated/prisma/enums";
import { calculateFare } from "./fare.service";
import {
	SeatUnavailableError,
	claimSeats,
	createPoolForVehicle,
	releaseSeat,
} from "./ride.repository";
import {
	findAvailableVehicle,
	findEligiblePool,
} from "./matching.service";
import {
	DHAKA_ZONES,
	ZONE_DISTANCE_METERS,
} from "./config/zones";
import { prisma } from "./prisma";
import { PoolStatus } from "./generated/prisma/enums";

const cancellableStatuses = [
	RideStatus.REQUESTED,
	RideStatus.MATCHED,
	RideStatus.ACCEPTED,
	RideStatus.DRIVER_ARRIVED,
];

const NO_AVAILABLE_VEHICLE_MESSAGE =
	"no driver currently available right now";

export class InvalidRideRequestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidRideRequestError";
	}
}

export class RideRequestNotCancellableError extends Error {
	constructor() {
		super("Ride request cannot be cancelled");
		this.name = "RideRequestNotCancellableError";
	}
}

function getDistanceMeters(pickupZone: string, destinationZone: string) {
	return (
		ZONE_DISTANCE_METERS[`${pickupZone}-${destinationZone}`] ??
		ZONE_DISTANCE_METERS[`${destinationZone}-${pickupZone}`]
	);
}

export async function requestRide(
	userId: string,
	pickupZone: string,
	destinationZone: string,
	seatsRequested: number,
) {
	if (
		!DHAKA_ZONES.includes(pickupZone) ||
		!DHAKA_ZONES.includes(destinationZone)
	) {
		throw new InvalidRideRequestError("Pickup and destination zones must exist");
	}
	if (pickupZone === destinationZone) {
		throw new InvalidRideRequestError(
			"Pickup and destination zones must be different",
		);
	}
	if (!Number.isInteger(seatsRequested) || seatsRequested < 1) {
		throw new InvalidRideRequestError("At least one seat must be requested");
	}

	const distanceMeters = getDistanceMeters(pickupZone, destinationZone);
	if (distanceMeters === undefined) {
		throw new InvalidRideRequestError(
			"Distance is not configured for this route",
		);
	}

	const rideRequest = await prisma.rideRequest.create({
		data: {
			passengerId: userId,
			pickupZone,
			destinationZone,
			seatsRequested,
		},
	});

	const pool = await findEligiblePool(
		pickupZone,
		destinationZone,
		seatsRequested,
	);
	if (pool) {
		try {
			const farePaisa = calculateFare({ distanceMeters, isPooled: true });
			await claimSeats(pool.id, rideRequest.id, seatsRequested, farePaisa);
			const matchedRideRequest = await prisma.rideRequest.update({
				where: { id: rideRequest.id },
				data: { status: RideStatus.MATCHED },
				include: { member: true },
			});
			return { rideRequest: matchedRideRequest, message: null };
		} catch (error) {
			if (!(error instanceof SeatUnavailableError)) {
				throw error;
			}
		}
	}

	const vehicle = await findAvailableVehicle();
	if (vehicle && vehicle.capacity >= seatsRequested) {
		const newPool = await createPoolForVehicle(
			vehicle.id,
			pickupZone,
			destinationZone,
		);
		try {
			const farePaisa = calculateFare({ distanceMeters, isPooled: false });
			await claimSeats(newPool.id, rideRequest.id, seatsRequested, farePaisa);
			const matchedRideRequest = await prisma.rideRequest.update({
				where: { id: rideRequest.id },
				data: { status: RideStatus.MATCHED },
				include: { member: true },
			});
			return { rideRequest: matchedRideRequest, message: null };
		} catch (error) {
			if (!(error instanceof SeatUnavailableError)) {
				throw error;
			}
		}
	}

	return {
		rideRequest,
		message: NO_AVAILABLE_VEHICLE_MESSAGE,
	};
}

export async function cancelRideRequest(
	rideRequestId: string,
	userId: string,
) {
	return prisma.$transaction(async (transaction) => {
		await releaseSeat(rideRequestId, transaction);
		const cancellation = await transaction.rideRequest.updateMany({
			where: {
				id: rideRequestId,
				passengerId: userId,
				status: { in: cancellableStatuses },
			},
			data: { status: RideStatus.CANCELLED },
		});
		if (cancellation.count === 0) {
			throw new RideRequestNotCancellableError();
		}

		await transaction.rideStatusHistory.create({
			data: {
				rideRequestId,
				status: RideStatus.CANCELLED,
			},
		});

		return transaction.rideRequest.findUniqueOrThrow({
			where: { id: rideRequestId },
		});
	});
}

export async function listPassengerRideHistory(
	passengerId: string,
	limit: number,
	offset: number,
) {
	const where = { passengerId };
	const [items, total] = await Promise.all([
		prisma.rideRequest.findMany({
			where,
			orderBy: [{ createdAt: "desc" }, { id: "desc" }],
			take: limit,
			skip: offset,
			include: {
				member: { include: { pool: true } },
				history: { orderBy: { changedAt: "asc" } },
			},
		}),
		prisma.rideRequest.count({ where }),
	]);

	return { items, total, limit, offset };
}

export class InvalidTransitionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidTransitionError";
	}
}

export class PoolNotFoundError extends Error {
	constructor() {
		super("Pool not found");
		this.name = "PoolNotFoundError";
	}
}

export class PoolNotOwnedError extends Error {
	constructor() {
		super("Pool is not owned by this driver");
		this.name = "PoolNotOwnedError";
	}
}

const eligibleFromStatuses: Partial<Record<RideStatus, RideStatus[]>> = {
	[RideStatus.ACCEPTED]: [RideStatus.MATCHED],
	[RideStatus.DRIVER_ARRIVED]: [RideStatus.MATCHED, RideStatus.ACCEPTED],
	[RideStatus.STARTED]: [RideStatus.DRIVER_ARRIVED],
	[RideStatus.COMPLETED]: [RideStatus.STARTED],
};

export async function advancePool(
	poolId: string,
	nextStatus: RideStatus,
	driverUserId: string,
) {
	const fromStatuses = eligibleFromStatuses[nextStatus];
	if (!fromStatuses) {
		throw new InvalidTransitionError(`Cannot advance a pool to ${nextStatus}`);
	}

	return prisma.$transaction(async (transaction) => {
		await transaction.$queryRaw`
			SELECT id
			FROM "Pool"
			WHERE id = ${poolId}
			FOR UPDATE
		`;

		const pool = await transaction.pool.findUnique({
			where: { id: poolId },
				select: {
					id: true,
					status: true,
					vehicle: { select: { driverId: true } },
					members: {
						where: { isActive: true },
						select: {
							rideRequestId: true,
							rideRequest: { select: { status: true } },
						},
					},
				},
			});
		if (!pool) {
			throw new PoolNotFoundError();
		}
		if (pool.vehicle.driverId !== driverUserId) {
			throw new PoolNotOwnedError();
		}
		if (nextStatus === RideStatus.ACCEPTED && pool.status !== PoolStatus.OPEN) {
			throw new InvalidTransitionError("Only an open pool can be accepted");
		}

		const eligibleMembers = pool.members.filter((member) =>
			fromStatuses.includes(member.rideRequest.status),
		);
		if (
			eligibleMembers.length === 0 ||
			(nextStatus === RideStatus.ACCEPTED &&
				eligibleMembers.length !== pool.members.length)
		) {
			throw new InvalidTransitionError(
				`No active ride requests can transition to ${nextStatus}`,
			);
		}

		const rideRequests = [];
		for (const member of eligibleMembers) {
			rideRequests.push(
				await transaction.rideRequest.update({
					where: { id: member.rideRequestId },
					data: { status: nextStatus },
				}),
			);
			await transaction.rideStatusHistory.create({
				data: {
					rideRequestId: member.rideRequestId,
					status: nextStatus,
				},
			});
		}

		const updatedPool =
			nextStatus === RideStatus.ACCEPTED
				? await transaction.pool.update({
						where: { id: poolId },
						data: { status: PoolStatus.CLOSED },
					})
				: await transaction.pool.findUniqueOrThrow({ where: { id: poolId } });

		return { pool: updatedPool, rideRequests };
	});
}