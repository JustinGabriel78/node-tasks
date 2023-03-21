const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const {idValidation, textValidation} = require("../middlewares/notesValidationMiddleware")
const notesSchema = require("../validations/notesValidation")

router.get("/notes",notesController.getAllNotes);
router.get("/notes/:id",idValidation(notesSchema.noteIdSchema),notesController.getNoteById);
router.get("/notes*", notesController.invalidUrl);
router.delete("/notes/:id",idValidation(notesSchema.noteIdSchema), notesController.deleteNote);
router.delete("/notes*",notesController.invalidUrl);
router.post("/notes/",textValidation(notesSchema.addNotesSchema), notesController.addNote);
router.post("/notes*",notesController.invalidUrl);
router.patch("/notes/:id",idValidation(notesSchema.noteIdSchema), textValidation(notesSchema.addNotesSchema), notesController.updateNote);
router.patch("/notes*", notesController.invalidUrl);

module.exports = router;


