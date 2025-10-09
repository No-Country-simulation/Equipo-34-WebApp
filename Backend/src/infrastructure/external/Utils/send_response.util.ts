import { type Response } from "express";

interface http_response<T> {
  status: number;
  message: string;
  data?: T;
  error?: unknown;
}

export function send_response<T>(res: Response, response: http_response<T>) {
  res.status(response.status).json(response);
}
