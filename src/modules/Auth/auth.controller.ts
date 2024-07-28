import httpStatus from "http-status";
import { config } from "../../config";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { authServices } from "./auth.service";

//* login user with custom id and password
const loginUser = asyncHandler(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, needsPasswordChange } = result;

  // set refresh token in cookie
  res.cookie("refreshToken", result.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  ApiResponse(res, httpStatus.OK, "User logged in successfully", {
    accessToken,
    needsPasswordChange,
  });
});

//* change password 
const changePassword = asyncHandler(async (req, res) => {
  // console.log(req.user);
  // console.log(req.body);
  const result = await authServices.changePassword(req.user, req.body);

  ApiResponse(res, httpStatus.OK, "Password changed successfully", result);
});

export const authController = {
  loginUser,
  changePassword,
};
