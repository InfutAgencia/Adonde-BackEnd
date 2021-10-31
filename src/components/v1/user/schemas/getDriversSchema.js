import joi from "joi";

const getDriversSchema = joi.object({
  page: joi.number().positive().integer().optional(),
  limit: joi.number().positive().integer().min(1).optional(),
  search: joi.string().trim().optional(),
  order: joi.string().optional(),
  connectStatus: joi.boolean().optional(),
  isActive: joi.boolean().optional(),
});

export default getDriversSchema;
