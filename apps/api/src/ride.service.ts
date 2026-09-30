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

		await releaseSeat(rideRequestId, transaction);
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