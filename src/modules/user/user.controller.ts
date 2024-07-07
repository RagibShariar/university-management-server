import { createStudentToDB } from "./user.service";

// Create a new student
const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);
    // console.log(zodParsedData);
    const result = await createStudentToDB(studentData);

    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err:any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};