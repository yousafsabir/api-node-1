const express = require("express");
require("dotenv").config();
const port = 5000;
const hello = process.env.PORT;

const app = express();

const goalRoutes = require("./goals/goalRoutes");

app.use("/api/goals/", goalRoutes);

app.listen(port, () => console.log(`app started on port ${hello}`));
