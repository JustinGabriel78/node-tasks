const notesUtils = require("../utils/notesUtils");


/**
 * Function used to get all the notes of the user from database
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - if there is an error while loading notes from the db,
 * @returns {Object} The HTTP response object containing the result of the getAllNotes
 */
const getAllNotes = async (req,res) => {
  try {
    const { userId }= req.decoded;
    const result = await notesUtils.loadNotes(userId);

    if (result) {
      return res.status(200).json({ data: result, message: "All notes", success: true })
    } else {
      return res.status(404).json({ data: null, message: "No notes were found for this user", success: false })
    }
  } catch (error) { 
    console.error(error);
    return res.status(500).json({ data: null, message: error.message, success: false })
   }
}


/**
 * Function used to get a note corresponding to given noteId
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - if there is an error while reading the note
 * @returns {Object} The HTTP response object containing the result of the getNoteById
 */
const getNoteById = async (req, res) => {
  try {
    const { id: noteId} = req.params;
    const { userId }= req.decoded;
    console.log("noteId",typeof noteId)
    const note = await notesUtils.readNote(noteId, userId)

    if(note){
      return res.status(200).json({data: note, message: "Note successfully fetched",success: true,});
    } else {
      return res.status(404).json({ data: null, message: "No notes were found under this ID", success: false });
    }

  } catch (error) {
    console.error(error)
    res.status(500).send({ data: null, message: error.message, success: false });
  }
};


/**
 * Function used to add a note 
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - if there is an error while adding the note
 * @returns {Object} The HTTP response object containing the result of the addNote
 */
const addNote = async (req, res) => {
  try {
    req.body.userId = req.decoded.userId;
    const data = req.body
    const result = await notesUtils.addNote(data)
    if (result) {
      return res.status(201).send({data: result, message: "Note added Successfully",success: true});
    } else {
      return res.status(404).send({data: result, message: "Note doesn't added",success: false});
    }

  } catch (error) {
    res.status(500).send({ data: null, message: error.message, success: false });
  }
};


/**
 * Function used to update a note
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - if there is an error while updating the note
 * @returns {Object} The HTTP response object containing the result of the updateNote
 */
const updateNote = async (req, res) => {
  try{
    const {id: noteId} = req.params;
    const { userId }= req.decoded;
    const {text: data} = req.body;
    const result = await notesUtils.updateNote(noteId, userId, data)

    if(result){
      return res.status(200).send({ data: result, message: "Note updated", success: true })
    }

  }catch(error){
        res.status(500).send({ data: null, message: error.message, success: false });
  }
}


/**
 * Function used to delete a note
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - if there is an error while deleting the note
 * @returns {Object} The HTTP response object containing the result of the deleteNote
 */
const deleteNote = async (req, res) => {
  try {
    const {id: noteId} = req.params;
    const { userId }= req.decoded;
    const result = await notesUtils.deleteNote(noteId,userId);
    if(result) {
      return res.status(200).send({ data: null, message: "Note Deleted", success: true });
    } else {
      return res.status(404).send({ data: null, message: "ID not found", success: false });
    }
  } catch(error) {
      res.status(500).send({ data: null, message: err.message, success: false });
  }
}


/**
 * Function used to send the invalid url message
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 */
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
