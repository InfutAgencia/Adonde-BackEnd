import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import userController from "./controllers";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import userSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  requestSchemaHandler(userSchemas.createUserSchema),
  asyncHandler(userController.createUser)
);

router.post(
  "/reset",
  requestSchemaHandler(userSchemas.resetPasswordSchema),
  asyncHandler(userController.resetPassword)
);

router.get(
  "/:id",
  loggedIn,
  requestSchemaHandler(userSchemas.getUserByIdSchema, "params"),
  asyncHandler(userController.getUserById)
);

router.patch(
  "/:username",
  requestSchemaHandler(userSchemas.getUserByUsernameSchema, "params"),
  requestSchemaHandler(userSchemas.updateUserSchema),
  asyncHandler(userController.updateUser)
);

router.get(
  "/driver/list",
  requestSchemaHandler(userSchemas.getDriversSchema, "query"),
  asyncHandler(userController.getDrivers)
);

router.get(
  "/driver/:id",
  loggedIn,
  requestSchemaHandler(userSchemas.getDriverByIdSchema, "params"),
  asyncHandler(userController.getDriverById)
);

router.post(
  "/driver-location",
  loggedIn,
  requestSchemaHandler(userSchemas.createDriverLocationSchema),
  asyncHandler(userController.createDriverLocation)
);

router.patch(
  "/driver/:id",
  loggedIn,
  requestSchemaHandler(userSchemas.getDriverByIdSchema, "params"),
  requestSchemaHandler(userSchemas.updateDriverSchema),
  asyncHandler(userController.updateDriver)
);

export default router;
