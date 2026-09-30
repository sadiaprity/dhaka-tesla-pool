import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { RideStatus, UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/prisma";
import { claimSeats } from "../src/ride.repository";
import { cancelRideRequest } from "../src/ride.service";

describe("cancelRideRequest", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("releases only the cancelled member's seats for a new claim", async () => {
		const suffix = randomUUID();
		const userIds: string[] = [];
		const rideRequestIds: string[] = [];
		let vehicleId: string | undefined;
		let poolId: string | undefined;

		try {
			const driver = await prisma.user.create({
				data: {
					name: "Cancellation test driver",
					email: `cancellation-driver-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.DRIVER,
				},
			});
			userIds.push(driver.id);

			const passenger = await prisma.user.create({
				data: {
					name: "Cancellation test passenger",
					email: `cancellation-passenger-${suffix}@example.test`,
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

			const createRideRequest = async (status: RideStatus) => {
				const rideRequest = await prisma.rideRequest.create({
					data: {
						passengerId: passenger.id,
						pickupZone: "Banani",
						destinationZone: "Mohakhali",
						seatsRequested: 1,
						status,
					},
				});
				rideRequestIds.push(rideRequest.id);
				return rideRequest;
			};

			const cancelledRequest = await createRideRequest(RideStatus.MATCHED);
			const secondRequest = await createRideRequest(RideStatus.MATCHED);
			const thirdRequest = await createRideRequest(RideStatus.MATCHED);
			const refillRequest = await createRideRequest(RideStatus.REQUESTED);

			await claimSeats(pool.id, cancelledRequest.id, 1, 5100);
			await claimSeats(pool.id, secondRequest.id, 1, 5100);
			await claimSeats(pool.id, thirdRequest.id, 1, 5100);

			const poolBefore = await prisma.pool.findUniqueOrThrow({
				where: { id: pool.id },
				select: {
					id: true,
					vehicleId: true,
					pickupZone: true,
					destinationZone: true,
					status: true,
					createdAt: true,
				},
			});
			const membersBefore = await prisma.poolMember.findMany({
				where: { poolId: pool.id },
				orderBy: { rideRequestId: "asc" },
				select: {
					id: true,
					rideRequestId: true,
					seatsRequested: true,
					seatNumbers: true,
					farePaisa: true,
					isActive: true,
					poolId: true,
				},
			});
			const cancelledMember = membersBefore.find(
				(member) => member.rideRequestId === cancelledRequest.id,
			);
			if (!cancelledMember) {
				throw new Error("Expected the cancelled request to have a pool member");
			}
			const otherMembersBefore = membersBefore.filter(
				(member) => member.rideRequestId !== cancelledRequest.id,
			);

			await cancelRideRequest(cancelledRequest.id, passenger.id);

			const membersAfterCancellation = await prisma.poolMember.findMany({
				where: { poolId: pool.id },
				orderBy: { rideRequestId: "asc" },
				select: {
					id: true,
					rideRequestId: true,
					seatsRequested: true,
					seatNumbers: true,
					farePaisa: true,
					isActive: true,
					poolId: true,
				},
			});
			const cancelledMemberAfter = membersAfterCancellation.find(
				(member) => member.rideRequestId === cancelledRequest.id,
			);
			expect(cancelledMemberAfter?.isActive).toBe(false);
			expect(
				membersAfterCancellation.filter(
					(member) => member.rideRequestId !== cancelledRequest.id,
				),
			).toEqual(otherMembersBefore);

			const newMember = await claimSeats(
				pool.id,
				refillRequest.id,
				1,
				5100,
			);
			expect(newMember.seatNumbers).toEqual(cancelledMember.seatNumbers);
			expect(newMember.isActive).toBe(true);

			const [poolAfter, membersAfterRefill] = await Promise.all([
				prisma.pool.findUniqueOrThrow({
					where: { id: pool.id },
					select: {
						id: true,
						vehicleId: true,
						pickupZone: true,
						destinationZone: true,
						status: true,
						createdAt: true,
					},
				}),
				prisma.poolMember.findMany({
					where: { poolId: pool.id },
					orderBy: { rideRequestId: "asc" },
					select: {
						id: true,
						rideRequestId: true,
						seatsRequested: true,
						seatNumbers: true,
						farePaisa: true,
						isActive: true,
						poolId: true,
					},
				}),
			]);
			expect(poolAfter).toEqual(poolBefore);
			expect(
				membersAfterRefill.filter((member) =>
					otherMembersBefore.some((other) => other.id === member.id),
				),
			).toEqual(otherMembersBefore);
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