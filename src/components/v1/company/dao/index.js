import companyModel from "../../../../models/company";
import driverModel from "../../../../models/driver";
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

const getCompanyByDriverId = (id) => {
  const company = driverByCompanyModel
    .aggregate([
      {
        $match: {
          driver: id,
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: {
          path: "$company",
        },
      },
      {
        $project: {
          _id: "$$ROOT.company._id",
          isActive: "$$ROOT.company.isActive",
          name: "$$ROOT.company.name",
          address: "$$ROOT.company.address",
          phone: "$$ROOT.company.phone",
          city: "$$ROOT.company.city",
          email: "$$ROOT.company.email",
          zipCode: "$$ROOT.company.zipCode",
          country: "$$ROOT.company.country",
          state: "$$ROOT.company.state",
          contactInformation: "$$ROOT.company.contactInformation",
        },
      },
    ])
    .exec();

  return company;
};

const createDriverByCompany = (driverByCompany) =>
  driverByCompanyModel.create({ ...driverByCompany });

export default {
  findCompanyByName,
  createCompany,
  getCompanyById,
  getCompanies,
  getCompaniesCount,
  createDriverByCompany,
  getCompanyByDriverId,
};
