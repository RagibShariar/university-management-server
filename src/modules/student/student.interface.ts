import { Model, Types } from "mongoose";

export type IStudent = {
  id: string;
  user: Types.ObjectId; // reference to the user object
  name: Name;
  email: string;
  password: string;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  nationality: string;
  religion: string;
  maritalStatus:
    | "Single"
    | "Married"
    | "Divorced"
    | "Widowed"
    | "Separated"
    | "Partnered";
  guardian: Guardian;
  localGuardian: LocalGuardian;
  image?: string;
  admissionSemester: Types.ObjectId; 
  isDeleted: boolean;
};

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  fatherEmail?: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  motherEmail?: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  email?: string;
  address: string;
  relation: string;
};

//todo: creating a Mongoose custom instance methods
// export interface StudentMethods {
//   isStudentExists(id: string): Promise<Student | null>;
// }

//todo: Creating a Mongoose custom static methods
export interface StudentModel extends Model<Student> {
  isStudentExists(id: string): Promise<Student | null>;
}
