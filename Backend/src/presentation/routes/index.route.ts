import express from "express";
import health_router from "./health.route.ts";
import user_router from "./user.route.ts";
import auth_router from "./auth.route.ts";
import { patient_router } from "./patient.route.ts";
import { doctor_router } from "./doctor/doctor.route.ts";

const index_router = express.Router();

index_router.use("/", health_router);
index_router.use("/user", user_router);
index_router.use("/auth", auth_router);
index_router.use("/patient", patient_router);
index_router.use("/doctor", doctor_router);

export default index_router;
