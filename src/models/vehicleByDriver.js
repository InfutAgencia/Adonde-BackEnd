import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleByDriverSchema = mongoose.Schema(
  {
    driver: {
      type: Schema.ObjectId,
    },
    vehicle: {
      type: Schema.ObjectId,
    },
    isActive: {
      type: Boolean,
      required: true,
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

export default vehicleByDriverModel;
