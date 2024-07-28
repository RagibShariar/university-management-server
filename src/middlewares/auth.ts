import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { IUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
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

      // check if user exists
      const isUserExists = await User.findOne({ id: decoded?.id }).select(
        "+password"
      );
      if (!isUserExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
      }

      // check if user is deleted
      if (isUserExists.isDeleted === true) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User is deleted");
      }

      // check if user is blocked
      if (isUserExists.status === "blocked") {
        throw new ApiError(httpStatus.FORBIDDEN, "User is blocked");
      }

      // check if the jwt token issued before the password change
      const jwtIssuedAt = decoded.iat as number;
      if (
        isUserExists.passwordChangedAt &&
        new Date(isUserExists.passwordChangedAt).getTime() / 1000 > jwtIssuedAt
      ) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Token is invalid due to password change. please log in again"
        );
      }

      // check if user role is valid
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
