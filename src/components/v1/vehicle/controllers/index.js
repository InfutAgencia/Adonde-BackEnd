import mongoose from "mongoose";
import vehicleServices from "../services";

const createVehicle = async (req, res) => {
  const { files, ...newVehicle } = req.body;
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await vehicleServices.createVehicle({ newVehicle, files }),
  });
};

const getVehicleByDriverId = async (req, res) => {
  const driver = mongoose.Types.ObjectId(req.params.driver);
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await vehicleServices.getVehicleByDriverId(driver),
  });
};

export default {
  createVehicle,
  getVehicleByDriverId,
};
