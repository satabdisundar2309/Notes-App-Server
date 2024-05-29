const noteModel = require("../models/noteModel");
require("dotenv").config();

// create a note
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title || !content) {
      return res.status(401).json({
        error: true,
        message: "Fill title and content properley",
      });
    }

    const note = await noteModel.create({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    res.status(200).json({
      error: false,
      message: "Note added successfully...",
      note,
    });
  } catch (error) {
    console.log("Error in createNote controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// edit note
const editNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;

    if (!title || !content || !tags) {
      return res.status(400).json({
        error: true,
        message: "No changes provided",
      });
    }
    const note = await noteModel.findById({ _id: noteId });
    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note does not exist",
      });
    }
    const updatedNote = await noteModel.findByIdAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: title,
          content: content,
          tags: tags,
          isPinned: isPinned,
        },
      },
      { new: true }
    );
    res.status(201).json({
      error: false,
      message: "Note updated successfully",
      updatedNote: updatedNote,
    });
  } catch (error) {
    console.log("Error in editNote controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// get all notes
const getAllNotes = async (req, res) => {
  try {
    const { user } = req.user;
    const notes = await noteModel
      .find({ userId: user._id })
      .sort({ isPinned: -1 });
    if (!notes) {
      return res.status(400).json({
        error: true,
        message: "You have not created any note",
      });
    }
    res.status(200).json({
      error: false,
      message: "Notes fetched successfully",
      notes: notes,
    });
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// delete note
const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const note = await noteModel.findById({ _id: noteId });
    if (!note) {
      return res.status(500).json({
        error: true,
        message: "Note does nbot exist",
      });
    }

    const deletedNote = await noteModel.findByIdAndDelete({ _id: noteId });
    res.status(200).json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// update isPinned value
const upadteIsPinnedValue = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { isPinned } = req.body;

    const note = await noteModel.findById({ _id: noteId });
    if (!note) {
      return res.status(400).json({
        error: true,
        message: "Note does not exist",
      });
    }
    const updatedNote = await noteModel.findByIdAndUpdate(
      { _id: noteId },
      {
        $set: {
          isPinned: isPinned || false,
        },
      },
      { new: true }
    );
    res.status(201).json({
      error: false,
      message: "Note updated successfully",
      updatedNote: updatedNote,
    });
  } catch (error) {
    console.log("Error in updateIsPinnedValue controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

// search notes
const searchNotes = async (req, res) => {
  try {
    const { user } = req.user;
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        error: true,
        message: "Enter something to search",
      });
    }

    const matchingNotes = await noteModel.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      error: false,
      message: "Search results",
      searchNotes: matchingNotes
    });

  } catch (error) {
    console.log("Error in updateIsPinnedValue controller", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createNote,
  editNote,
  getAllNotes,
  deleteNote,
  upadteIsPinnedValue,
  searchNotes
};
