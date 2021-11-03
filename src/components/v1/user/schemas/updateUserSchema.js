import joi from "joi";

const updateUserSchema = joi.object({
  password: joi.string().trim().optional(),
  isActive: joi.boolean().optional(),
});

export default updateUserSchema;
