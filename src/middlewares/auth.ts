import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const auth = () => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.header("Authorization"));
      // console.log(req.headers.authorization);

      const token = req.headers.authorization?.split(" ")[1];
      // console.log(token)

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized request");
      }

      // if the token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      req.user = decoded as JwtPayload;
      console.log(req.user)
      next();
    }
  );
};

export default auth;
