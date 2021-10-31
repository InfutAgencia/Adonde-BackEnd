import { Router } from "express";
import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import tripController from "./controllers";
import tripSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  loggedIn,
  requestSchemaHandler(tripSchemas.createTripSchema),
  asyncHandler(tripController.createTrip)
);

router.get(
  "/list",
  requestSchemaHandler(tripSchemas.getTripsSchema, "query"),
  asyncHandler(tripController.getTrips)
);

router.get(
  "/:id",
  loggedIn,
  requestSchemaHandler(tripSchemas.getTripByIdSchema, "params"),
  asyncHandler(tripController.getTripById)
);

export default router;
