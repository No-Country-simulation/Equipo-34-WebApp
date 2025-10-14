import express from "express";
import register_user_controller from "../controllers/auth/register_user.controller";
import { update_user_controller } from "../controllers/auth/update_user.controller";
import { delete_user_controller } from "../controllers/auth/delete_user.controller";
const auth_router = express.Router();

auth_router.post("/register", register_user_controller);
auth_router.put("/:email", update_user_controller);
auth_router.delete("/:email", delete_user_controller);

export default auth_router;
