import { UserRole } from "./generated/prisma/enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "node:process";
import { prisma } from "./prisma";

export interface RegisterUserInput {
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface LoginUserInput {
	email: string;
	password: string;
}

export class EmailTakenError extends Error {
	constructor() {
		super("An account with this email already exists");
		this.name = "EmailTakenError";
	}
}

export async function registerUser(input: RegisterUserInput) {
	const existingUser = await prisma.user.findUnique({
		where: { email: input.email },
	});

	if (existingUser) {
		throw new EmailTakenError();
	}

	const passwordHash = await bcrypt.hash(input.password, 12);

	return prisma.user.create({
		data: {
			name: input.name,
			email: input.email,
			passwordHash,
			role: input.role,
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
		},
	});
}

export async function loginUser(input: LoginUserInput): Promise<string> {
	const user = await prisma.user.findUnique({
		where: { email: input.email },
	});

	if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
		throw new Error("Invalid email or password");
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}

	return jwt.sign(
		{ userId: user.id, role: user.role },
		secret,
		{ expiresIn: "7d" },
	);
}
