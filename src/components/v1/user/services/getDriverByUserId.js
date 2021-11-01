import boom from "@hapi/boom";

import userDao from "../dao";

const getDriverByUserId = async (user) => {
  const driverDetail = await userDao.getDriverByUserId(user);

  if (!driverDetail)
    throw boom.badRequest(`Driver with user ID: ${user} not found`);

  return driverDetail;
};

export default getDriverByUserId;
