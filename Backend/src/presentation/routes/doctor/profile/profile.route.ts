import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { doctor_controller } from "../../../controllers/Doctor/profile/doctor.controller";
import { create_doctor_profile_validation } from "../../../../infrastructure/external/Validation/doctor/profile.validation";
//import { validateClass } from "../../../middleware/server/validation.middleware";

export const doctor_profile_router = express.Router();

const controller = new doctor_controller();

doctor_profile_router.get(
  "/list",
  async (req: Request, res: Response, next: NextFunction) => {
    const page: number = req.params.page ? Number(req.params.page) : 1;
    const limit: number = req.params.limit ? Number(req.params.limit) : 10;

    try {
      const response = await controller.find_all(page, limit);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

doctor_profile_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["Access-Token"];
    try {
      const response = await controller.find_by_id(token);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

doctor_profile_router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    try {
      const response = await controller.find_by_email(email!);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

doctor_profile_router.post(
  "/",
  /*validateClass(create_doctor_profile_validation),*/
  async (req: Request, res: Response, next: NextFunction) => {
    const doctor_data: create_doctor_profile_validation = req.body;
    const token = req.cookies["Access-Token"];
    try {
      const response = await controller.create_doctor(token, doctor_data);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
