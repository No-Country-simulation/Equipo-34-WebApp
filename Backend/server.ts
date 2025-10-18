import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { cors_options } from "./src/infrastructure/config/server/cors.config";
import index_router from "./src/presentation/routes/index.route";
import not_found_handler from "./src/presentation/middleware/server/404-handler.middleware";
import error_handler from "./src/presentation/middleware/server/error-handler.middleware";
import { scalar_middleware } from "./src/presentation/middleware/Docs/scalar.middleware";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors(cors_options));
server.use(morgan("tiny"));

const PORT = process.env.PORT || 3001;

server.use("/", index_router);
server.use("/docs", scalar_middleware);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}
Documentation is running on http://localhost:${PORT}/docs`);
});

server.use(not_found_handler);
server.use(error_handler);
