import companyServices from "../services";

const createCompany = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await companyServices.createCompany({ ...req.body }),
  });
};

const getCompanyById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await companyServices.getCompanyById(req.params.id),
  });
};

const getCompanies = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await companyServices.getCompanies(req.query),
  });
};

export default {
  createCompany,
  getCompanyById,
  getCompanies,
};
