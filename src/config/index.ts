import dotenv from "dotenv";
dotenv.config();

const _config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};

export const config = Object.freeze(_config);
