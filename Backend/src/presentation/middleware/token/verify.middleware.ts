import type { NextFunction, Request, Response } from "express";
import { verify_token } from "../../../infrastructure/external/Utils/jwt.util";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      name: string;
      email: string;
      role: string;
    };
  }
}

export const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["Access-Token"];

    if (!token) {
      throw res.status(400).json({
        status: 400,
        message: "No se ha podido obtener el token",
        error: "Bad Request",
      });
    }

    const data = verify_token(token);

    req.user = data;
  } catch (error) {
    console.error("Error en validacion de token:", error);
    res.status(401).json({
      status: 401,
      message: "No autenticado",
      error: "Unathorized",
    });
  }

  next();
};
