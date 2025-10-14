import type { NextFunction, Request, Response } from "express";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { search_role_use_case } from "../../../application/use-cases/role/search_role.use-case";
import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";

export const search_role_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new role_repository_implemented();
  const search = new search_role_use_case(repository);

  try {
    const { id } = req.params;
    const role_id = Number(id);
    const role = await search.run(role_id);

    res.status(200).json({
      status: 200,
      message: "Role found",
      data: role,
    });
  } catch (error) {
    if (error instanceof role_not_found_exception) {
      res.status(404).json({
        status: 404,
        message: "Role not found",
        error: "Not found",
      });
      return;
    }

    next(error);
  }
};
