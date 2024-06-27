import express, { Request, Response } from "express";
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!!!");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
