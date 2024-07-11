import { Student } from "./student.model";

// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty", // nested populate
      },
    });
  return result;
};

// get a single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty", // nested populate
      },
    });
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
