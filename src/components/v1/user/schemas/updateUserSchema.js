import joi from "joi";

const updateUserSchema = joi.object({
  password: joi
    .string()
    .trim()
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
    .required()
    .messages({
      "any.required": "password does not fullfill the requirements",
    }),
});

export default updateUserSchema;
