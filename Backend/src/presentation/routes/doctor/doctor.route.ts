import express from "express";
import { doctor_profile_router } from "./profile/profile.route";

export const doctor_router = express.Router();

doctor_router.use("/profile", doctor_profile_router);
