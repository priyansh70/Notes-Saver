const Note = require("../models/noteModel");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Title Validation
    if (!title || title.length < 4 || title.length > 41) {
      return res.status(400).json({
        error: "Title Length Must between 4 to 40",
      });
    }

    // Content Validation
    if (!content) {
      return res.status(422).json({
        error: "Content is Empty",
      });
    }

    // Create Note
    const note = new Note({ title, content });
    const savedNote = await note.save();
    return res.status(201).json({
      message: "Note Created Successfully!!",
      note: savedNote,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: "Error occur while creating Note",
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json({
      message: "Notes Fetched!!",
      success: true,
      data: notes,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: "Error occur while creating Note",
    });
  }
};
