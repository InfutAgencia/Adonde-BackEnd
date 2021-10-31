import boom from "@hapi/boom";

import vehicleDao from "../dao";

const getVehicleByDriverId = async (driver) => {
  const vehicleDetail = await vehicleDao.getVehicleByDriverId(driver);

  if (!vehicleDetail)
    throw boom.badRequest(`There isn't vehicle to Driver ID: ${driver}`);

  return vehicleDetail[0];
};

export default getVehicleByDriverId;
