import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { role_controller } from "../controllers/role/role.controller";
import type { create_role_dto } from "../../application/dto/role.dto";

const role_router = express.Router();
const role_controller_instance = new role_controller();

role_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    try {
      const response = await role_controller_instance.get_roles(page, limit);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
role_router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
      const response = await role_controller_instance.search_roles(id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
role_router.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const role_data: create_role_dto = req.body;
    try {
      const response = await role_controller_instance.create_role(role_data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
role_router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const role_id = Number(req.params.id);
    const role_data: create_role_dto = req.body;

    try {
      const response = await role_controller_instance.update_role(
        role_id,
        role_data
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
role_router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const role_id = Number(req.params.id);
    try {
      const response = await role_controller_instance.delete_role(role_id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default role_router;
