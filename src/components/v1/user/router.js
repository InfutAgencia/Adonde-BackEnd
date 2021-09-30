import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import fileManager from "../../../utils/middlewares/fileManager";
import userController from "./controllers";
import loggedIn from "../../../utils/middlewares/autheticationHandler";

import userSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  fileManager.receiveMultipleFiles,
  requestSchemaHandler(userSchemas.createUserSchema),
  asyncHandler(userController.createUser)
);

router.get(
  "/:id",
  loggedIn,
  requestSchemaHandler(userSchemas.getUserByIdSchema, "params"),
  asyncHandler(userController.getUserById)
);

router.get(
  "/driver/:id",
  loggedIn,
  requestSchemaHandler(userSchemas.getDriverByIdSchema, "params"),
  asyncHandler(userController.getDriverById)
);

export default router;
