const express = require("express");
const app = express();
const mongoose = require("mongoose");
const note = require("./routes/note");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// Cors
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware
app.use(bodyParser.json());

// PORT
app.listen(PORT, () => {
  console.log("Backend Run on the PORT: ", PORT);
});

// Mounting
app.use("/api/v1", note);

// Default Route
app.get("/", (req, res) => {
  res.send("Connection Established!");
});

// Connect DB
mongoose
  .connect(DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error Ocur"));
