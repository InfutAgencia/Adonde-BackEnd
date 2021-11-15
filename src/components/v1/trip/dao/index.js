import tripModel from "../../../../models/trip";
import tripByDriverModel from "../../../../models/tripByDriver";

const createTrip = (trip) => tripModel.create({ ...trip });

const createTripByDriver = (tripByDriver) =>
  tripByDriverModel.create({ ...tripByDriver });

const getTripById = (id) => tripModel.findOne({ _id: id });

const updateTrip = (id, status) =>
  tripModel.findOneAndUpdate({ _id: id }, { $set: { status } }).lean().exec();

const updateTripByDriver = (query, status) =>
  tripByDriverModel.findOneAndUpdate(query, { $set: { status } }).lean().exec();

const getTripsByDriver = (query) =>
  tripByDriverModel.find(query.filters).lean().exec();

export default {
  createTrip,
  createTripByDriver,
  getTripById,
  updateTrip,
  updateTripByDriver,
  getTripsByDriver,
};
