import express from "express";
import register_user_controller from "../controllers/auth/register_user.controller";
const auth_router = express.Router();

auth_router.post("/register", register_user_controller);

export default auth_router;
