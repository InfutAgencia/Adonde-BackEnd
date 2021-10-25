import vehicleServices from "../services";

const createVehicle = async (req, res) => {
  const { files, ...newVehicle } = req.body;
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await vehicleServices.createVehicle({ newVehicle, files }),
  });
};

export default {
  createVehicle,
};
