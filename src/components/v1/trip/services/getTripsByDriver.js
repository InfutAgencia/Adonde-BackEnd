import boom from "@hapi/boom";
import tripDao from "../dao";

const getTripsByDriver = async ({ status, trip }) => {
  const query = { filters: { $and: [] } };
  if (status) {
    query.filters.$and.push({
      status,
    });
  }

  if (trip) {
    query.filters.$and.push({
      trip,
    });
  }

  const result = await tripDao.getTripsByDriver(query);
  return result;
};

export default getTripsByDriver;
