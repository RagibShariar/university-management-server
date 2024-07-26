import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const isUserExists = await User.findOne({ id: payload?.id }).select(
    "+password"
  );
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
const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // console.log(user)
  // console.log(payload);

  const isUserExists = await User.findOne({ id: user?.id }).select("+password");
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the current password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "incorrect Password");
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await User.findOneAndUpdate(
    {
      id: user?.id,
      role: user?.role,
    },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const authServices = {
  loginUser,
  changePassword,
};
