import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

//* Higher Order Function
//? A function that takes a function as a parameter,
//?   do some tasks and return a function.
// const asyncHandler = (func) => {
//   return () => { func() }
// }

//? Method 1
// const asyncHandler = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch((err: HttpError) => next(err));
//   };
// };

//? Method 2
// const asyncHandler = (fn: RequestHandler) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };

export default asyncHandler;
