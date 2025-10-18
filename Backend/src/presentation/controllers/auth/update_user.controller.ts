import type { NextFunction, Request, Response } from "express";
import { auth_repository_implemented } from "../../../infrastructure/repositories/auth/auth.repository";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { update_user_use_case } from "../../../application/use-cases/auth/update_user.use-case";
import type { update_user_dto } from "../../../application/dto/auth.dto";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";

export const update_user_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new auth_repository_implemented();
  const user_repository = new user_repository_implemented();
  const update_user = new update_user_use_case(repository, user_repository);

  try {
    const { email } = req.params;
    const user_data: update_user_dto = req.body;

    const updated_user = await update_user.run(email!, user_data);
    res.status(200).json({
      status: 200,
      message: "User updated",
      data: updated_user,
    });
  } catch (error) {
    if (error instanceof user_not_found) {
      res.status(404).json({
        status: 404,
        message: "User not found",
        error: "Not Found",
      });
      return;
    }

    next(error);
  }
};
