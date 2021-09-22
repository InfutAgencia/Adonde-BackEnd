import userServices from "../services";

const createUser = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await userServices.createUser({ ...req.body }),
  });
};

export default {
  createUser,
};
