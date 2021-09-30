import boom from "@hapi/boom";

import userDao from "../dao";

const getDriverById = async (id) => {
  const driverDetail = await userDao.getDriverById(id);

  if (!driverDetail) throw boom.badRequest(`Driver with ID: ${id} not found`);
  return driverDetail;
};

export default getDriverById;
