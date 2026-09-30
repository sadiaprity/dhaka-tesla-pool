import bcrypt from "bcrypt";
import { UserRole } from "../src/generated/prisma/enums";
import { prisma } from "../src/prisma";

const demoPassword = "pass1234";

async function main() {
	const passwordHash = await bcrypt.hash(demoPassword, 12);
	const demoUsers = [
		{ name: "Jashim", email: "jashim@example.com", role: UserRole.DRIVER },
		{ name: "Nusrat", email: "nusrat@example.com", role: UserRole.PASSENGER },
		{ name: "Rafiq", email: "rafiq@example.com", role: UserRole.PASSENGER },
		{ name: "Shirin", email: "shirin@example.com", role: UserRole.PASSENGER },
	] as const;

	const users = await Promise.all(
		demoUsers.map(({ name, email, role }) =>
			prisma.user.upsert({
				where: { email },
				update: { name, role, passwordHash },
				create: { name, email, role, passwordHash },
			}),
		),
	);
	const driver = users[0];
	if (!driver) {
		throw new Error("Failed to seed the demo driver");
	}

	await prisma.vehicle.upsert({
		where: { driverId: driver.id },
		update: { capacity: 3, isOnline: true },
		create: { driverId: driver.id, capacity: 3, isOnline: true },
	});

	console.log("Seeded Dhaka Tesla Pool demo accounts and Jashim's vehicle.");
}

main()
	.catch((error: unknown) => {
		console.error("Failed to seed demo data:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});