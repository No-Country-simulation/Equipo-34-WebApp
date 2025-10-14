import express from "express";
import { create_role_controller } from "../controllers/role/create_role.controller";
import { get_roles_controller } from "../controllers/role/get_roles.controller";
import { search_role_controller } from "../controllers/role/search_role.controller";
import { update_role_controller } from "../controllers/role/update_role.controller";
import { delete_role_controller } from "../controllers/role/delete_role.controller";

const role_router = express.Router();

role_router.get("/", get_roles_controller);
role_router.get("/:id", search_role_controller);
role_router.post("/new", create_role_controller);
role_router.put("/:id", update_role_controller);
role_router.delete("/:id", delete_role_controller);

export default role_router;
