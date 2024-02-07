import express from "express";
import initialize from "./app/index.js";
import dotenv from "dotenv";

// Get ENV Variables
dotenv.config();

// Initialise express
const app = express();
const portNumber = process.env.SERVER_PORT;
initialize(app);
app.listen(portNumber, () => console.log(`Server ready at port ${portNumber}`));
