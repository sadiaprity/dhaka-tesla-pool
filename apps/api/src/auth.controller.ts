import type { NextFunction, Request, Response } from "express";
import { UserRole } from "./generated/prisma/enums";
import { z } from "zod";
import { EmailTakenError, loginUser, registerUser } from "./auth.service";

const registerSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string().min(1),
	role: z.enum(UserRole),
});

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1),
});

export async function register(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const result = registerSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}

	try {
		const user = await registerUser(result.data);
		res.status(201).json(user);
	} catch (error) {
		if (error instanceof EmailTakenError) {
			res.status(409).json({ error: error.message });
			return;
		}
		next(error);
	}
}

export async function login(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const result = loginSchema.safeParse(req.body);
	if (!result.success) {
		res.status(400).json({ error: result.error.issues });
		return;
	}

	try {
		const token = await loginUser(result.data);
		res.json({ token });
	} catch (error) {
		if (error instanceof Error && error.message === "Invalid email or password") {
			res.status(401).json({ error: error.message });
			return;
		}
		next(error);
	}
}
