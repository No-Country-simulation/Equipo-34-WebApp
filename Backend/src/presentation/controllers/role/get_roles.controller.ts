import type { NextFunction, Request, Response } from "express";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { get_roles_use_case } from "../../../application/use-cases/role/get_roles_use-cases";
import { no_roles_registered_exception } from "../../../domain/exceptions/role/no_roles_registered.exception";

export const get_roles_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new role_repository_implemented();
  const list = new get_roles_use_case(repository);

  try {
    const roles = await list.run();
    res.status(200).json({
      status: 200,
      message: "Roles achieve successfully",
      data: roles,
    });
  } catch (error) {
    if (error instanceof no_roles_registered_exception) {
      res.status(404).json({
        status: 404,
        message: "No roles registered",
        error: "Not found",
      });
      return;
    }

    next(error);
  }
};
