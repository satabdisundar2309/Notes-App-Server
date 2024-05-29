const express = require("express");
const noteRouter = express.Router();

const authenticateToken = require("../utilities");
const {
  createNote,
  editNote,
  getAllNotes,
  deleteNote,
  upadteIsPinnedValue,
  searchNotes,
} = require("../controllers/noteController");

noteRouter.post("/create-note", authenticateToken, createNote);
noteRouter.put("/edit-note/:noteId", authenticateToken, editNote);
noteRouter.get("/my-notes", authenticateToken, getAllNotes);
noteRouter.delete("/delete-note/:noteId", authenticateToken, deleteNote);
noteRouter.put("/update-isPinned-value/:noteId", authenticateToken, upadteIsPinnedValue);
noteRouter.get("/search-notes", authenticateToken, searchNotes);

module.exports = noteRouter;
