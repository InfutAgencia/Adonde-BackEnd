import boom from "@hapi/boom";
import getDriverById from "../../user/services/getDriverById";
import getTripById from "./getTripById";
import tripDao from "../dao";

const acceptTrip = async (id, { status, driver }) => {
  await getTripById(id);
  await getDriverById(driver);
  let result = "";

  if (status === "ACCEPTED") {
    let updatedTrip = await tripDao.updateTrip(id, status);

    let query = {
      $and: [{ driver: driver }, { trip: id }],
    };

    let updatedTripByDriver = await tripDao.updateTripByDriver(query, status);

    if (!updatedTrip || !updatedTripByDriver)
      throw boom.badRequest(`Error at moment to update the trip`);

    result = await getTripById(id);
  }

  if (status === "PENDING") {
  }

  if (status === "COMPLETED") {
  }

  if (!result || result === "")
    throw boom.badRequest(`Error at moment to update the trip`);
  return result;
};

export default acceptTrip;
