const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const userSchema = require('../validations/userSchema')
const authUser = require('../middlewares/authUserMiddleware')

const notesController = require("../controllers/notesController");
const {idValidation, textValidation} = require("../middlewares/notesValidationMiddleware")
const notesSchema = require("../validations/notesValidation")

router.post("/signup", authUser.userNameExistValidation(), authUser.userValidation(userSchema.userNameSchema), authUser.emailExistValidation(), authUser.userValidation(userSchema.emailSchema), authUser.userValidation(userSchema.passwordSchema) , authUser.passwordCriteria(), userController.signup );
router.post("/signin", authUser.userValidation(userSchema.emailSchema), userController.signin);
router.get("/signout",userController.signout)

router.get("/notes", authUser.requireAuth, notesController.getAllNotes);
router.get("/notes/:id", authUser.requireAuth, idValidation(notesSchema.noteIdSchema), notesController.getNoteById);
router.delete("/notes/:id", authUser.requireAuth, idValidation(notesSchema.noteIdSchema), notesController.deleteNote);
router.post("/notes/", authUser.requireAuth, textValidation(notesSchema.addNotesSchema), notesController.addNote);
router.patch("/notes/:id", authUser.requireAuth, idValidation(notesSchema.noteIdSchema), textValidation(notesSchema.addNotesSchema), notesController.updateNote);

module.exports = router