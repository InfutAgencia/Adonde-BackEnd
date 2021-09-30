import mongoose, { Schema } from "mongoose";

const vehicleByDriverSchema = mongoose.Schema(
  {
    driver: {
      type: Schema.ObjectId,
    },
    vehicle: {
      type: Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const vehicleByDriverModel = mongoose.model(
  "vehiclesByDrivers",
  vehicleByDriverSchema
);
