const express = require("express");
const router = express.Router();

// Import Routes
const { login, signup, authStatus } = require("../controllers/userController");

// Mapping
router.post("/signup", signup);
router.post("/login", login);
router.get("/auth-status", authStatus);

// Export
module.exports = router;
