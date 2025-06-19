// Import Package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");

// Import Routes
const note = require("./routes/note");
const auth = require("./routes/auth");

const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

// Cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// PORT
app.listen(PORT, () => {
  console.log("Backend Run on the PORT: ", PORT);
});

// Mounting
app.use("/api/v1", note);
app.use("/api/v1", auth);

// Default Route
app.get("/", (req, res) => {
  res.send("Connection Established!");
});

// Connect DB
mongoose
  .connect(DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error Ocur"));
