import type { NextFunction, Request, Response } from "express";
import { permission_repository_implemented } from "../../../infrastructure/repositories/permission/permission.repository";
import { create_permission_use_case } from "../../../application/use-cases/permission/create_permission.use-case";
import type { create_permission_dto } from "../../../application/dto/permissions.dto";
import { permission_already_exist_exception } from "../../../domain/exceptions/permission/permission_already_exist.exception";

export const create_permission_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new permission_repository_implemented();
  const create_permission = new create_permission_use_case(repository);

  try {
    const permission_data: create_permission_dto = req.body;
    const new_permission = await create_permission.run(permission_data);
    res.status(200).json({
      status: 200,
      message: "Permission created succesfully",
      data: new_permission,
    });
  } catch (error) {
    if (error instanceof permission_already_exist_exception) {
      res.status(400).json({
        status: 400,
        message: "Permission Already exist",
        error: "Bad Request",
      });
      return;
    }
    next(error);
  }
};
