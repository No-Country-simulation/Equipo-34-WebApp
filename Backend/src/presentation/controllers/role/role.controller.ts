import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import type { Role } from "../../../domain/entities/role.entity";
import type { create_role_dto } from "../../../application/dto/role.dto";
import { role_repository_implemented } from "../../../infrastructure/repositories/role/role.repository";
import { no_roles_registered_exception } from "../../../domain/exceptions/role/no_roles_registered.exception";
import { role_not_found_exception } from "../../../domain/exceptions/role/role_not_found.exception";
import { role_already_exist_exception } from "../../../domain/exceptions/role/role_already_exist.exception";
import { get_roles_use_case } from "../../../application/use-cases/role/get_roles_use-cases";
import { search_role_use_case } from "../../../application/use-cases/role/search_role.use-case";
import { create_role_use_case } from "../../../application/use-cases/role/create_role.use-case";
import { update_role_use_case } from "../../../application/use-cases/role/update_role.use-case";
import { delete_role_use_case } from "../../../application/use-cases/role/delete_role.use-case";
import type { Pagination } from "../../../application/dto/pagination.dto";

@Route("role")
export class role_controller extends Controller {
  private readonly repository = new role_repository_implemented();

  @Get("/")
  @SuccessResponse("200", "Roles retrieve")
  async get_roles(
    @Query() page: number,
    @Query() limit: number
  ): Promise<{
    status: number;
    message: string;
    data?: Role[];
    pagination?: Pagination;
    error?: string;
  }> {
    const get_roles = new get_roles_use_case(this.repository);

    try {
      const roles = await get_roles.run(page, limit);
      return {
        status: 200,
        message: "Roles retrieve",
        data: roles.data,
        pagination: roles.pagination,
      };
    } catch (error) {
      if (error instanceof no_roles_registered_exception) {
        return {
          status: 404,
          message: "No roles registered",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  @Get("/{role_id}")
  @SuccessResponse("200", "Role found")
  async search_roles(@Path() role_id: number) {
    const search = new search_role_use_case(this.repository);
    try {
      const role = await search.run(role_id);
      return {
        status: 200,
        message: "Role Found",
        data: role,
      };
    } catch (error) {
      if (error instanceof role_not_found_exception) {
        return {
          status: 404,
          message: "Role Not Found",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  @Post("/new")
  @SuccessResponse("201", "Role created")
  async create_role(@Body() role_data: create_role_dto) {
    const create = new create_role_use_case(this.repository);
    try {
      const new_role = await create.run(role_data);
      return {
        status: 201,
        message: "Role created",
        data: new_role,
      };
    } catch (error) {
      if (error instanceof role_already_exist_exception) {
        return {
          status: 400,
          message: "Role Already exist",
          error: "Bad Request",
        };
      }

      throw error;
    }
  }

  @Put("/{role_id}")
  @SuccessResponse("200", "Role updated")
  async update_role(
    @Path() role_id: number,
    @Body() role_data: create_role_dto
  ) {
    const update = new update_role_use_case(this.repository);
    try {
      const updated_role = await update.run(role_id, role_data);
      return {
        status: 200,
        message: "Role updated",
        data: updated_role,
      };
    } catch (error) {
      if (error instanceof role_not_found_exception) {
        return {
          status: 404,
          message: "Role Not Found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }

  @Delete("/{role_id}")
  @SuccessResponse("201", "Role Deleted")
  async delete_role(@Path() role_id: number) {
    const _delete = new delete_role_use_case(this.repository);

    try {
      await _delete.run(role_id);
      return {
        status: 201,
        message: "Role Deleted",
      };
    } catch (error) {
      if (error instanceof role_not_found_exception) {
        return {
          status: 404,
          message: "Role Not Found",
          error: "Not Found",
        };
      }

      throw error;
    }
  }
}
