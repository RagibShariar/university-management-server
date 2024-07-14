/* eslint-disable no-console */
import { Server } from "http";
import connectDB from "./DB";
import app from "./app";
import { config } from "./config";

const port = config.port || 5000;

let server: Server;

connectDB()
  .then(() => {
    server = app.listen(port, () => {
      console.log(`server listening on ${port}`);
    });
  })
  .catch((err) => console.log("Failed to connect to database.", err));

// handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.log(`😈 unhandledRejection is detected at ${promise}, ${reason}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
