import dotenv from 'dotenv';
dotenv.config();

const _config = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI

}

export const config = Object.freeze(_config)