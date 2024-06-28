import connectDB from "./DB";
import app from "./app";
import { config } from "./config";

const port = config.port || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  })
  .catch((err) => console.log("Failed to connect to database.", err));
