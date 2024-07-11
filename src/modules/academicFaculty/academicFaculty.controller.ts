import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { createAcademicFacultyToDb } from "./academicFaculty.service";

const createAcademicFaculty = asyncHandler(async (req, res) => {
  const result = await createAcademicFacultyToDb(req.body);

  ApiResponse(
    res,
    httpStatus.CREATED,
    "Academic faculty created successfully",
    result
  );
});

export { createAcademicFaculty };
