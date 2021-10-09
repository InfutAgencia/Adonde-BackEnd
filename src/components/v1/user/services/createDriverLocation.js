import boom from "@hapi/boom";
import userDao from "../dao";
import userServices from "../../user/services";

const createDriverLocation = async (driverLocation) => {
  await userServices.getDriverById(driverLocation.driver);

  const newDriverLocation = await userDao.createDriverLocation(driverLocation);
  return newDriverLocation;
};

export default createDriverLocation;
