import userRouter from "./user.routes";

const initRoutes = (app: any) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", userRouter);
};

module.exports = initRoutes;
