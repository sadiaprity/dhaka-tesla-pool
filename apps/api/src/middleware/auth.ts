import type { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import process from "node:process";
import { UserRole } from "../generated/prisma/enums";

export interface AuthenticatedUser {
	userId: string;
	role: UserRole;
}

declare global {
	namespace Express {
		interface Request {
			user?: AuthenticatedUser;
		}
	}
}

const unauthorized = { error: "Unauthorized" };

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: "JWT_SECRET not configured" });
    return;
  }

  const match = req.headers.authorization?.match(/^Bearer (.+)$/);
  if (!match?.[1]) {
    res.status(401).json(unauthorized);
    return;
  }

  try {
    const payload = jwt.verify(match[1], secret);
    if (
      typeof payload === "string" ||
      typeof payload.userId !== "string" ||
      (payload.role !== UserRole.PASSENGER && payload.role !== UserRole.DRIVER)
    ) {
      res.status(401).json(unauthorized);
      return;
    }

    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch {
    res.status(401).json(unauthorized);
  }
}

