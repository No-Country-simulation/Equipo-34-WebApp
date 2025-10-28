import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";
import type { update_user_dto } from "../../../application/dto/User/auth.dto";
import { auth_repository_implemented } from "../../../infrastructure/repositories/auth/auth.repository";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { register_user_use_case } from "../../../application/use-cases/auth/register_user.use-case";
import { user_already_exist_exception } from "../../../domain/exceptions/auth/user_already_exist.exception";
import { update_user_use_case } from "../../../application/use-cases/auth/update_user.use-case";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";
import { delete_user_use_case } from "../../../application/use-cases/auth/delete_user.use-case";
import { login_use_case } from "../../../application/use-cases/auth/login.use-case";
import type { User } from "../../../domain/entities/User/user.entity";
import { wrong_password_exception } from "../../../domain/exceptions/auth/wrong_password.exception";
import { patient_repository_implemented } from "../../../infrastructure/repositories/Patient/patient.repository";
import type {
  log_user_validation,
  register_user_validation,
} from "../../../infrastructure/external/Validation/auth.validation";
import { mark_as_verified_use_case } from "../../../application/use-cases/verification/mark-verified.use-case";
import { user_already_verified_exception } from "../../../domain/exceptions/verification/user-already-verified.exception";
import { user_not_verified_exception } from "../../../domain/exceptions/verification/user_not_verified.exception";

@Route("auth")
export class auth_controller extends Controller {
  private readonly repository = new auth_repository_implemented();
  private readonly user_repository = new user_repository_implemented();
  private readonly patient_repository = new patient_repository_implemented();

  @Post("/register")
  @SuccessResponse("201", "Registered")
  async register(@Body() user_data: register_user_validation) {
    const register = new register_user_use_case(
      this.repository,
      this.user_repository,
      this.patient_repository
    );
    try {
      const new_user = await register.run(user_data);
      return {
        status: 201,
        message: "Registered",
        data: new_user,
      };
    } catch (error) {
      if (error instanceof user_already_exist_exception) {
        console.log(error);
        return {
          status: 400,
          message: "User Already Exist",
          error: "Bad Request",
        };
      }

      throw error;
    }
  }

  @Post("/login")
  @SuccessResponse("200", `welcome user`)
  async login(@Body() login_data: log_user_validation) {
    const use_case = new login_use_case(this.user_repository);

    try {
      const { user, token } = await use_case.login(login_data);

      const public_user: Partial<User> = {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      };

      return {
        status: 200,
        message: `welcome ${user.email}`,
        data: {
          user: public_user,
          token,
        },
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "User",
          error: "Not Found",
        };
      }

      if (error instanceof user_not_verified_exception) {
        console.log(`error: ${error}`);
        return {
          status: 403,
          message: "User not verified",
          error: "Forbidden",
        };
      }

      if (error instanceof wrong_password_exception) {
        return {
          status: 400,
          message: "Wrong Password",
          error: "Bad Request",
        };
      }
      throw error;
    }
  }

  @Put("/verified/{token}")
  @SuccessResponse("201", "User verified")
  async mark_as_verified(@Path() token: string) {
    const mark = new mark_as_verified_use_case(
      this.user_repository,
      this.repository
    );
    try {
      const user_verified = await mark.run(token);

      const public_user: Partial<User> = {
        name: user_verified.name,
        last_name: user_verified.last_name,
        email: user_verified.email,
        role: user_verified.role,
      };

      return {
        status: 200,
        message: "User verified",
        data: {
          user: public_user,
          token,
        },
      };
    } catch (error) {
      if (error instanceof user_already_verified_exception) {
        return {
          status: 400,
          message: "User is already verified",
          error: "Bad Request",
        };
      }

      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "User not found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  @Put("/{email}")
  @SuccessResponse("201", "Info Updated")
  async update(@Path() email: string, @Body() user_data: update_user_dto) {
    const update_user = new update_user_use_case(
      this.repository,
      this.user_repository
    );
    try {
      const updated_user = await update_user.run(email, user_data);
      return {
        status: 201,
        message: "Info updated",
        data: updated_user,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "User Not Found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  @Delete("{email}")
  @SuccessResponse("201", "User Deleted")
  async delete_user(@Path() email: string) {
    const _delete = new delete_user_use_case(
      this.repository,
      this.user_repository
    );

    try {
      await _delete.run(email);
      return {
        status: 201,
        message: "User Deleted",
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "User Not Found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  @Post("logout")
  @SuccessResponse("200", "Session Closed")
  logout() {
    return {
      status: 200,
      message: "Session closed",
    };
  }
}
