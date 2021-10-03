import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const getCompanyByIdSchema = joi.object({
  id: objectId().required().messages({
    "any.required": "id is required",
  }),
});

export default getCompanyByIdSchema;
