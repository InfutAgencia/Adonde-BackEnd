import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tripSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originInformation: {
      type: Object,
      required: true,
    },
    destinationInformation: {
      type: String,
      required: true,
    },
    geoPoint: {
      type: [Number],
      index: "2dsphere",
    },
    travelValue: {
      type: String,
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

const tripModel = mongoose.model("trips", tripSchema);

export default tripModel;
