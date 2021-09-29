import dotenv from "dotenv";

dotenv.config();

export default {
  ENVIRONMENT: process.env.ENVIRONMENT || "DEVELOPMENT",
  PORT: process.env.PORT || 3003,
  CORS: process.env.CORS || "*",
  MONGO_URI_PRODUCTION: process.env.MONGO_URI_PRODUCTION || "",
  MONGO_URI_DEVELOP: process.env.MONGO_URI_DEVELOP || "",
  AUTH_SECRET: process.env.AUTH_SECRET || "",
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME || "",
  CRYPTO_SECRET: process.env.CRYPTO_SECRET || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_BUCKET_USER_PHOTOS: process.env.AWS_BUCKET_USER_PHOTOS || "",
  AWS_BUCKET_DRIVER_DOCUMENTS: process.env.AWS_BUCKET_DRIVER_DOCUMENTS || "",
  AWS_BUCKET_VEHICLE_DOCUMENTS: process.env.AWS_BUCKET_VEHICLE_DOCUMENTS || "",
  AWS_BUCKET_VEHICLE_PHOTOS: process.env.AWS_BUCKET_VEHICLE_PHOTOS || "",
};
