import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { loginUser } from "./auth.service";
import { config } from "../../config";

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  // res.cookie("refreshToken", result.refreshToken, {
  //   httpOnly: true,
  //   secure: config.node_env==="production",
  // });

  ApiResponse(res, httpStatus.OK, "User logged in successfully", result);
});

export { login };
