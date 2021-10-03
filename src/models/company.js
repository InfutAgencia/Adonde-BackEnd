import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
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
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    contactInformation: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const companyModel = mongoose.model("companies", companySchema);

export default companyModel;
