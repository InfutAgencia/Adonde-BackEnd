import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripByDriverSchema = mongoose.Schema(
  {
    driver: {
      type: Schema.ObjectId,
      required: true,
    },
    trip: {
      type: Schema.ObjectId,
      required: true,
    },
    vehicle: {
      type: Schema.ObjectId,
      required: true,
    },
    company: {
      type: Schema.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tripByDriverModel = mongoose.model("tripsByDriver", tripByDriverSchema);

export default tripByDriverModel;
