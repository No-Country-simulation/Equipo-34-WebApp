import express, { type Request, type Response } from "express";
import { server_health } from "../controllers/health/health.controller.ts";

const health_router = express.Router();

const server_health_instance = new server_health();

health_router.get("/", async (req: Request, res: Response) => {
  const response = await server_health_instance.server_health_controller();

  res.status(response.status).json(response);
});

export default health_router;
