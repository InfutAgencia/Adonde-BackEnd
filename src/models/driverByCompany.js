import mongoose from "mongoose";
const Schema = mongoose.Schema;

const driverByCompanySchema = mongoose.Schema({
  driver: {
    type: Schema.ObjectId,
    required: true,
  },
  company: {
    type: Schema.ObjectId,
    required: true,
  },
  isActive: {
    type: String,
    required: true,
  },
});

const driverByCompanyModel = mongoose.model(
  "driversByCompanies",
  driverByCompanySchema
);

export default driverByCompanyModel;
