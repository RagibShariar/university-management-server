import { Request, Response } from "express";
import { createStudentToDB, getAllStudentsFromDB } from "./student.service";

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
    console.log("Something went wrong while creating student", error);
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

export { createStudent , getAllStudents};
