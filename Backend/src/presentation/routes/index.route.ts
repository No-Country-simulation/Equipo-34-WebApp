import express from "express";
import health_router from "./health.route.ts";
import user_router from "./user.route.ts";

const index_router = express.Router();

index_router.use("/", health_router);
index_router.use("/users", user_router);

export default index_router;
