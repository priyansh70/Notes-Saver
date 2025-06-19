// Import
const express = require("express");
const router = express.Router();

// Import Controller
const { getAllNotes, createNote } = require("../controllers/noteController");
const authenticate = require("../middleware/authenticate");

// Mapping Routes
router.get("/notes", authenticate, getAllNotes);
router.post("/createNote", createNote);

// Export
module.exports = router;
