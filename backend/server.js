const express = require("express");
require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/error");
const port = process.env.PORT;

// running database
connectDB();

const app = express();
// running cors
app.use(cors());
// To parse req.body
app.use(express.json());
// To parse urlencoded
app.use(express.urlencoded({ extended: false }));

const goalRoutes = require("./goals/goalRoutes");
const userRoutes = require("./users/userRoutes");

app.use("/api/goals/", goalRoutes);
app.use("/api/users/", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`app started on port ${port}`));
