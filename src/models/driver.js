import mongoose from "mongoose";
const Schema = mongoose.Schema;

const driverSchema = mongoose.Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "users",
    },
    identification: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      lowercase: true,
      required: true,
    },
    driverLicenseFront: {
      type: String,
      required: true,
    },
    driverLicenseBack: {
      type: String,
      required: true,
    },
    criminalRecordCertificate: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    connectStatus: {
      type: Boolean,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const driverModel = mongoose.model("drivers", driverSchema);

export default driverModel;
