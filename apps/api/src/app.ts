import cors from "cors";
import express from "express";
import authRoutes from "./auth.routes";
import rideRoutes from "./ride.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/rides", rideRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;