import companyDao from "../dao";

const getCompanies = async ({ page, limit, search, order = "createAt" }) => {
  const skip = Number(page) * Number(limit) - limit;

  const query = { filters: { $and: [] } };

  if (search && search.trim() !== "") {
    const regex = new RegExp(search, "i");
    query.filters.$and.push({
      name: regex,
    });
  }

  if (order) query.order = { [order]: -1 };

  const [result, count] = await Promise.all([
    companyDao.getCompanies({
      page: skip || null,
      limit: limit || null,
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),

    companyDao.getCompaniesCount({
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),
  ]);

  return { companies: result, records: count };
};

export default getCompanies;
