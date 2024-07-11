import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const academicSemesterCodeMapper = {
  Spring: "01",
  Summer: "02",
  Fall: "03",
};

// Create a new academic semester
const createAcademicSemesterToDb = async (payload: IAcademicSemester) => {
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

//  Get all academic semesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get a single academic semester
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// update a single academic semester
const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code");
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export {
  createAcademicSemesterToDb,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
