import boom from "@hapi/boom";
import companyDao from "../dao";

const createDriverByCompany = async (driverByCompany) => {
  const newDriverByCompany = await companyDao.createDriverByCompany(
    driverByCompany
  );

  if (!newDriverByCompany)
    throw boom.badRequest(`Error at moment to create a new driver by company`);

  return driverByCompany;
};

export default createDriverByCompany;
