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

export default {
  createUser,
};
