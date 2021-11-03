import userServices from "../services";

const createUser = async (req, res) => {
  const { files, ...newUser } = req.body;
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await userServices.createUser({ newUser, files }),
  });
};

const getUserById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Succcess",
    data: await userServices.getUserById(req.params.id),
  });
};

const getDriverById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Succcess",
    data: await userServices.getDriverById(req.params.id),
  });
};

const getDrivers = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await userServices.getDrivers(req.query),
  });
};

const resetPassword = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await userServices.resetPassword(req.body.username),
  });
};

const updateUser = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await userServices.updateUser(req.params.username, { ...req.body }),
  });
};

const updateDriver = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await userServices.updateDriver(req.params.id, { ...req.body }),
  });
};

const createDriverLocation = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await userServices.createDriverLocation(req.body),
  });
};

export default {
  createUser,
  getUserById,
  getDriverById,
  getDrivers,
  resetPassword,
  updateUser,
  updateDriver,
  createDriverLocation,
};
