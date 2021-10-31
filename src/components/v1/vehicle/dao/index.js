import vehicleModel from "../../../../models/vehicle";
import vehicleByDriverModel from "../../../../models/vehicleByDriver";

const createVehicle = (vehicle) => vehicleModel.create({ ...vehicle });

const createVehicleByDriver = (vehicleByDriver) =>
  vehicleByDriverModel.create({ ...vehicleByDriver });

// const getVehicleByDriverId = (driver) =>
//   vehicleByDriverModel.findOne({ driver });

const getVehicleByDriverId = (driver) => {
  const vehicleByDriverId = vehicleByDriverModel
    .aggregate([
      {
        $match: { driver },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicle",
          foreignField: "_id",
          as: "vehicle",
        },
      },
      {
        $unwind: {
          path: "$vehicle",
        },
      },
      {
        $match: {
          "vehicle.isActive": true,
        },
      },
      {
        $project: {
          driver: "$$ROOT.driver",
          vehicle: "$$ROOT.vehicle._id",
          brand: "$$ROOT.vehicle.brand",
          model: "$$ROOT.vehicle.model",
          plate: "$$ROOT.vehicle.plate",
          color: "$$ROOT.vehicle.color",
          photo: "$$ROOT.vehicle.photo",
        },
      },
    ])
    .exec();

  return vehicleByDriverId;
};
export default {
  createVehicle,
  createVehicleByDriver,
  getVehicleByDriverId,
};
