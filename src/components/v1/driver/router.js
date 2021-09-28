import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import driverController from "./controllers";

import driverSchemas from "./schemas";
import userSchemas from "../user/schemas";

const router = Router();

router.post(
  "/",
  requestSchemaHandler(driverSchemas.createDriverSchema),
  asyncHandler(driverController.createDriver)
);

export default router;
