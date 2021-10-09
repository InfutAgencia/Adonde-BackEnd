import driverModel from "../../../../models/driver";
import userModel from "../../../../models/user";
import driverLocationModel from "../../../../models/driverLocation";

const findUserByUsername = (username) =>
  userModel
    .findOne({
      username,
    })
    .lean()
    .exec();

const createUser = (user) => userModel.create({ ...user });

const createDriver = (driver) => driverModel.create({ ...driver });

const getUserById = (id) => userModel.findOne({ _id: id });

const getDriverById = (id) => driverModel.findOne({ _id: id });

const deleteUser = (userId) => userModel.findOneAndDelete({ _id: userId });

const updateUser = (userId, user) =>
  userModel.findOneAndUpdate({ _id: userId }, { $set: user }).lean().exec();

const createDriverLocation = (driverLocation) =>
  driverLocationModel.create({ ...driverLocation });

export default {
  createUser,
  createDriver,
  getUserById,
  getDriverById,
  deleteUser,
  findUserByUsername,
  updateUser,
  createDriverLocation,
};
