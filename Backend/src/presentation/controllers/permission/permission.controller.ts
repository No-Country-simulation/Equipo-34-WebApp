import { permission_repository_implemented } from "../../../infrastructure/repositories/permission/permission.repository";
import { get_permissions_use_case } from "../../../application/use-cases/permission/get_permissions.use-case";
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
import { no_permissions_registered_exception } from "../../../domain/exceptions/permission/no_permissions_registered.exception";
import { search_permission_use_case } from "../../../application/use-cases/permission/search_permission.use-case";
import { permission_not_found_exception } from "../../../domain/exceptions/permission/permission_not_found.exception";
import type { create_permission_dto } from "../../../application/dto/permissions.dto";
import { create_permission_use_case } from "../../../application/use-cases/permission/create_permission.use-case";
import { permission_already_exist_exception } from "../../../domain/exceptions/permission/permission_already_exist.exception";
import { update_permission_use_case } from "../../../application/use-cases/permission/update_permission.use-case";
import { delete_permission_use_case } from "../../../application/use-cases/permission/delete_permission.use-case";

@Route("/permission")
export class permission_controller extends Controller {
  private readonly repository = new permission_repository_implemented();

  @SuccessResponse("200", "Permissions retrieve succesfully")
  @Get("/")
  async get_permissions(@Query() page: number, @Query() limit: number) {
    const list = new get_permissions_use_case(this.repository);

    try {
      const permissions = await list.run(page, limit);
      return {
        status: 200,
        message: "Permissions retrieve succesfully",
        data: permissions,
      };
    } catch (error) {
      if (error instanceof no_permissions_registered_exception) {
        return {
          status: 404,
          message: "No permissions registered",
          error: "Not found",
        };
      }
      throw error;
    }
  }

  @SuccessResponse("200", "Permission retrieve succesfully")
  @Get("/{id}")
  async search_permission(@Path() id: number) {
    const search = new search_permission_use_case(this.repository);

    try {
      const permission = await search.run(id);
      return {
        status: 200,
        message: "Permission retrieve succesfully",
        data: permission,
      };
    } catch (error) {
      if (error instanceof permission_not_found_exception) {
        return {
          status: 404,
          message: "Permission not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }

  @SuccessResponse("201", "Permission created succesfully")
  @Post("/new")
  async create_permission(@Body() permission_data: create_permission_dto) {
    const create = new create_permission_use_case(this.repository);

    try {
      const new_permission = await create.run(permission_data);

      return {
        status: 201,
        message: "Permission created succesfully",
        data: new_permission,
      };
    } catch (error) {
      if (error instanceof permission_already_exist_exception) {
        return {
          status: 400,
          message: "Permission Already exist",
          error: "Bad Request",
        };
      }

      throw error;
    }
  }

  @SuccessResponse("200", "Permission updated succesfully")
  @Put("/{id}")
  async update_permission(
    @Path("id")
    id: number,
    @Body()
    permission_data: create_permission_dto
  ) {
    const update = new update_permission_use_case(this.repository);

    try {
      const update_permission = await update.run(id, permission_data);
      return {
        status: 200,
        message: "Permission updated succesfully",
        data: update_permission,
      };
    } catch (error) {
      if (error instanceof permission_not_found_exception) {
        return {
          status: 404,
          message: "Permission not found",
          error: "Not Found",
        };
      }
      throw error;
    }
  }

  @Delete("/{id}")
  async delete_permission(@Path() id: number) {
    const _delete = new delete_permission_use_case(this.repository);

    try {
      await _delete.run(id);
      return {
        status: 201,
        message: "Permission deleted",
      };
    } catch (error) {
      if (error instanceof permission_not_found_exception) {
        return {
          status: 404,
          message: "Permission not found",
          error: "Not found",
        };
      }

      throw error;
    }
  }
}
