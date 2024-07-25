import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { IUserRole } from "../modules/user/user.interface";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const auth = (...user_role: IUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.header("Authorization"));
      // console.log(req.headers.authorization);

      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized request");
      }

      // verify access token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      if (user_role && !user_role.includes(decoded?.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized request");
      }

      // attach user to request object
      req.user = decoded as JwtPayload;

      next();
    }
  );
};

export default auth;
