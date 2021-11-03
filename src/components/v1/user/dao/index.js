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

const getUserById = (id) => userModel.findOne({ _id: id });

const updateUser = (userId, user) =>
  userModel.findOneAndUpdate({ _id: userId }, { $set: user }).lean().exec();

const deleteUser = (userId) => userModel.findOneAndDelete({ _id: userId });

const createDriver = (driver) => driverModel.create({ ...driver });

const getDriverByUserId = (user) => driverModel.findOne({ user });

const getDriverById = (id) => driverModel.findOne({ _id: id });

const getDrivers = ({ page, limit, query }) =>
  driverModel
    .find(query.filters)
    .skip(Number(page))
    .limit(Number(limit))
    .sort({ ...query.order })
    .lean()
    .exec();

const getDriversCount = ({ query }) =>
  driverModel.find(query.filters).countDocuments().lean().exec();

const getAvailableDrivers = ({ query }) => {
  const drivers = driverModel
    .aggregate([
      {
        $match: query.filters,
      },
      {
        $lookup: {
          from: "driverslocations",
          localField: "_id",
          foreignField: "driver",
          as: "location",
        },
      },
      {
        $unwind: {
          path: "$location",
        },
      },
      {
        $project: {
          isActive: 1,
          identification: 1,
          name: 1,
          lastname: 1,
          phone: 1,
          city: 1,
          email: 1,
          driverLicenseFront: 1,
          driverLicenseBack: 1,
          criminalRecordCertificate: 1,
          connectStatus: 1,
          user: 1,
          points: 1,
          location: {
            country: "$$ROOT.location.country",
            state: "$$ROOT.location.state",
            city: "$$ROOT.location.city",
            geoPoint: "$$ROOT.location.geoPoint",
          },
        },
      },
      {
        $sort: { ...query.order },
      },
    ])
    .exec();

  return drivers;
};

const getAvailableDriversByCompany = ({ query }) => {
  const drivers = driverModel
    .aggregate([
      {
        $match: query.filters,
      },
      {
        $lookup: {
          from: "driverslocations",
          localField: "_id",
          foreignField: "driver",
          as: "location",
        },
      },
      {
        $unwind: {
          path: "$location",
        },
      },
      {
        $lookup: {
          from: "driversbycompanies",
          localField: "_id",
          foreignField: "driver",
          as: "company",
        },
      },
      {
        $unwind: {
          path: "$company",
        },
      },
      {
        $match: {
          "company._id": query.company,
          "company.isActive": true,
        },
      },
      {
        $project: {
          isActive: 1,
          identification: 1,
          name: 1,
          lastname: 1,
          phone: 1,
          city: 1,
          email: 1,
          driverLicenseFront: 1,
          driverLicenseBack: 1,
          criminalRecordCertificate: 1,
          connectStatus: 1,
          user: 1,
          points: 1,
          location: {
            country: "$$ROOT.location.country",
            state: "$$ROOT.location.state",
            city: "$$ROOT.location.city",
            geoPoint: "$$ROOT.location.geoPoint",
          },
          company: {
            driver: "$$ROOT.company.driver",
            company: "$$ROOT.company.company",
            isActive: "$$ROOT.company.isActive",
          },
        },
      },
      {
        $sort: { ...query.order },
      },
    ])
    .exec();

  return drivers;
};

const createDriverLocation = (driverLocation) =>
  driverLocationModel.create({ ...driverLocation });

const getDriverLocationByDriverId = (driver) =>
  driverLocationModel.findOne({ driver: driver }).lean();

const updateDriverLocationByDriverId = (driver, driverLocation) =>
  driverLocationModel
    .findOneAndUpdate({ driver: driver }, { $set: driverLocation })
    .lean()
    .exec();

const updateDriver = (id, updatedDriverInformation) =>
  driverModel
    .findByIdAndUpdate({ _id: id }, { $set: updatedDriverInformation })
    .lean()
    .exec();

export default {
  findUserByUsername,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createDriver,
  getDriverByUserId,
  getDriverById,
  getDrivers,
  getDriversCount,
  getAvailableDrivers,
  getAvailableDriversByCompany,
  createDriverLocation,
  getDriverLocationByDriverId,
  updateDriverLocationByDriverId,
  updateDriver,
};
