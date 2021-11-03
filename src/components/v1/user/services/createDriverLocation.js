import boom from "@hapi/boom";
import userDao from "../dao";
import userServices from "../../user/services";

const createDriverLocation = async (driverLocation) => {
  const driver = await userServices.getDriverById(driverLocation.driver);
  let newDriverLocation = {};

  const currentLocation = await userServices.getDriverLocationByDriverId(
    driver._id
  );

  if (!currentLocation) {
    newDriverLocation = await userDao.createDriverLocation(driverLocation);
  } else {
    newDriverLocation = await userServices.updateDriverLocationByDriverId(
      driver._id,
      driverLocation
    );
  }

  newDriverLocation = await userServices.getDriverLocationByDriverId(driver);

  return newDriverLocation;
};

export default createDriverLocation;
