import joi from "joi";

import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const createVehicleSchema = joi.object({
  driver: objectId().required().messages({
    "any.required": "user is required",
  }),
  brand: joi
    .string()
    .trim()
    .uppercase()
    .valid(
      "KIA",
      "MAZDA",
      "NISSAN",
      "PEUGEOT",
      "RENAULT",
      "SUZUKI",
      "TOYOTA",
      "VOLSKWAGEN",
      "CHEVROLET",
      "AUDI",
      "BMW",
      "OTHERS"
    )
    .required()
    .messages({
      "any.required": "brand is required",
    }),
  model: joi.string().trim().required().messages({
    "any.required": "model is required",
  }),
  year: joi
    .string()
    .trim()
    .regex(new RegExp("^[0-9]{4}$"))
    .required()
    .messages({
      "any.required": "year is required",
    }),
  plate: joi.string().trim().alphanum().uppercase().required().messages({
    "any.required": "plate is required",
  }),
  color: joi.string().trim().required().messages({
    "any.required": "color is required",
  }),
  isActive: joi.boolean().required().messages({
    "any.required": "isActive is required",
  }),
  files: joi
    .array()
    .items({
      name: joi
        .string()
        .trim()
        .valid("identification", "photo")
        .required()
        .messages({
          "any.required": "Error, file type is not allowed",
        }),
      type: joi.string().trim().valid("image/png", "image/jpeg").required(),
      uri: joi.string().trim().required(),
    })
    .min(2)
    .required(),
});

export default createVehicleSchema;
