import express from "express";
import health_router from "./health.route.ts";

const index_router = express.Router();

index_router.use("/", health_router);

export default index_router;
