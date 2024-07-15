import { Types } from "mongoose";

export type IFaculty = {
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
  image?: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
};

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
