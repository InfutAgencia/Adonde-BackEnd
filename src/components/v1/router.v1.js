import authenticationRouter from "./authentication/router";
import userRouter from "./user/router";
import vehicleRouter from "./vehicle/router";
import companyRouter from "./company/router";
import tripRouter from "./trip/router";

const routerV1 = (expressApplication) => {
  expressApplication.use("/api/v1/user", userRouter);
  expressApplication.use("/api/v1/authentication", authenticationRouter);
  expressApplication.use("/api/v1/vehicle", vehicleRouter);
  expressApplication.use("/api/v1/company", companyRouter);
  expressApplication.use("/api/v1/trip", tripRouter);
};

export default routerV1;
