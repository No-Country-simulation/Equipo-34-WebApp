import type { NextFunction, Request, Response } from "express";
import { auth_repository_implemented } from "../../../infrastructure/repositories/auth/auth.repository";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { delete_user_use_case } from "../../../application/use-cases/auth/delete_user.use-case";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";

export const delete_user_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new auth_repository_implemented();
  const user_repository = new user_repository_implemented();
  const delete_user = new delete_user_use_case(repository, user_repository);

  try {
    const { email } = req.params;
    await delete_user.run(email!);
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof user_not_found) {
      res.status(404).json({
        status: "404",
        message: "User not found",
        error: "Not found",
      });

      return;
    }

    next(error);
  }
};
