import userServices from "../services";

const createUser = async (req, res) => {
  const newUser = req.body;
  const files = req.files;
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

export default {
  createUser,
  getUserById,
  getDriverById,
  resetPassword,
  updateUser,
};
