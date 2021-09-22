import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import authenticationController from "./controllers";

import authenticationSchemas from "./schemas";

const router = Router();

router.post(
  "/login",
  requestSchemaHandler(authenticationSchemas.loginSchema),
  asyncHandler(authenticationController.getToken)
);

export default router;
