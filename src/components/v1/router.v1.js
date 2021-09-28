import authenticationRouter from "./authentication/router";
import userRouter from "./user/router";

const routerV1 = (expressApplication) => {
  expressApplication.use("/api/v1/user", userRouter);
  expressApplication.use("/api/v1/authentication", authenticationRouter);
};

export default routerV1;
