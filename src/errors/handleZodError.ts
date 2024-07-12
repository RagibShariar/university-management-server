import { ZodError } from "zod";
import { IErrorSource } from "../interface/error";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;

  const errorSource: IErrorSource = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: "Zod Validation Error",
    errorSource,
  };
};

export default handleZodError;
