import joi from "joi";

const resetPasswordSchema = joi.object({
  username: joi.string().trim().lowercase().required().messages({
    "any.required": "username is required (Lower case)",
  }),
});

export default resetPasswordSchema;
