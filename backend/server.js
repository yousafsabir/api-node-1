const express = require("express");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

// To parse req.body
app.use(express.json());
// To parse urlencoded
app.use(express.urlencoded({ extended: false }));

const goalRoutes = require("./goals/goalRoutes");

app.use("/api/goals/", goalRoutes);

app.listen(port, () => console.log(`app started on port ${port}`));
