/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { config } from "../config";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { IErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  let errorSource: IErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }

  //?ultimate return
  return res.status(statusCode).json({
    success: false,
    message: err.message,
    errorSource,
    errorStack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;

// how to use?
// return next(createError(401, 'Please login to view this page.'))
