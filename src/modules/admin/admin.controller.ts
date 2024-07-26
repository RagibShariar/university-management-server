import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { adminServices } from "./admin.service";

// get all admins
const getAllAdmins = asyncHandler(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB();

  ApiResponse(
    res,
    httpStatus.OK,
    "All admins are retrieved successfully",
    result
  );
});

// get a single admin
const getSingleAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDB(id);

  ApiResponse(res, httpStatus.OK, "Admin retrieved successfully", result);
});

export const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
};
