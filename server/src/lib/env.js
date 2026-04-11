import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDIANRY_CLOUD_NAME: process.env.CLOUDIANRY_CLOUD_NAME,
  CLOUDIANRY_API_KEY: process.env.CLOUDIANRY_API_KEY,
  CLOUDIANRY_API_SECRET: process.env.CLOUDIANRY_API_SECRET,
};
