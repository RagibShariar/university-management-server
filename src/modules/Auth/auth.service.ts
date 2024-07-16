import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const isUserExists = await User.findOne({ id: payload?.id });
  console.log(isUserExists);

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

  //? grant access. send access token, refresh token
};

export { loginUser };
