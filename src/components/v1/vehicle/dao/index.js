import vehicleModel from "../../../../models/vehicle";
import vehicleByDriverModel from "../../../../models/vehicleByDriver";

const createVehicle = (vehicle) => vehicleModel.create({ ...vehicle });

const createVehicleByDriver = (vehicleByDriver) =>
  vehicleByDriverModel.create({ ...vehicleByDriver });

export default {
  createVehicle,
  createVehicleByDriver,
};
