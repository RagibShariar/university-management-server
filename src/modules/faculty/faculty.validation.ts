import { z } from "zod";

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

//! Faculty Zod Validation
export const createFacultyValidationSchema = z.object({
  // body: z.object({

  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters or longer" }).optional(),

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
      .min(1, { message: "Contact num is required" }),
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
    image: z.string().trim().optional(),
    academicDepartment: z.string(),
  }),
});
// });

//todo: update validation schema

const updateNameValidationSchema = z.object({
  firstName: z
    .string({ invalid_type_error: "First name must be a string" })
    .max(20, { message: "First name can not be more than 20 characters." })
    .trim()
    .optional(),
  middleName: z
    .string({
      invalid_type_error: "Middle name must be a string",
    })
    .trim()
    .optional(),
  lastName: z
    .string({ invalid_type_error: "Last name must be a string" })
    .trim()
    .optional(),
});

//! Faculty update Zod Validation
export const updateFacultyValidationSchema = z.object({
  // body: z.object({

  faculty: z.object({
    name: updateNameValidationSchema.optional(),
    email: z
      .string({ invalid_type_error: "Email must be a string" })
      .email({ message: "Invalid email address" })
      .trim()
      .optional(),
    gender: z
      .enum(["male", "female", "others"], {
        invalid_type_error:
          "Gender must be one of 'male', 'female', or 'others'",
      })
      .optional(),
    dateOfBirth: z
      .string({ invalid_type_error: "Date of birth must be a string" })
      .optional(),
    contactNo: z
      .string({ invalid_type_error: "Contact number must be a string" })
      .trim()
      .min(1, { message: "Contact number is required" })
      .optional(),
    emergencyContactNo: z
      .string({
        invalid_type_error: "Emergency contact number must be a string",
      })
      .trim()
      .optional(),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        invalid_type_error: "Blood group must be a valid blood type",
      })
      .optional(),
    presentAddress: z
      .string({ invalid_type_error: "Present address must be a string" })
      .trim()
      .optional(),
    permanentAddress: z
      .string({ invalid_type_error: "Permanent address must be a string" })
      .trim()
      .optional(),
    nationality: z
      .string({ invalid_type_error: "Nationality must be a string" })
      .trim()
      .optional(),
    religion: z
      .string({ invalid_type_error: "Religion must be a string" })
      .trim()
      .optional(),
    maritalStatus: z
      .enum(
        ["Single", "Married", "Divorced", "Widowed", "Separated", "Partnered"],
        {
          invalid_type_error: "Marital status must be one of the valid options",
        }
      )
      .optional(),
    image: z
      .string({ invalid_type_error: "Image must be a string" })
      .trim()
      .optional(),
    admissionFaculty: z
      .string({ invalid_type_error: "Academic faculty must be a string" })
      .optional(),
    academicDepartment: z
      .string({ invalid_type_error: "Academic department must be a string" })
      .optional(),
  }),
  // })
});
