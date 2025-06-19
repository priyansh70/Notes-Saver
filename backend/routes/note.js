// Import
const express = require("express");
const router = express.Router();

// Import Controller and Middleware
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middleware/auth");

// Mapping Routes (all routes require authentication)
router.get("/notes", auth, getAllNotes);
router.post("/createNote", auth, createNote);
router.put("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

// Export
module.exports = router;
