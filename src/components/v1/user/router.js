import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import fileManager from "../../../utils/middlewares/fileManager";
import userController from "./controllers";

import userSchemas from "./schemas";

const router = Router();

router.post(
  "/",
  fileManager.receiveMultipleFiles,
  requestSchemaHandler(userSchemas.createUserSchema),
  asyncHandler(userController.createUser)
);

export default router;
