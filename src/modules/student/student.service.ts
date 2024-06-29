import { Student as IStudent } from "./student.interface";
import { Student } from "./student.model";

// create a new Student
const createStudentToDB = async (studentData: IStudent) => {
  const result = await Student.create(studentData);
  return result;
};

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get a single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export { createStudentToDB, getAllStudentsFromDB, getSingleStudentFromDB };
