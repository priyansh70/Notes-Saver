const express = require("express");
const router = express.Router();

// Import Routes
const { login, signup } = require("../controllers/userController");

// Mapping
router.post("/signup", signup);
router.post("/login", login);

// Export
module.exports = router;
