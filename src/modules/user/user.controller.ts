import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { createStudentToDB } from "./user.service";

// Create a new student
const createStudent = asyncHandler(async (req, res) => {
  const { password, student: studentData } = req.body;
  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await createStudentToDB(password, studentData);

  // res.status(200).json({
  //   success: true,
  //   message: "Student created successfully",
  //   data: result,
  // });
  ApiResponse(res, httpStatus.CREATED, "Student created successfully", result);
});

export const userController = {
  createStudent,
};
