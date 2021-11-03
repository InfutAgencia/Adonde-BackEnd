import joi from "joi";

const loginSchema = joi.object({
  username: joi.string().trim().lowercase().required().messages({
    "any.required": "username is required (Lower case)",
  }),
  password: joi.string().trim().required().messages({
    "any.required":
      "password does not fullfill the requirements. At least one letter lowercase, one uppercase, one digit and one special character ",
  }),
});

export default loginSchema;
