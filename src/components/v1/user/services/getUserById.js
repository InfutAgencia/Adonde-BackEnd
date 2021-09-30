import boom from "@hapi/boom";

import userDao from "../dao";

const getUserById = async (id) => {
  const userDetail = await userDao.getUserById(id);

  if (!userDetail) throw boom.badRequest(`User with ID: ${id} not found`);
  return userDetail;
};

export default getUserById;
