import joi from "joi";

const updateDriverSchema = joi.object({
  isActive: joi.boolean().optional(),
  identification: joi.string().trim().optional(),
  name: joi.string().trim().lowercase().optional(),
  lastname: joi.string().trim().lowercase().optional(),
  phone: joi
    .string()
    .trim()
    .regex(new RegExp("^[0-9]{10}$"))
    .allow("")
    .optional(),
  city: joi.string().trim().required().lowercase().optional(),
  connectStatus: joi.boolean().optional(),
  deviceId: joi.string().trim().alphanum().optional(),
  points: joi.number().integer().allow(0).optional(),
});

export default updateDriverSchema;
