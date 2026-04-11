import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.CLOUDIANRY_CLOUD_NAME,
  api_key: ENV.CLOUDIANRY_API_KEY,
  api_secret: ENV.CLOUDIANRY_API_SECRET,
});

export default cloudinary;
