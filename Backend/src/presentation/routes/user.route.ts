import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { user_controller } from "../controllers/user/user.controller";

const user_router = express.Router();
const controller = new user_controller();

user_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    try {
      const response = await controller.get_users(page, limit);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
user_router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;
    try {
      const response = await controller.search(email!);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default user_router;
