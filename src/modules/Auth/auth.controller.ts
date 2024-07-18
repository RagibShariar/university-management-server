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
  // const result = await authServices.changePassword(req.body);
  // console.log(req.user);

  ApiResponse(res, httpStatus.OK, "Password changed successfully", null);
});

export const authController = {
  loginUser,
  changePassword,
};
