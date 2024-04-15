import databaseRouter from "./database/index.js";
import userRouter from "./User/index.js";

// Why do we need routes folder?
// Routes define the endpoints of our APIs and specify which controller function should be executed when a client hits an endpoint.

export default (app) => {
  // For all API calls to /healthz, databaseRouter will be used to handle the request
  app.use("/healthz", databaseRouter);

  // For all API calls to /v1/user, userRouter will be handling the request
  app.use("/v2/user", userRouter);

  // If someone hits a path that doesn't exist then we are sending 404 status
  app.use((req, res) => {
    res.status(404).send();
  });
};
