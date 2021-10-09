import mongoose from "mongoose";
const Schema = mongoose.Schema;

const driverLocationSchema = mongoose.Schema(
  {
    driver: {
      type: Schema.ObjectId,
      ref: "drivers",
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      lowercase: true,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    geoPoint: {
      type: [Number],
      index: "2dsphere",
    },
  },
  {
    timestamps: true,
  }
);

const driverLocationModel = mongoose.model(
  "driversLocations",
  driverLocationSchema
);
export default driverLocationModel;
