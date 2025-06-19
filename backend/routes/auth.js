const express = require("express");
const router = express.Router();

// Import Routes
const { login, signup, logout } = require("../controllers/userController");

// Mapping
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Export
module.exports = router;
