import joi from "joi";

const contactInformationSchema = joi.object().keys({
  name: joi.string().trim().uppercase().required().messages({
    "any.required": "name is required (Upper case)",
  }),
  phone: joi
    .string()
    .trim()
    .regex(new RegExp("^[0-9]{10}$"))
    .allow("")
    .required()
    .messages({
      "any required": "phone is required",
    }),
  email: joi.string().trim().required().messages({
    "any required": "email is required",
  }),
});

const createCompanySchema = joi.object({
  name: joi.string().trim().required().messages({
    "any.required": "name is required",
  }),
  address: joi.string().trim().required().messages({
    "any required": "address is required",
  }),
  phone: joi
    .string()
    .trim()
    .regex(new RegExp("^[0-9]{10}$"))
    .allow("")
    .required()
    .messages({
      "any required": "phone is required",
    }),
  city: joi.string().trim().required().messages({
    "any required": "city is required",
  }),
  email: joi.string().trim().required().messages({
    "any required": "email is required",
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
  contactInformation: contactInformationSchema.required(),
  isActive: joi.boolean().required(),
});

export default createCompanySchema;
