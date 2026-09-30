import { Router } from "express";
import {
	acceptPool,
	advanceVehiclePool,
	completePoolTrip,
	createVehicle,
	getVehicleHistory,
	getMyVehicle,
	getVehicleRequests,
	markPoolDriverArrived,
	startPoolTrip,
	updateVehicleStatus,
} from "./vehicle.controller";
import { authMiddleware } from "./middleware/auth";

const router = Router();

router.use(authMiddleware);
router.post("/", createVehicle);
router.get("/me", getMyVehicle);
router.patch("/:id/status", updateVehicleStatus);
router.get("/:id/requests", getVehicleRequests);
router.get("/:id/history", getVehicleHistory);
router.post("/:vehicleId/pools/:poolId/accept", acceptPool);
router.post(
	"/:vehicleId/pools/:poolId/driver-arrived",
	markPoolDriverArrived,
);
router.post("/:vehicleId/pools/:poolId/start", startPoolTrip);
router.post("/:vehicleId/pools/:poolId/complete", completePoolTrip);
router.post(
	"/:vehicleId/pools/:poolId/advance",
	advanceVehiclePool,
);

export default router;