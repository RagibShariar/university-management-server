import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { authServices } from "./auth.service";

const loginUser = asyncHandler(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  // res.cookie("refreshToken", result.refreshToken, {
  //   httpOnly: true,
  //   secure: config.node_env==="production",
  // });

  ApiResponse(res, httpStatus.OK, "User logged in successfully", result);
});

// change password
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
