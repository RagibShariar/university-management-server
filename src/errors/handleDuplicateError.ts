import { IErrorSource, IGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err?.message?.match(/(["'])(\\?.)*?\1/);
  const value = match && match[0];

  const statusCode = 400;
  const errorSource: IErrorSource = [
    {
      path: value,
      message: `${value} is already exists`,
    },
  ];
  return {
    statusCode,
    message: "Mongoose Duplicate Key Error",
    errorSource,
  };
};

export default handleDuplicateError;
