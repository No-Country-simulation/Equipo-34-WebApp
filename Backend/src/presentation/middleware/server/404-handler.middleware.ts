import type { Request, Response } from "express";

const not_found_handler = (req: Request, res: Response) => {
  res.redirect("/");
};

export default not_found_handler;
