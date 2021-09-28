import driverServices from "../services";

const createDriver = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await driverServices.createDriver({ ...req.body }),
  });
};

export default {
  createDriver,
};
