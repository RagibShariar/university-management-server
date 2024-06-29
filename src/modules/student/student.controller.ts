import { Request, Response } from "express";
import {
  createStudentToDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
} from "./student.service";

// Create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const result = await createStudentToDB(studentData);

    res.status(200).json({
      success: true,
      messsage: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating student",
      error: error,
    });
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: "All students are successfully retrieved",
      data: result,
    });
  } catch (error) {
    console.log("Failed to retrieved students", error);
  }
};

// get a single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting a single student",
      error: error
    });
  }
};

export { createStudent, getAllStudents, getSingleStudent };
