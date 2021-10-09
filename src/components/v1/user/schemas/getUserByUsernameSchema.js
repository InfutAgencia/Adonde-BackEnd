import joi from "joi";

const getUserByUsernameSchema = joi.object({
  username: joi.string().trim().lowercase().required().messages({
    "any.required": "username is required (Lower case)",
  }),
});

export default getUserByUsernameSchema;
