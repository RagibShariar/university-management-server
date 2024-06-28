import mongoose from "mongoose";
import { config } from "../config";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${config.mongodb_uri}`);
    console.log(
      `Connected to database successfully!!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Failed to connect to database.", error);
    process.exit(1);
  }
};

export default connectDB;
