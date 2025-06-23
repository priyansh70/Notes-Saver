const Note = require("../models/noteModel");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    // Title Validation
    if (!title || title.length < 4 || title.length > 40) {
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

    // Create Note with user association
    const note = new Note({
      title,
      content,
      userId,
    });
    const savedNote = await note.save();

    return res.status(201).json({
      success: true,
      message: "Note Created Successfully!!",
      note: savedNote,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Error occur while creating Note",
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    // req.user should be set by your auth middleware after verifying JWT
    const userId = req.user.userId;
    console.log(userId);
    const notes = await Note.find({ userId: userId }); // Filter by user
    console.log(notes);
    return res.status(200).json({
      success: true,
      message: "Notes Fetched!!",
      data: notes,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Error occur while fetching Notes",
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.userId;

    // Title Validation
    if (!title || title.length < 4 || title.length > 40) {
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

    // Find and update note (only if it belongs to the user)
    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or you don't have permission to update it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note Updated Successfully!!",
      note,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Error occur while updating Note",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find and delete note (only if it belongs to the user)
    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found or you don't have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note Deleted Successfully!!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
      message: "Error occur while deleting Note",
    });
  }
};
