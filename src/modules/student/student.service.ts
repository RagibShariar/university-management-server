import { Student as IStudent } from "./student.interface";
import { Student } from "./student.model";

// create a new Student
const createStudentToDB = async (studentData: IStudent) => {
  //todo: Static method to check if the student is already existed
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error("Student already exists!");
  }

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
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    { $match: { id: id } }
  ])
  return result;
};

// delete a student from the database
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export {
  createStudentToDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
