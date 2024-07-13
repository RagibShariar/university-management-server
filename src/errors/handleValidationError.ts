import mongoose from "mongoose";
import { IErrorSource, IGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorSource: IErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Mongoose Validation Error",
    errorSource,
  };
};

export default handleValidationError;
