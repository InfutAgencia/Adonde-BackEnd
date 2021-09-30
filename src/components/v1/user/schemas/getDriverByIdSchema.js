import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const getDriverByIdSchema = joi.object({
  id: objectId().required().messages({
    "any.required": "valid id is required",
  }),
});

export default getDriverByIdSchema;
