import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const updateTripSchema = joi.object({
  driver: objectId().required().messages({
    "any.required": "driver is required",
  }),
  status: joi
    .string()
    .trim()
    .valid("ACCEPTED", "COMPLETED", "PENDING")
    .required()
    .messages({
      "any.required": "status is required",
    }),
});

export default updateTripSchema;
