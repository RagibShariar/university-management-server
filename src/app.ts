import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import academicDepartmentRouter from "./modules/academicDepartment/academicDepartment.route";
import academicFacultyRouter from "./modules/academicFaculty/academicFaculty.route";
import academicSemesterRouter from "./modules/academicSemester/academicSemester.route";
import authRouter from "./modules/Auth/auth.route";
import courseRouter from "./modules/course/course.route";
import facultyRouter from "./modules/faculty/faculty.route";
import studentRouter from "./modules/student/student.route";
import userRouter from "./modules/user/user.route";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("University management server is running !!!");
});

// Application Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/academic-semesters", academicSemesterRouter);
app.use("/api/v1/academic-faculty", academicFacultyRouter);
app.use("/api/v1/academic-department", academicDepartmentRouter);
app.use("/api/v1/faculties", facultyRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);

//global error handler
app.use(globalErrorHandler);
// not found route
app.use(notFound);

export default app;
