import { Student } from "./student.model";

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get a single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id} }]);
  return result;
};

// delete a student from the database
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

// get deleted students from the database
const deletedStudentsFromDB = async () => {
  const result = await Student.find({
    isDeleted: { $eq: true },
  });
  return result;
};

export {
  deletedStudentsFromDB,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
