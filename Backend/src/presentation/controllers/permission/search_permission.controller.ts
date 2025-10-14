import type { NextFunction, Request, Response } from "express";
import { permission_repository_implemented } from "../../../infrastructure/repositories/permission/permission.repository";
import { search_permission_use_case } from "../../../application/use-cases/permission/search_permission.use-case";
import { permission_not_found_exception } from "../../../domain/exceptions/permission/permission_not_found.exception";

export const search_permission_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new permission_repository_implemented();
  const search = new search_permission_use_case(repository);

  try {
    const { id } = req.params;
    const permission_id = Number(id);
    const permission = await search.run(permission_id);
    res.status(200).json({
      status: 200,
      message: "Permission retrieve succesfully",
      data: permission,
    });
  } catch (error) {
    if (error instanceof permission_not_found_exception) {
      res.status(404).json({
        status: 404,
        message: "Permission not found",
        error: "Not found",
      });
      return;
    }

    next(error);
  }
};
