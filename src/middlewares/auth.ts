/* eslint-disable no-undef */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const auth = asyncHandler(
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
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { id, role  } = decoded as JwtPayload



    console.log(decoded.id);
    next();
  }
);

export default auth;
