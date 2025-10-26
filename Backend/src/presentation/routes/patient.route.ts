import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { patient_controller } from "../controllers/Patient/patient.controller";

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
