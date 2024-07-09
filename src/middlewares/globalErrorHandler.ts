import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import httpStatus from "http-status";
import { config } from "../config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Something went wrong",
    errorStack: config.node_env === "development" ? err : "",
  });
};

export default globalErrorHandler;

// how to use?
// return next(createError(401, 'Please login to view this page.'))
