import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterToDb = async (payload: IAcademicSemester) => {
  const academicSemesterCodeMapper = {
    Spring: "01",
    Summer: "02",
    Fall: "03",
  };
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error(
      `Invalid semester code. ${payload.name} code is ${
        academicSemesterCodeMapper[payload.name]
      }`
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export { createAcademicSemesterToDb };
