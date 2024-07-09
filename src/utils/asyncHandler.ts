//* Higher Order Function
//? A function that takes a function as a parameter,
//?   do some tasks and return a function.

import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

// const asyncHandler = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch((err: HttpError) => next(err));
//   };
// };

export { asyncHandler };
