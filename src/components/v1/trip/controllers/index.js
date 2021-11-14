import tripServices from "../services";
import mongoose from "mongoose";

const createTrip = async (req, res) => {
  let body = req.body;
  if (body.company) body.company = mongoose.Types.ObjectId(body.company);
  res.status(201).json({
    status: 201,
    message: "Success",
    data: await tripServices.createTrip(body),
  });
};

const getTripById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await tripServices.getTripById(req.params.id),
  });
};

const getTrips = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await tripServices.getTrips(req.query),
  });
};

const updateTrip = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  res.status(200).json({
    status: 200,
    message: "Success",
    data: await tripServices.updateTrip(id, body),
  });
};

export default {
  createTrip,
  getTripById,
  getTrips,
  updateTrip,
};
