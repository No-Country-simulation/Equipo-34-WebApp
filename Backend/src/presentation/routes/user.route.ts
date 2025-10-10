import express from "express";
import { get_users_controller } from "../controllers/user/get_users.controller";

const user_router = express.Router();

user_router.get("/", get_users_controller);

export default user_router;
