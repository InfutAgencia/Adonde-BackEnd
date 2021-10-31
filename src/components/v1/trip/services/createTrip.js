import boom from "@hapi/boom";
import getAvailableDrivers from "../../user/services/getAvailableDrivers";
import getVehicleByDriverId from "../../vehicle/services/getVehicleByDriverId";
import getCompanyByDriverId from "../../company/services/getCompanyByDriverId";
import tripDao from "../dao";

const createTrip = async (newTrip) => {
  let selectedDriver = null;

  //Get connect and available drivers
  let availableDrivers = await getAvailableDrivers(newTrip.company);

  if (!availableDrivers || !availableDrivers.length)
    throw boom.badRequest(`There isn't available drivers`);

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

  //Create trip
  const createdTrip = await tripDao.createTrip(newTrip);
  if (!createdTrip) throw boom.badRequest(`Error at moment to create trip`);

  const companyDriver = await getCompanyByDriverId(selectedDriver._id);

  const tripByDriver = {
    driver: selectedDriver._id,
    trip: createdTrip._id,
    vehicle: selectedDriver.vehicle._id,
    company: companyDriver._id || "",
    status: newTrip.status,
  };
  //Craete tripByDriver
  const createdTripByDriver = await tripDao.createTripByDriver(tripByDriver);
  if (!createdTripByDriver)
    throw boom.badRequest(`Error at moment to create a trip by driver`);

  //return trip, driver and vehicle information
  createdTrip._doc.driver = selectedDriver;
  return createdTrip;
};

export default createTrip;
