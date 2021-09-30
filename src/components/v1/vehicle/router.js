import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import fileManager from "../../../utils/middlewares/fileManager";
import vehicleController from "./controllers";

import vehicleSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  fileManager.receiveMultipleFiles,
  requestSchemaHandler(vehicleSchemas.createVehicleSchema),
  asyncHandler(vehicleController.createVehicle)
);

export default router;
