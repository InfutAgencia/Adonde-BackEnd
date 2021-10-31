import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const createDriverLocationSchema = joi.object({
  driver: objectId().required().messages({
    "any.required": "driver is required",
  }),
  country: joi.string().trim().uppercase().required().messages({
    "any.required": "country is required",
  }),
  city: joi.string().trim().required().messages({
    "any.required": "city is required",
  }),
  state: joi.string().trim().required().messages({
    "any.required": "state is required",
  }),
  geoPoint: joi.array().required().messages({
    "any.required": "geoPoint is required",
  }),
});

export default createDriverLocationSchema;
