import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { auth_controller } from "../controllers/auth/auth.controller";
import type { update_user_dto } from "../../application/dto/User/auth.dto";
import { validateClass } from "../middleware/server/validation.middleware";
import {
  log_user_validation,
  register_user_validation,
} from "../../infrastructure/external/Validation/auth.validation";

const auth_router = express.Router();
const controller = new auth_controller();

auth_router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const user_data: register_user_validation = req.body;

    try {
      const response = await controller.register(user_data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
auth_router.post(
  "/login",
  validateClass(log_user_validation),
  async (req: Request, res: Response, next: NextFunction) => {
    const login_data: log_user_validation = req.body;

    try {
      const response = await controller.login(login_data);

      //Generate cookie
      if (response.data?.token) {
        res.cookie("Access-Token", response.data.token, {
          httpOnly: true,
        });
      }

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
auth_router.get(
  "/verify/:token",
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;

    try {
      const response = await controller.mark_as_verified(token!);
      if (response.data?.token) {
        res.cookie("Access-Token", response.data.token, {
          httpOnly: true,
        });
      }
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
auth_router.post("/logout", async (req: Request, res: Response) => {
  res.clearCookie("Access-Token", {
    httpOnly: true,
  });

  const response = controller.logout();
  res.status(response.status).json(response);
});

export default auth_router;
