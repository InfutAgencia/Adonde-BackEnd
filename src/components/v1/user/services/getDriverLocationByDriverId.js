import userDao from "../dao";

const getDriverLocationByDriverId = async (driver) => {
  const driverLocation = await userDao.getDriverLocationByDriverId(driver);

  return driverLocation;
};

export default getDriverLocationByDriverId;
