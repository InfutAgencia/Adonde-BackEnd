import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import vehicleController from "./controllers";
import loggedIn from "../../../utils/middlewares/autheticationHandler";

import vehicleSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  requestSchemaHandler(vehicleSchemas.createVehicleSchema),
  asyncHandler(vehicleController.createVehicle)
);

router.get(
  "/:driver",
  loggedIn,
  requestSchemaHandler(vehicleSchemas.getVehicleByDriverIdSchema, "params"),
  asyncHandler(vehicleController.getVehicleByDriverId)
);

export default router;
