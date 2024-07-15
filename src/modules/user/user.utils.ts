import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: IAcademicSemester) => {
  let currentId = (0).toString(); // 000 by default

  const lastStudentId = await findLastStudentId();
  //23 01 001
  const lastStudentSemesterYear = lastStudentId?.substring(0, 2); //23
  const lastStudentSemesterCode = lastStudentId?.substring(2, 4); //01
  const currentSemesterYear = payload.year.slice(-2);
  const currentSemesterCode = payload.code;

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(4);
  }

  let incrementId = (parseInt(currentId) + 1).toString().padStart(3, "0"); // 000

  incrementId = `${payload.year.slice(-2)}${
    payload.code
  }${incrementId}` as string;

  return incrementId;
};

// -----------------------------------------------------------
// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};