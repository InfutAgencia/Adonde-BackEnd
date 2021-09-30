import driverModel from "../../../../models/driver";
import userModel from "../../../../models/user";

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

export default {
  createUser,
  createDriver,
  getUserById,
  getDriverById,
  deleteUser,
  findUserByUsername,
};
