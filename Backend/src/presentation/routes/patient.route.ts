import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { patient_controller } from "../controllers/Patient/patient.controller";
import type { update_patient_validation } from "../../infrastructure/external/Validation/patient/patient.validation";

export const patient_router = express.Router();

const controller = new patient_controller();

patient_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    try {
      const response = await controller.find_all(page, limit);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
patient_router.put(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["Access-Token"];
    const patient_data: update_patient_validation = req.body;

    try {
      const response = await controller.update_patient(token, patient_data);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
