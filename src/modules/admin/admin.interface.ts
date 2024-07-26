import { Types } from "mongoose";

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: Name;
  email: string;
  gender: "male" | "female";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  nationality: string;
  religion: string;
  image: string;
  isDeleted: boolean;
};
