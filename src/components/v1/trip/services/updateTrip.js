import boom from "@hapi/boom";
import getDriverById from "../../user/services/getDriverById";
import getTripById from "./getTripById";
import tripDao from "../dao";
import updateDriver from "../../user/services/updateDriver";
import getAvailableDrivers from "../../user/services/getAvailableDrivers";
import getVehicleByDriverId from "../../vehicle/services/getVehicleByDriverId";
import getCompanyByDriverId from "../../company/services/getCompanyByDriverId";
import getTripsByDriver from "./getTripsByDriver";

const updateTrip = async (id, { status, driver }) => {
  let tripDetails = await getTripById(id);
  let driverDetails = await getDriverById(driver);
  let result = "";

  // Accepted trip
  if (status === "ACCEPTED") {
    let updatedTrip = await tripDao.updateTrip(id, status);

    let query = {
      $and: [{ driver: driver }, { trip: id }],
    };

    let updatedTripByDriver = await tripDao.updateTripByDriver(query, status);

    if (!updatedTrip || !updatedTripByDriver)
      throw boom.badRequest(`Error at moment to update the trip`);

    query = {
      points: driverDetails.points - 1,
    };
    if (!(await updateDriver(driver, query)))
      throw boom.badRequest(
        `error at the moment of subtracting points from the driver`
      );

    result = await getTripById(id);
  }

  // Rejected trip
  if (status === "PENDING") {
    let selectedDriver = null;
    let availableDrivers = null;
    status = "REJECTED";
    let query = {
      $and: [{ driver: driver }, { trip: id }],
    };

    let updatedTripByDriver = await tripDao.updateTripByDriver(query, status);
    if (!updatedTripByDriver)
      throw boom.badRequest(`Error at moment to update the trip`);

    //Get connect and available drivers
    try {
      availableDrivers = await getAvailableDrivers(
        updatedTripByDriver.company || null
      );
    } catch (error) {
      if (
        error &&
        error.message === "There aren't available drivers to company selected"
      )
        availableDrivers = await getAvailableDrivers();
    }

    if (availableDrivers.length) {
      let driversWhoRefusedTrip = await getTripsByDriver({ status, id });

      driversWhoRefusedTrip.forEach((item) => {
        availableDrivers = availableDrivers.filter((value) => {
          return value._id.toString() !== item.driver.toString();
        });
      });
    }

    while (selectedDriver === null && availableDrivers.length) {
      // Get selected driver by points
      let possibleDriver = availableDrivers.reduce((prev, current) =>
        prev.points > current.points ? prev : current
      );

      // Validate available vehicle of driver
      let vehicle = await getVehicleByDriverId(possibleDriver._id);

      if (!vehicle) {
        availableDrivers = availableDrivers.filter((value) => {
          return value != possibleDriver;
        });
      } else {
        possibleDriver.vehicle = vehicle;
        selectedDriver = possibleDriver;
      }
    }

    if (!selectedDriver)
      throw boom.badRequest(`Any Driver has an available vehicle`);

    const companyDriver = await getCompanyByDriverId(selectedDriver._id);

    const tripByDriver = {
      driver: selectedDriver._id,
      trip: tripDetails._id,
      vehicle: selectedDriver.vehicle._id,
      company: companyDriver[0]._id || "",
      status: "PENDING",
    };

    //Create tripByDriver
    const createdTripByDriver = await tripDao.createTripByDriver(tripByDriver);
    if (!createdTripByDriver)
      throw boom.badRequest(`Error at moment to create a trip by driver`);

    let updatedTrip = await getTripById(id);
    updatedTrip._doc.driver = selectedDriver;
    result = updatedTrip;
  }

  // Completed trip
  if (status === "COMPLETED") {
  }

  if (!result || result === "")
    throw boom.badRequest(`Error at moment to update the trip`);
  return result;
};

export default updateTrip;
