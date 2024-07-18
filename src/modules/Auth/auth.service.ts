import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const isUserExists = await User.findOne({ id: payload?.id });
  // console.log(isUserExists);

  // check if user exists
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

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    isUserExists.password
  );
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  //? if all ok --> grant access. send access token, refresh token

  const jwtPayload = {
    id: isUserExists.id,
    role: isUserExists.role,
  };

  //* create access token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "7d",
  });

  //* create refresh token
  // const refreshToken = jwt.sign(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   { expiresIn: "14d", }
  // );

  return {
    accessToken,

    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

// change password
// const changePassword = async (payload) => {
  
// }

export const authServices = {
  loginUser,
};
