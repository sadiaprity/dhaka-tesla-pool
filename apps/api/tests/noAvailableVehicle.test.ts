import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it, vi } from "vitest";
import { RideStatus, UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/prisma";

vi.mock("../src/matching.service", () => ({
	findEligiblePool: vi.fn().mockResolvedValue(null),
	findAvailableVehicle: vi.fn().mockResolvedValue(null),
}));

import { requestRide } from "../src/ride.service";

describe("requestRide without an available vehicle", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("leaves the RideRequest in REQUESTED status", async () => {
		const suffix = randomUUID();
		let passengerId: string | undefined;

		try {
			const passenger = await prisma.user.create({
				data: {
					name: "No vehicle test passenger",
					email: `no-vehicle-passenger-${suffix}@example.test`,
					passwordHash: "test-hash",
					role: UserRole.PASSENGER,
				},
			});
			passengerId = passenger.id;

			const result = await requestRide(
				passenger.id,
				"Banani",
				"Mohakhali",
				1,
			);

			const persistedRequest = await prisma.rideRequest.findUniqueOrThrow({
				where: { id: result.rideRequest.id },
			});
			expect(persistedRequest.status).toBe(RideStatus.REQUESTED);
			expect(result.message).toBe("no driver currently available right now");
		} finally {
			if (passengerId) {
				const rideRequests = await prisma.rideRequest.findMany({
					where: { passengerId },
					select: { id: true },
				});
				const rideRequestIds = rideRequests.map(({ id }) => id);
				if (rideRequestIds.length > 0) {
					await prisma.poolMember.deleteMany({
						where: { rideRequestId: { in: rideRequestIds } },
					});
					await prisma.rideStatusHistory.deleteMany({
						where: { rideRequestId: { in: rideRequestIds } },
					});
					await prisma.rideRequest.deleteMany({
						where: { id: { in: rideRequestIds } },
					});
				}
				await prisma.user.deleteMany({ where: { id: passengerId } });
			}
		}
	});
});