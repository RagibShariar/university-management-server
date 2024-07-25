import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  deletedStudentsFromDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentToDb,
} from "./student.service";

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  // console.log(req.user);
  try {
    const result = await getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: "All students are successfully retrieved",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while getting students",
      error: error,
    });
  }
};

// get a single student
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getSingleStudentFromDB(id);

    // res.status(200).json({
    //   success: true,
    //   message: "Student retrieved successfully",
    //   data: result,
    // });
    ApiResponse(res, 200, "Student retrieved successfully", result);
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: "Something went wrong while getting a single student",
    //   error: error,
    // });
    return next(
      createHttpError(
        500,
        "Something went wrong while getting a single student"
      )
    );
  }
};

// update a single student
const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await updateStudentToDb(id, student);

  ApiResponse(res, 200, "Student updated successfully", result);
});

// Delete a single student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while getting a single student",
      error: error,
    });
  }
};

// get Deleted Students
const deletedStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deletedStudentsFromDB();
    res.status(201).json({
      success: true,
      message: "All deleted students are successfully retrieved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  deletedStudents,
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
