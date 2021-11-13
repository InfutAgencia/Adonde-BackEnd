import userDao from "../dao";
import boom from "@hapi/boom";

const getAvailableDrivers = async (company) => {
  let result = [];
  const query = {
    filters: { connectStatus: true, isActive: true },
    order: { ["createAt"]: -1 },
  };

  if (company) {
    query.company = company;
    result = await userDao.getAvailableDriversByCompany({
      query,
    });

    if(!result || !result.length) throw boom.notFound(`There aren't available drivers to company selected`)
  }

  if (!company) {
    result = await userDao.getAvailableDrivers({
      query,
    });
    if(!result || !result.length) throw boom.notFound(`There aren't available drivers`)
  }

  return result;
};

export default getAvailableDrivers;
