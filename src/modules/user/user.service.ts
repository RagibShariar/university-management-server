import { config } from "../../config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

// create a new Student
const createStudentToDB = async (password: string, studentData: IStudent) => {
  //todo: Static method to check if the student is already existed
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("Student already exists!");
  // }

  //* create a user oject
  const user: Partial<IUser> = {};

  //* set role as student
  user.role = "student";

  //* if password is not given, then set default password
  user.password = password || config.default_password;

  //* set generated student id
  user.id = "2024010011";

  //* create a user into DB
  const newUser = await User.create(user);

  //* create a student into DB
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id

    const result = await Student.create(studentData);
    return result;
  }
};

export { createStudentToDB };
