import joi from "joi";
import joiObjectid from "joi-objectid";

const objectId = joiObjectid(joi);

const getVehicleByDriverIdSchema = joi.object({
  driver: objectId().required().messages({
    "any.required": "driver is required",
  }),
});

export default getVehicleByDriverIdSchema;
