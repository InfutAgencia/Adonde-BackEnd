import companyDao from "../dao";
import boom from "@hapi/boom";

const createCompany = async (newCompany) => {
  const validateUniqueCompany = await companyDao.findCompanyByName(
    newCompany.name
  );

  if (validateUniqueCompany)
    throw boom.badRequest(`${newCompany.name} already exists`);

  const createdCompany = await companyDao.createCompany(newCompany);

  return createdCompany;
};

export default createCompany;
