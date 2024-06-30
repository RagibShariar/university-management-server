import { z } from "zod";

const nameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, {
      message: "First name can not be more than 20 characters.",
    })
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  fatherEmail: z.string().trim().optional(),
  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim(),
  motherEmail: z.string().trim().optional(),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  email: z.string().trim().optional(),
  address: z.string().trim(),
  relation: z.string().trim(),
});

//! Student Zod Validation
export const studentValidationSchema = z.object({
  id: z.string(),
  name: nameValidationSchema.required(),
  email: z.string().email().trim(),
  password :z.string().min(6,{message:"password must be at least 6 characters or longer"}),
  gender: z.enum(["male", "female", "others"]),
  dateOfBirth: z.string(),
  contactNo: z.string().trim(),
  emergencyContactNo: z.string().trim(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  nationality: z.string().trim(),
  religion: z.string().trim(),
  maritalStatus: z.enum([
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
    "Partnered",
  ]),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  image: z.string().trim().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});
