import type { Prisma } from "./generated/prisma/client";
import { prisma } from "./prisma";

export class SeatUnavailableError extends Error {
	constructor() {
		super("The requested seats are no longer available");
		this.name = "SeatUnavailableError";
	}
}

export async function claimSeats(
	poolId: string,
	rideRequestId: string,
	seatsRequested: number,
	farePaisa: number,
) {
	return prisma.$transaction(async (transaction) => {
		const pools = await transaction.$queryRaw<
			Array<{ id: string; capacity: number }>
		>`
			SELECT pool.id, vehicle.capacity
			FROM "Pool" AS pool
			JOIN "Vehicle" AS vehicle ON vehicle.id = pool."vehicleId"
			WHERE pool.id = ${poolId}
			FOR UPDATE OF pool
		`;
		const pool = pools[0];
		if (!pool) {
			throw new SeatUnavailableError();
		}

		const activeMembers = await transaction.poolMember.findMany({
			where: { poolId, isActive: true },
			select: { seatsRequested: true, seatNumbers: true },
		});
		const seatsOccupied = activeMembers.reduce(
			(total, member) => total + member.seatsRequested,
			0,
		);

		if (seatsOccupied + seatsRequested > pool.capacity) {
			throw new SeatUnavailableError();
		}

		const occupiedSeatNumbers = new Set(
			activeMembers.flatMap((member) => member.seatNumbers),
		);
		const seatNumbers: number[] = [];
		for (
			let seatNumber = 1;
			seatNumber <= pool.capacity && seatNumbers.length < seatsRequested;
			seatNumber += 1
		) {
			if (!occupiedSeatNumbers.has(seatNumber)) {
				seatNumbers.push(seatNumber);
			}
		}

		if (seatNumbers.length !== seatsRequested) {
			throw new SeatUnavailableError();
		}

		return transaction.poolMember.create({
			data: {
				poolId,
				rideRequestId,
				seatsRequested,
				seatNumbers,
				farePaisa,
				isActive: true,
			},
		});
	});
}

export function createPoolForVehicle(
	vehicleId: string,
	pickupZone: string,
	destinationZone: string,
) {
	return prisma.pool.create({
		data: { vehicleId, pickupZone, destinationZone },
	});
}

async function releaseSeatInTransaction(
	transaction: Prisma.TransactionClient,
	rideRequestId: string,
) {
	const member = await transaction.poolMember.findUnique({
		where: { rideRequestId },
		select: { poolId: true },
	});
	if (!member) {
		return;
	}

	await transaction.$queryRaw`
		SELECT id
		FROM "Pool"
		WHERE id = ${member.poolId}
		FOR UPDATE
	`;

	return transaction.poolMember.updateMany({
		where: { rideRequestId, isActive: true },
		data: { isActive: false },
	});
}

export function releaseSeat(
	rideRequestId: string,
	existingTransaction?: Prisma.TransactionClient,
) {
	if (existingTransaction) {
		return releaseSeatInTransaction(existingTransaction, rideRequestId);
	}

	return prisma.$transaction((transaction) =>
		releaseSeatInTransaction(transaction, rideRequestId),
	);
}