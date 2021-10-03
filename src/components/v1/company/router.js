import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import companyController from "./controllers";

import companySchemas from "./schemas";

const router = Router();

router.post(
  "/",
  loggedIn,
  requestSchemaHandler(companySchemas.createCompanySchema),
  asyncHandler(companyController.createCompany)
);

router.get(
  "/list",
  requestSchemaHandler(companySchemas.getCompaniesSchema, "query"),
  asyncHandler(companyController.getCompanies)
);

router.get(
  "/:id",
  loggedIn,
  requestSchemaHandler(companySchemas.getCompanyByIdSchema, "params"),
  asyncHandler(companyController.getCompanyById)
);

export default router;
