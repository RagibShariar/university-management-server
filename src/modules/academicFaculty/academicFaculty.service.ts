import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyToDb = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get all academic faculties
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// Get a single academic faculty
const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// Update a single academic faculty
const updateAcademicFacultyToDb = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export {
  createAcademicFacultyToDb,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyToDb,
};
