import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { cors_options } from "./src/infrastructure/config/cors.config";

const server = express();

server.use(express.json());
server.use(cors(cors_options));
server.use(morgan("tiny"));

const PORT = process.env.PORT || 3001;

server.use("/", (req: Request, res: Response) => {
  res.send("Hola de nuevo");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
