const notesUtils = require("../utils/notesUtils");


const getAllNotes = (req, res) => {
  const allNotes = notesUtils.loadNotes();
  res.status(200).send({ data: allNotes, message: "All notes", success: true });
};

const getNoteById = (req, res) => {
  const noteId = req.params.id;
  const error = notesUtils.idError(+noteId);
  if (error) {
    return res.status(404).send({ data: null, message: error, success: false });
  }
  const note = notesUtils.readNote(+noteId);
  res.status(200).send({
    data: note,
    message: "Note successfully fetched",
    success: true,
  });
};

const addNote = (req, res) => {
  const data = req.body.text;
  const newNote = notesUtils.addNote(data);
  res.status(201).send({
    data: newNote,
    message: "Note added Successfully",
    success: true,
  });
};

const updateNote = (req, res) => {
  const noteId = req.params.id;
  const data = req.body.text;
  const error = notesUtils.idError(+noteId);
  if (error) {
    return res.status(404).send({ data: null, message: error, success: false });
  }
  const updatedNotes = notesUtils.updateNote(+noteId, data);
  res
    .status(200)
    .send({ data: updatedNotes, message: "Note updated", success: true });
};

const deleteNote = (req, res) => {
  const noteId = req.params.id;
  const error = notesUtils.idError(+noteId);
  if (error) {
    return res.status(404).send({ data: null, message: error, success: false });
  }
  notesUtils.deleteNote(+noteId);
  res.status(200).send({ data: null, message: "Note Deleted", success: true });
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
  invalidUrl
}
