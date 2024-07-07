import { Student as IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";


// create a new Student
const createStudentToDB = async (password: string, studentData: IStudent) => {
  //todo: Static method to check if the student is already existed
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("Student already exists!");
  // }

  // create a user oject

  // if password is not given, set default password 

  // set role as student
  
  // set generated student id

  // create a user 

  // create a student








};



export {
  createStudentToDB
}