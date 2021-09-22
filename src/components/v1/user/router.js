import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import userController from "./controllers";

import userSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  loggedIn,
  requestSchemaHandler(userSchemas.createUserSchema),
  asyncHandler(userController.createUser)
);

export default router;
