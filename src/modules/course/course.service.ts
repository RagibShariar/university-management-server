import { ICourse } from "./course.interface";
import { Course } from "./course.model";

// Create a new course
const createCourseToDb = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get all courses
const getAllCoursesFromDb = async () => {
  const result = await Course.find().populate("preRequisiteCourse.course");
  return result;
};

// Get single course
const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

// Update a single course
const updateCourseToDb = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// soft Delete a single course
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export {
  createCourseToDb,
  deleteCourseFromDB,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseToDb,
};
