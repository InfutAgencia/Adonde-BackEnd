import userDao from "../dao";
import mongoose from "mongoose";

const getAvailableDrivers = async (company) => {
  let result = [];
  const query = {
    filters: { connectStatus: true, isActive: true },
    order: { ["createAt"]: -1 },
  };

  if (company) {
    query.company = company;
    result = await userDao.getAvailableDriversByCompany({
      query,
    });
  }

  if (!company || !result.length) {
    result = await userDao.getAvailableDrivers({
      query,
    });
  }

  return result;
};

export default getAvailableDrivers;
