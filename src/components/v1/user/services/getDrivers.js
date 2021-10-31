import userDao from "../dao";

const getDrivers = async ({
  page,
  limit,
  search,
  isActive,
  order = "createAt",
}) => {
  const skip = Number(page) * Number(limit) - limit;

  const query = { filters: { $and: [] } };

  if (isActive) {
    query.filters.$and.push({
      isActive,
    });
  }

  if (search && search.trim() !== "") {
    const regex = new RegExp(search, "i");
    query.filters.$and.push({
      name: regex,
    });
  }
  if (order) query.order = { [order]: -1 };

  const [result, count] = await Promise.all([
    userDao.getDrivers({
      page: skip || null,
      limit: limit || null,
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),

    userDao.getDriversCount({
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),
  ]);

  return { drivers: result, records: count };
};

export default getDrivers;
