import joi from "joi";

import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const createUserSchema = joi.object({
  username: joi
    .string()
    .trim()
    .lowercase()
    .required()
    .valid(joi.ref("email"))
    .messages({
      "any.required": "username is required (Lower case)",
    }),
  password: joi
    .string()
    .trim()
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
    .required()
    .messages({
      "any.required":
        "password does not fullfill the requirements. At least one letter lowercase, one uppercase, one digit and one special character",
    }),
  isActive: joi.boolean().required().default(false),
  role: joi.string().trim().valid("DRIVER", "USER", "ADMIN", "SUPER ADMIN"),
  identification: joi.string().trim().required().messages({
    "any.required": "identification is required",
  }),
  name: joi.string().trim().lowercase().required().messages({
    "any.required": "name is required",
  }),
  lastname: joi.string().trim().lowercase().required().messages({
    "any.required": "lastname is required",
  }),
  email: joi.string().trim().lowercase().required().messages({
    "any.required": "email is required",
  }),
  phone: joi.string().trim().regex(new RegExp("^[0-9]{10}$")).allow(""),
  city: joi.string().trim().required().lowercase().messages({
    "any.required": "city is required",
  }),
  company: objectId().when("role", {
    is: joi.equal("DRIVER"),
    then: objectId().required(),
    otherwise: joi.valid(null),
  }),
  files: joi
    .array()
    .items({
      name: joi
        .string()
        .trim()
        .valid(
          "photo",
          "driverLicenseFront",
          "driverLicenseBack",
          "criminalRecordCertificate"
        )
        .required()
        .messages({
          "any.required": "Error, file type is not allowed",
        }),
      type: joi
        .string()
        .trim()
        .when("name", {
          is: joi.equal("criminalRecordCertificate"),
          then: joi.equal("application/pdf").required(),
          otherwise: joi.valid("image/png", "image/jpeg").required(),
        })
        .required(),
      uri: joi.string().trim().required(),
    })
    .min(3)
    .required(),
});

export default createUserSchema;
