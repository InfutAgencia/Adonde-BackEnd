import userDao from "../dao";
import boom from "@hapi/boom";
import userServices from "../../user/services";

const updateDriverLocationByDriverId = async (driver, driverLocation) => {
  await userServices.getDriverById(driver);

  const updatedLocation = await userDao.updateDriverLocationByDriverId(
    driver,
    driverLocation
  );

  if (!updatedLocation)
    throw boom.badRequest(`Error at moment to updated the driver location`);

  return updatedLocation;
};

export default updateDriverLocationByDriverId;
