import { Router } from "express";
import {
	advanceVehiclePool,
	createVehicle,
	getVehicleHistory,
	getVehicleRequests,
	updateVehicleStatus,
} from "./vehicle.controller";
import { authMiddleware } from "./middleware/auth";

const router = Router();

router.use(authMiddleware);
router.post("/", createVehicle);
router.patch("/:id/status", updateVehicleStatus);
router.get("/:id/requests", getVehicleRequests);
router.get("/:id/history", getVehicleHistory);
router.post(
	"/:vehicleId/pools/:poolId/advance",
	advanceVehiclePool,
);

export default router;