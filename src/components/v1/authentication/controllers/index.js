import authenticationServices from "../services";

const getToken = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await authenticationServices.getSessionToken({ ...req.body }),
  });
};

export default {
  getToken,
};
