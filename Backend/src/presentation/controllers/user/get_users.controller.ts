import type { NextFunction, Request, Response } from "express";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { get_users_use_case } from "../../../application/use-cases/user/get_all_users.use-case";
import { no_users_registered } from "../../../domain/exceptions/user/no_users_registered.exception";

export const get_users_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new user_repository_implemented();
  const get_users = new get_users_use_case(repository);

  try {
    const users = await get_users.run();
    res.status(200).json({
      status: 200,
      message: "users retrieve succesfully",
      data: users,
    });
    return;
  } catch (error) {
    if (error instanceof no_users_registered) {
      res.status(404).json({
        status: 404,
        message: "No users registered",
        error: "User table empty",
      });
      return;
    }

    next(error);
  }
};
