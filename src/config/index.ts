import dotenv from "dotenv";
dotenv.config();

const _config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};

export const config = Object.freeze(_config);
