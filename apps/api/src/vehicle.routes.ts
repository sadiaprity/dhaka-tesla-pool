import { Router } from "express";
import {
	advanceVehiclePool,
	createVehicle,
	getVehicleRequests,
	updateVehicleStatus,
} from "./vehicle.controller";
import { authMiddleware } from "./middleware/auth";

const router = Router();

router.use(authMiddleware);
router.post("/", createVehicle);
router.patch("/:id/status", updateVehicleStatus);
router.get("/:id/requests", getVehicleRequests);
router.post(
	"/:vehicleId/pools/:poolId/advance",
	advanceVehiclePool,
);

export default router;