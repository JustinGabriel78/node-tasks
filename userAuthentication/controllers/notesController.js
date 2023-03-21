const notesUtils = require("../utils/notesUtils");

const Notes = require("../models/notesModels");

const getAllNotes = async (req, res) => {
  try {
    const results = await Notes.find({ userId: req.decoded.id });
    if (results.length !== 0) {
      const allNotes = results.map((result) => {
        return { id: result._id, text: result.text };
      });
      return res
        .status(200)
        .send({ data: allNotes, message: "All notes", success: true });
    } else {
      res
        .status(400)
        .send({ data: null, message: "Notes not found", success: false });
    }
  } catch (err) {
    res.status(500).send({ data: null, message: err.message, success: false });
  }
};

const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const results = await Notes.find({ userId: req.decoded.id });
    if (results.length !== 0) {
      const noteObject = results.find(
        (result) => result._id.toString() === noteId
      );
      const note = { id: noteObject._id, text: noteObject.text };
      return res
        .status(200)
        .send({
          data: note,
          message: "Note successfully fetched",
          success: true,
        });
    } else {
      res
        .status(400)
        .send({ data: null, message: "Notes not found", success: false });
    }
  } catch (err) {
    res.status(500).send({ data: null, message: err.message, success: false });
  }
};

const addNote = async (req, res) => {
  try {
    req.body.userId = req.decoded.id;
    const note = new Notes(req.body);
    const savedNote = await note.save();
    if (savedNote) {
      return res
        .status(201)
        .send({
          data: { id: savedNote._id, text: savedNote.text },
          message: "Note added Successfully",
          success: true,
        });
    }
  } catch (err) {
    res.status(500).send({ data: null, message: err.message, success: false });
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = req.body.text;
    const filter = { userId: req.decoded.id, _id: noteId };
    const update = { text: data };
    const doc = await Notes.findOneAndUpdate(filter, update, {
      new: true,
    });
    const updatedNotes = { id: doc._id, text: doc.text };
    res
      .status(200)
      .send({ data: updatedNotes, message: "Note updated", success: true });
  } catch (err) {
    res.status(500).send({ data: null, message: err.message, success: false });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const filter = { userId: req.decoded.id, _id: noteId };
    const isDeleted = await Notes.deleteOne(filter);
    if (isDeleted.deletedCount) {
      return res
        .status(200)
        .send({ data: null, message: "Note Deleted", success: true });
    }
    return res
      .status(404)
      .send({ data: null, message: "ID not found", success: false });
  } catch (err) {
    res.status(500).send({ data: null, message: err.message, success: false });
  }
};

const invalidUrl = (req, res) => {
  res.status(400).send({ data: null, message: "Invalid url", success: false });
};

module.exports = {
  getAllNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
  invalidUrl,
};
