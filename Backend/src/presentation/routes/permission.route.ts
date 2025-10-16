import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { permission_controller } from "../controllers/permission/permission.controller";
import type { create_permission_dto } from "../../application/dto/permissions.dto";

const permission_router = express.Router();
const permission_instance = new permission_controller();

permission_router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.page ? Number(req.query.limit) : 10;

    const response = await permission_instance.get_permissions(page, limit);
    try {
      res.status(response!.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
permission_router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const permission_id = Number(id);

    try {
      const response = await permission_instance.search_permission(
        permission_id
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
permission_router.post(
  "/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const permission_data: create_permission_dto = req.body;

    try {
      const response = await permission_instance.create_permission(
        permission_data
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
permission_router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const permission_id = Number(id);
    const permission_data: create_permission_dto = req.body;

    try {
      const response = await permission_instance.update_permission(
        permission_id,
        permission_data
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);
permission_router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const permission_id = Number(req.params.id);
    try {
      const response = await permission_instance.delete_permission(
        permission_id
      );
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default permission_router;
