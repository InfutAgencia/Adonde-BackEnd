import boom from "@hapi/boom";
import tripDao from "../dao";

const getTripById = async (id) => {
  const tripDetails = await tripDao.getTripById(id);

  if (!tripDetails) throw boom.badRequest(`Trip with ID: ${id} not found`);

  return tripDetails;
};

export default getTripById;
