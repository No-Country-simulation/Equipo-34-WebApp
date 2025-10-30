import type { NextFunction, Request, Response } from "express";

const error_handler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: "Unknown",
  });
  console.log(`Error: ${error}`);
  next();
};

export default error_handler;
