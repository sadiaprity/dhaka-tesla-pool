import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/prisma";
import {
	SeatUnavailableError,
	claimSeats,
} from "../src/ride.repository";

describe("claimSeats concurrency", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("allows only one concurrent claim for the last seat", async () => {
		const suffix = randomUUID();
		const userIds: string[] = [];
		const rideRequestIds: string[] = [];
		let vehicleId: string | undefined;
		let poolId: string | undefined;

		try {
			const driver = await prisma.user.create({
				data: {
					name: "Concurrency test driver",
					email: `concurrency-driver-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.DRIVER,
				},
			});
			userIds.push(driver.id);

			const passenger = await prisma.user.create({
				data: {
					name: "Concurrency test passenger",
					email: `concurrency-passenger-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.PASSENGER,
				},
			});
			userIds.push(passenger.id);

			const vehicle = await prisma.vehicle.create({
				data: {
					driverId: driver.id,
					capacity: 2,
					isOnline: true,
				},
			});
			vehicleId = vehicle.id;

			const pool = await prisma.pool.create({
				data: {
					vehicleId: vehicle.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
				},
			});
			poolId = pool.id;

			const seededRequest = await prisma.rideRequest.create({
				data: {
					passengerId: passenger.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
					seatsRequested: 1,
				},
			});
			rideRequestIds.push(seededRequest.id);

			const firstRequest = await prisma.rideRequest.create({
				data: {
					passengerId: passenger.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
					seatsRequested: 1,
				},
			});
			rideRequestIds.push(firstRequest.id);

			const secondRequest = await prisma.rideRequest.create({
				data: {
					passengerId: passenger.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
					seatsRequested: 1,
				},
			});
			rideRequestIds.push(secondRequest.id);

			await claimSeats(pool.id, seededRequest.id, 1, 5100);

			const results = await Promise.allSettled([
				claimSeats(pool.id, firstRequest.id, 1, 5100),
				claimSeats(pool.id, secondRequest.id, 1, 5100),
			]);
			const fulfilled = results.filter((result) => result.status === "fulfilled");
			const rejected = results.filter((result) => result.status === "rejected");

			expect(fulfilled).toHaveLength(1);
			expect(rejected).toHaveLength(1);
			expect(rejected[0]).toMatchObject({
				status: "rejected",
				reason: expect.any(SeatUnavailableError),
			});
		} finally {
			if (poolId) {
				await prisma.poolMember.deleteMany({ where: { poolId } });
			}
			if (rideRequestIds.length > 0) {
				await prisma.rideStatusHistory.deleteMany({
					where: { rideRequestId: { in: rideRequestIds } },
				});
				await prisma.rideRequest.deleteMany({
					where: { id: { in: rideRequestIds } },
				});
			}
			if (poolId) {
				await prisma.pool.deleteMany({ where: { id: poolId } });
			}
			if (vehicleId) {
				await prisma.vehicle.deleteMany({ where: { id: vehicleId } });
			}
			if (userIds.length > 0) {
				await prisma.user.deleteMany({ where: { id: { in: userIds } } });
			}
		}
	});
});