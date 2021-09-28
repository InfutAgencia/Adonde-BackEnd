import driverModel from "../../../../models/driver";

const createDriver = (driver) => driverModel.create({ ...driver });

export default {
  createDriver,
};
