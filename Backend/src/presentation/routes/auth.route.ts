import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { auth_controller } from "../controllers/auth/auth.controller";
import type {
  register_user_dto,
  update_user_dto,
} from "../../application/dto/auth.dto";

const auth_router = express.Router();
const controller = new auth_controller();

auth_router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const user_data: register_user_dto = req.body;

    try {
      const response = await controller.register(user_data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
auth_router.put(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    const user_data: update_user_dto = req.body;

    try {
      const response = await controller.update(email!, user_data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
auth_router.delete(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    try {
      const response = await controller.delete_user(email!);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default auth_router;
