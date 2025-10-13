import express from "express";
import { create_role_controller } from "../controllers/role/create_role.controller";

const role_router = express.Router();

role_router.post("/new", create_role_controller);

export default role_router;
