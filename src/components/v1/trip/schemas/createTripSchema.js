import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const originInformationSchema = joi.object().keys({
  city: joi.string().trim().required().messages({
    "any required": "city is required",
  }),
  zipCode: joi
    .string()
    .trim()
    .uppercase()
    .alphanum()
    .max(6)
    .required()
    .messages({
      "any required": "zipCode is required",
    }),
  country: joi.string().trim().uppercase().required().messages({
    "any required": "country is required",
  }),
  state: joi.string().trim().required().messages({
    "any required": "state is required",
  }),
  address: joi.string().trim().required().messages({
    "any required": "address is required",
  }),
});

const createTripSchema = joi.object({
  name: joi.string().trim().required().messages({
    "any.required": "name is required",
  }),
  originInformation: originInformationSchema.required(),
  destinationInformation: joi.string().trim().required(),
  geoPoint: joi.array().required().messages({
    "any.required": "geoPoint is required",
  }),
  travelValue: joi.string().trim().required().messages({
    "any.required": "travelValue is required",
  }),
  status: joi.string().valid("PENDING").required(),
  company: objectId().optional(),
});

export default createTripSchema;
