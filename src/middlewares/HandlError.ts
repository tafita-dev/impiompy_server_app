// errorMiddleware.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { HandlerError } from "../class/class";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: HandlerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const success = err.statusCode === 200 ? true : false;
  const data = err.data ? err.data : "";

  // Envoi de la réponse d'erreur au client
  return res.status(statusCode).json({
    success,
    message: err.message,
    data,
  });
};
