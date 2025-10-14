import type { NextFunction, Request, Response } from "express";
import { permission_repository_implemented } from "../../../infrastructure/repositories/permission/permission.repository";
import { get_permissions_use_case } from "../../../application/use-cases/permission/get_permissions.use-case";
import { no_permissions_registered_exception } from "../../../domain/exceptions/permission/no_permissions_registered.exception";

export const get_permissions_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new permission_repository_implemented();
  const list = new get_permissions_use_case(repository);

  try {
    const permissions = await list.run();
    res.status(200).json({
      status: 200,
      message: "Permissions retrieve succesfully",
      data: permissions,
    });
  } catch (error) {
    if (error instanceof no_permissions_registered_exception) {
      res.status(404).json({
        status: 404,
        message: "No permissions registered",
        error: "Not found",
      });
      return;
    }
    next(error);
  }
};
