import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { cors_options } from "./src/infrastructure/config/cors.config";
import index_router from "./src/presentation/routes/index.route";
import not_found_handler from "./src/presentation/middleware/server/404-handler.middleware";
import error_handler from "./src/presentation/middleware/server/error-handler.middleware";

const server = express();

server.use(express.json());
server.use(cors(cors_options));
server.use(morgan("tiny"));
server.use(cookieParser());

const PORT = process.env.PORT || 3001;

server.use("/", index_router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.use(not_found_handler);
server.use(error_handler);
