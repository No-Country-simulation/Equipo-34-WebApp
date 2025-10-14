import type { NextFunction, Request, Response } from "express";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { delete_role_use_case } from "../../../application/use-cases/role/delete_role.use-case";
import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";

export const delete_role_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new role_repository_implemented();
  const delete_role = new delete_role_use_case(repository);

  try {
    const { id } = req.params;
    const role_id = Number(id);

    await delete_role.run(role_id);
    res.status(201).json({
      status: 200,
      message: "Role deleted successfully",
    });
  } catch (error) {
    if (error instanceof role_not_found_exception) {
      res.status(404).json({
        status: 404,
        message: "Role not found",
        error: "Not Found",
      });

      return;
    }

    next(error);
  }
};
