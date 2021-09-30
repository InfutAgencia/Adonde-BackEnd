import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleSchema = mongoose.Schema(
  {
    driver: {
      type: Schema.ObjectId,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    identificacion: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const vehicleModel = mongoose.model("vehicles", vehicleSchema);

export default vehicleModel;
