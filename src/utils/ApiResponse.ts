import { Response } from "express";

const ApiResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T
): Response => {
  return res.status(statusCode).json({
    success: true,
    statusCode: statusCode >= 200 && statusCode < 400,
    message: message,
    data: data,
  });
};

export default ApiResponse;


// how to use?
// ApiResponse(res, 200, 'Student retrieved successfully', result);