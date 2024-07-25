import { string, z } from "zod";

const createNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, {
      message: "First name can not be more than 20 characters.",
    })
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

export const createAdminValidationSchema = z.object({
  password: string()
    .min(6, { message: "Password must be at least 6 characters or longer" })
    .optional(),

  faculty: z.object({
    name: createNameValidationSchema,
    email: z.string().email().trim(),
    gender: z.enum(["male", "female", "others"]),
    dateOfBirth: z.string(),
    contactNo: z
      .string({
        required_error: "Contact num is required",
        invalid_type_error: "Contact No must be a string",
      })
      .trim()
      .min(1, { message: "Contact number is required" }),
    emergencyContactNo: z
      .string({
        invalid_type_error: "Emergency contact number must be a string",
      })
      .trim(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().trim(),
    permanentAddress: z.string().trim(),
    nationality: z.string().trim(),
    religion: z.string().trim(),
    maritalStatus: z
      .enum([
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
        "Partnered",
      ])
      .optional(),
    image: z.string().trim().optional(),
    isDeleted: z.boolean().default(false),
  }),
});
