import type { NextFunction, Request, Response } from "express";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { search_user_by_email_use_case } from "../../../application/use-cases/user/search_user_email.use-case";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";

export const search_user_by_email_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = new user_repository_implemented();
  const search_user_by_email = new search_user_by_email_use_case(repository);

  try {
    const { email } = req.params;

    const user = await search_user_by_email.run(email!);

    res.status(200).json({
      status: 200,
      message: "User found",
      data: user,
    });

    return;
  } catch (error) {
    if (error instanceof user_not_found) {
      res.status(404).json({
        status: 404,
        message: "User not found",
        error: "Not found",
      });

      return;
    }

    next(error);
  }
};
