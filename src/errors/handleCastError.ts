import mongoose from "mongoose";
import { IErrorSource, IGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errorSource: IErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Mongoose Cast Error, Invalid ID",
    errorSource,
  };
};

export default handleCastError;
