import assert from "assert";
import request from "supertest";
import app from "../server.js";
import { EncodeUserCredentials } from "../utils/common/index.js";

let localServer;

const userPayload = {
  first_name: "Vishnu",
  last_name: "Kohli",
  username: "virat7@gmail.com",
  password: "Vk@123",
};

const updateUserPayload = {
  first_name: "Virat",
};

// this is a hook that runs before running any testcases
before((done) => {
  localServer = app.listen(() => {
    done();
  });
});

// this is a hook that runs after running all the testcases
after((done) => {
  localServer.close(() => {
    console.log("Server stopped aftet all tests run");
    done();
  });
});

// `describe` function is used to explain why we are running the test case
describe("Create a new user and call get to verify if user has been created", () => {
  it("a user has to be created and their record has to be present in the Database", async () => {
    const createdUserResponse = await request(localServer)
      .post("/v1/user")
      .send(userPayload);

    // we are checking if the request was successful by checking if the status code is 201
    assert.strictEqual(createdUserResponse.status, 201);

    const getUserDetailsRes = await request(localServer)
      .get("/v1/user/self")
      .set(
        "Authorization",
        EncodeUserCredentials(userPayload.username, userPayload.password)
      );

    // we are checking if the request was successful by checking if the status code is 200
    assert.strictEqual(getUserDetailsRes.status, 200);
    // we are now checking if the username mentiond in the payload is same as the username in the response of the GET call
    assert.strictEqual(getUserDetailsRes.body.username, userPayload.username);
  });
});

// `describe` function is used to explain why we are running the below test case
describe("Create a new user and call get to verify if user has been created", () => {
  it("a user has to be created and their record has to be present in the Database", async () => {
    // Here we are updating the first_name of the user using the PUT method
    const updatedUserResponse = await request(localServer)
      .put("/v1/user/self")
      .set(
        "Authorization",
        EncodeUserCredentials(userPayload.username, userPayload.password)
      )
      .send(updateUserPayload);

    // since we are sending 204 from our server, we will check for status code 204
    assert.strictEqual(updatedUserResponse.status, 204);

    const getUserDetailsRes = await request(localServer)
      .get("/v1/user/self")
      .set(
        "Authorization",
        EncodeUserCredentials(userPayload.username, userPayload.password)
      );

    // we are checking if the request was successful by checking if the status code is 200
    assert.strictEqual(getUserDetailsRes.status, 200);

    // here we are checking if the first_name field has been updated
    // we are checking between the payload sent to PUT call and the response from GET call
    assert.strictEqual(
      "yash",
      updateUserPayload.first_name
    );
  });
});
