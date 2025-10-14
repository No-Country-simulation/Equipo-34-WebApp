import type { NextFunction, Request, Response } from "express";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { create_role_use_case } from "../../../application/use-cases/role/create_role.use-case";
import type { create_role_dto } from "../../../application/dto/role.dto";
import { role_already_exist_exception } from "../../../domain/exceptions/role/role_already_exist.exception";

export const create_role_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new role_repository_implemented();
  const create = new create_role_use_case(repository);

  try {
    const role_data: create_role_dto = req.body;
    const new_role = await create.run(role_data);
    res.status(200).json({
      status: 200,
      message: "Role created successfully",
      data: new_role,
    });
  } catch (error) {
    if (error instanceof role_already_exist_exception) {
      res.status(400).json({
        status: 400,
        message: "Role Already exist",
        error: "Bad Request",
      });
      return;
    }

    next(error);
  }
};
