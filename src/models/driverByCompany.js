import mongoose from "mongoose";
const Schema = mongoose.Schema;

const driverByCompanySchema = mongoose.Schema({
  driver: {
    type: Schema.ObjectId,
  },
  company: {
    type: Schema.ObjectId,
  },
});

const driverByCompanyModel = mongoose.model(
  "driversByCompanies",
  driverByCompanySchema
);

export default driverByCompanyModel;
