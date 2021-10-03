import companyModel from "../../../../models/company";
import driverByCompanyModel from "../../../../models/driverByCompany";

const findCompanyByName = (name) =>
  companyModel.findOne({ name }).lean().exec();

const createCompany = (company) => companyModel.create({ ...company });

const getCompanyById = (id) => companyModel.findOne({ _id: id });

const getCompanies = ({ page, limit, query }) =>
  companyModel
    .find(query.filters)
    .skip(Number(page))
    .limit(Number(limit))
    .sort({ ...query.order })
    .lean()
    .exec();

const getCompaniesCount = ({ query }) =>
  companyModel.find(query.filters).countDocuments().lean().exec();

const createDriverByCompany = (driverByCompany) =>
  driverByCompanyModel.create({ ...driverByCompany });

export default {
  findCompanyByName,
  createCompany,
  getCompanyById,
  getCompanies,
  getCompaniesCount,
  createDriverByCompany,
};
