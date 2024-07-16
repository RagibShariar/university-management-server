import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { loginUser } from "./auth.service";

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  ApiResponse(res, httpStatus.OK, "User logged in successfully", result);
});

export { login };
