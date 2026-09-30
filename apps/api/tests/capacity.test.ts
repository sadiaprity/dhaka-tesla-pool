import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/prisma";
import {
	SeatUnavailableError,
	claimSeats,
} from "../src/ride.repository";

describe("claimSeats capacity", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("rejects a claim when active seats already fill the vehicle", async () => {
		const suffix = randomUUID();
		const userIds: string[] = [];
		const rideRequestIds: string[] = [];
		let vehicleId: string | undefined;
		let poolId: string | undefined;

		try {
			const driver = await prisma.user.create({
				data: {
					name: "Capacity test driver",
					email: `capacity-driver-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.DRIVER,
				},
			});
			userIds.push(driver.id);

			const passenger = await prisma.user.create({
				data: {
					name: "Capacity test passenger",
					email: `capacity-passenger-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.PASSENGER,
				},
			});
			userIds.push(passenger.id);

			const vehicle = await prisma.vehicle.create({
				data: {
					driverId: driver.id,
					capacity: 3,
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

			const fullRequest = await prisma.rideRequest.create({
				data: {
					passengerId: passenger.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
					seatsRequested: 3,
				},
			});
			rideRequestIds.push(fullRequest.id);

			const overflowRequest = await prisma.rideRequest.create({
				data: {
					passengerId: passenger.id,
					pickupZone: "Banani",
					destinationZone: "Mohakhali",
					seatsRequested: 1,
				},
			});
			rideRequestIds.push(overflowRequest.id);

			await claimSeats(pool.id, fullRequest.id, 3, 5100);

			await expect(
				claimSeats(pool.id, overflowRequest.id, 1, 5100),
			).rejects.toBeInstanceOf(SeatUnavailableError);
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