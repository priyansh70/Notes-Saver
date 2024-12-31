// Import
const express = require("express");
const router = express.Router();

// Import Controller
const { getAllNotes, createNote } = require("../controllers/noteController");

// Mapping Routes
router.get("/notes", getAllNotes);
router.post("/createNote", createNote);

// Export
module.exports = router;
