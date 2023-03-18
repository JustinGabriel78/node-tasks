const express = require("express");
const router = express.Router();
const notesController = require("../controller/notesController");
const textValidation = require("../middlewares/textValidationMiddlewares")
const idValidation = require("../middlewares/idValidationMiddlewares")
const notesSchema = require("../validations/notesValidation")

router.get("/",notesController.getAllNotes);
router.get("/:id",idValidation(notesSchema.noteIdSchema),notesController.getNoteById);
router.get("*", notesController.invalidUrl);
router.delete("/:id",idValidation(notesSchema.noteIdSchema), notesController.deleteNote);
router.delete("*",notesController.invalidUrl);
router.post("/",textValidation(notesSchema.addNotesSchema), notesController.addNote);
router.post("*",notesController.invalidUrl);
router.patch("/:id",idValidation(notesSchema.noteIdSchema), textValidation(notesSchema.addNotesSchema), notesController.updateNote);
router.patch("*", notesController.invalidUrl);

module.exports = router;


