import boom from "@hapi/boom";
import createUser from "../../user/services/createUser";

import driverDao from "../dao";

const createDriver = async ({ ...newDriver }) => {
  const newUser = await createUser(newDriver.username, newDriver.password);
  newDriver.user = newUser._id;
  const createdDriver = await driverDao.createDriver(newDriver);

  if (!createdDriver) throw boom.internal("Error trying to create new driver");
  return createDriver;
};

export default createDriver;
