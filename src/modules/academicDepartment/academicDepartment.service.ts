import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

// create a new academic department
const createAcademicDepartmentToDb = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// get all academic departments
const getAllAcademicDepartmentsFromDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

// get single academic department
const getSingleAcademicDepartmentFromDb = async (departmentId: string) => {
  const result = await AcademicDepartment.findById(departmentId);
  return result;
};

// update a single academic department
const updateAcademicDepartmentToDb = async (
  departmentId: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    departmentId,
    payload,
    {
      new: true,
    }
  );
  return result;
};

export {
  createAcademicDepartmentToDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentToDb,
};
