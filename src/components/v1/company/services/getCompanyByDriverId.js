import boom from "@hapi/boom";

import companyDao from "../dao";

const getCompanyByDriverId = async (id) => {
  const companyDetail = await companyDao.getCompanyByDriverId(id);

  if (!companyDetail)
    throw boom.badRequest(
      `There is not any company associated to driver ID: ${id}`
    );
  return companyDetail;
};

export default getCompanyByDriverId;
