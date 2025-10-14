import express from "express";
import { get_users_controller } from "../controllers/user/get_users.controller";
import { search_user_by_email_controller } from "../controllers/user/search_user_email.controller";

const user_router = express.Router();

user_router.get("/", get_users_controller);
user_router.get("/:email", search_user_by_email_controller);

export default user_router;
