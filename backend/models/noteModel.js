// Import mongoose
const mongoose = require("mongoose");

// Create Schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  content: { type: String, required: true },
});

// export Schema
module.exports = mongoose.model("Note", noteSchema);
