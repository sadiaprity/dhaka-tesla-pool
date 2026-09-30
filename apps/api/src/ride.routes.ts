import { Router } from "express";
import { authMiddleware } from "./middleware/auth";
import { cancelRide, createRide, getRide } from "./ride.controller";

const router = Router();

router.use(authMiddleware);
router.post("/", createRide);
router.get("/:id", getRide);
router.post("/:id/cancel", cancelRide);

export default router;