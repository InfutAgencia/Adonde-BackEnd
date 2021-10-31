import joi from "joi";

const getTripsSchema = joi.object({
  page: joi.number().positive().integer().optional(),
  limit: joi.number().positive().integer().min(1).optional(),
  search: joi.string().trim().optional(),
  order: joi.string().optional(),
});

export default getTripsSchema;
