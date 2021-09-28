import authenticationRouter from "./authentication/router";
import userRouter from "./user/router";
import driverRouter from "./driver/router";

const routerV1 = (expressApplication) => {
  expressApplication.use("/api/v1/user", userRouter);
  expressApplication.use("/api/v1/authentication", authenticationRouter);
  expressApplication.use("/api/v1/driver", driverRouter);
};

export default routerV1;
