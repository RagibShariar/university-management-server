import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model"





const createAcademicSemesterToDb = async(payload:IAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
}

export {
  createAcademicSemesterToDb,
}