import joi from "joi";

const createDriverSchema = joi.object({
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
  company: joi.string().trim().required({
    "any.required": "company is required",
  }),
  photo: joi.string().allow("", null),
  driverLicense: joi.string().trim().required({
    "any.required": "driver_license is required",
  }),
  criminalRecordCertificate: joi.string().trim().required({
    "any.required": "criminal_record_certificate is required",
  }),
});

export default createDriverSchema;
