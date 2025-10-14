import express from "express";
import { create_permission_controller } from "../controllers/permission/create_permission.controller";
import { get_permissions_controller } from "../controllers/permission/get_permissions.controller";
import { search_permission_controller } from "../controllers/permission/search_permission.controller";
import { update_permission_controller } from "../controllers/permission/update_permission.controller";
import { delete_permission_controller } from "../controllers/permission/delete_permission.controller";

const permission_router = express.Router();

permission_router.get("/", get_permissions_controller);
permission_router.get("/:id", search_permission_controller);
permission_router.post("/new", create_permission_controller);
permission_router.put("/:id", update_permission_controller);
permission_router.delete("/:id", delete_permission_controller);

export default permission_router;
