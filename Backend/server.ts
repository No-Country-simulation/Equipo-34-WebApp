import express from "express";
import cors from "cors";
import morgan from "morgan";
import { cors_options } from "./src/infrastructure/config/cors.config";
import index_router from "./src/presentation/routes/index.route";

const server = express();

server.use(express.json());
server.use(cors(cors_options));
server.use(morgan("tiny"));

const PORT = process.env.PORT || 3001;

server.use("/", index_router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
