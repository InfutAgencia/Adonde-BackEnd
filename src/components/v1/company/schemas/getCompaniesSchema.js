import joi from "joi";
import joiObjectid from "joi-objectid";

const getCompaniesSchema = joi.object({
  page: joi.number().positive().integer().optional(),
  limit: joi.number().positive().integer().min(1).optional(),
  search: joi.string().trim().optional(),
  order: joi.string().optional(),
});

export default getCompaniesSchema;
