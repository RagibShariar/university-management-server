import cors from "cors";
import express, { Request, Response } from "express";
import studentRouter from "./modules/student/student.route";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req:Request, res: Response) => {
  res.send("University management server is running !!!");
});

// Application Routes
app.use("/api/v1/students", studentRouter);

export default app;
