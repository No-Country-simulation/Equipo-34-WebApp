import { Controller, Get, Query, Route, SuccessResponse } from "tsoa";
import { user_repository_implemented } from "../../../infrastructure/repositories/user/user.repository";
import { get_users_use_case } from "../../../application/use-cases/user/get_all_users.use-case";
import { no_users_registered } from "../../../domain/exceptions/user/no_users_registered.exception";
import { search_user_by_email_use_case } from "../../../application/use-cases/user/search_user_email.use-case";
import { user_not_found } from "../../../domain/exceptions/user/not-found.exception";

@Route("user")
export class user_controller extends Controller {
  private readonly repository = new user_repository_implemented();

  @Get("/")
  @SuccessResponse("200", "Users Retrieve")
  async get_users(@Query() page: number, @Query() limit: number) {
    const get = new get_users_use_case(this.repository);

    try {
      const users = await get.run(page, limit);
      return {
        status: 200,
        message: "Users Retrieve",
        data: users.data,
        pagination: users.pagination,
      };
    } catch (error) {
      if (error instanceof no_users_registered) {
        return {
          status: 404,
          message: "No users registered yet",
          error: "No Content",
        };
      }
      throw error;
    }
  }

  @Get("/{email}")
  @SuccessResponse("200", "User Found")
  async search(email: string) {
    const use_case = new search_user_by_email_use_case(this.repository);

    try {
      const user = await use_case.run(email);
      return {
        status: 200,
        message: "User Found",
        data: user,
      };
    } catch (error) {
      if (error instanceof user_not_found) {
        return {
          status: 404,
          message: "User Not Found", //I know it should be 204 (No content)
          error: "No content",
        };
      }

      throw error;
    }
  }
}
