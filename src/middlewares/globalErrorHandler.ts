import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message,
    errorStack: config.node_env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;


// how to use?
// return next(createError(401, 'Please login to view this page.'))