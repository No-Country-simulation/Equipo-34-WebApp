import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { medical_center_controller } from "../../controllers/hospital/hospitals.controller";
import type { create_medical_center_dto } from "../../../application/dto/Hospital/medical-center.dto";

export const medical_center_router = express.Router();

const controller = new medical_center_controller();

medical_center_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const limit = req.params.limit ? Number(req.params.limit) : 10;

    try {
      const response = await controller.find_all(page, limit);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

medical_center_router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const response = await controller.find_by_id(id!);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

medical_center_router.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const limit = req.params.limit ? Number(req.params.limit) : 10;
    const name = String(req.query.name);
    try {
      const response = await controller.find_by_name(name, page, limit);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

medical_center_router.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const data: create_medical_center_dto = req.body;

    try {
      const response = await controller.create_center(data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
