import tripModel from "../../../../models/trip";
import tripByDriverModel from "../../../../models/tripByDriver";

const createTrip = (trip) => tripModel.create({ ...trip });

const createTripByDriver = (tripByDriver) =>
  tripByDriverModel.create({ ...tripByDriver });

export default {
  createTrip,
  createTripByDriver,
};
