import boom from "@hapi/boom";

import companyDao from "../dao";

const getCompanyById = async (id) => {
  const companyDetail = await companyDao.getCompanyById(id);

  if (!companyDetail) throw boom.badRequest(`Company with ID: ${id} not found`);
  return companyDetail;
};

export default getCompanyById;
