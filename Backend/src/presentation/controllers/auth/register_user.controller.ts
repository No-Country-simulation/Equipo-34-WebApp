import type { NextFunction, Request, Response } from "express";
import { auth_repository_implemented } from "../../../infrastructure/repositories/user/auth.repository";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { register_user_use_case } from "../../../application/use-cases/auth/register_user.use-case";
import type { register_user_dto } from "../../../application/dto/auth.dto";
import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";

const register_user_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository_injection = new user_repository_implemented();
  const repository = new auth_repository_implemented();
  const register_user = new register_user_use_case(
    repository,
    repository_injection
  );

  try {
    const new_user: register_user_dto = req.body;
    const user_created = await register_user.run(new_user);
    res.status(200).json({
      status: 200,
      data: user_created,
      message: "User created succesfully",
    });
    return;
  } catch (error) {
    if (error instanceof user_already_exist_exception) {
      res.status(404).json({
        status: 404,
        message: "User Already Exist",
        error: "Trying to create an user which already exist",
      });
      return;
    }

    next(error);
  }
};

export default register_user_controller;
