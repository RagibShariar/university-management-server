import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import ApiResponse from "../../utils/ApiResponse";
import {
  deletedStudentsFromDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
} from "./student.service";

// get all students
const getAllStudents = async (req: Request, res: Response) => {
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
    const { studentId } = req.params;
    const result = await getSingleStudentFromDB(studentId);

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

// Delete a single student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await deleteStudentFromDB(studentId);

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
const deletedStudents = async (req: Request, res: Response) => {
  try {
    const result = await deletedStudentsFromDB();
    console.log("deleted route hitting");
    res.status(201).json({
      success: true,
      message: "All deleted students are successfully retrieved",
      data: result,
    });
  } catch (error) {
    console.log(error);
    console.log("deleted route hitting");
  }
};

export { deletedStudents, deleteStudent, getAllStudents, getSingleStudent };
