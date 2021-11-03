import boom from "@hapi/boom";
import userDao from "../dao";
import userServices from "../../user/services";

const updateDriver = async (id, updatedDriverInformation) => {
  let driverInformation = await userServices.getDriverById(id);

  const updatedDriver = await userDao.updateDriver(id, {
    ...updatedDriverInformation,
  });

  if (!updatedDriver) throw boom.badRequest(`Error at moment to update driver`);
  driverInformation = await userServices.getDriverById(id);

  return driverInformation;
};

export default updateDriver;
