const Notes = require("../models/notesModels");

/**
 * Function to add the notes 
 * @param {object} data - note that to be added to the notes collection in db
 */
const addNote = async(data) => {
    try{
        const note = new Notes(data);
        const savedNote = await note.save();
        return savedNote ? { id: savedNote._id, text: savedNote.text }: null
    }catch(error) {
        console.error(error)
        return Promise.reject(error);
    }

}

/**
 * Function update the notes
 * @param {string} noteId - id of the note that to read
 * @param {string} userId - id of the user
 * @param {object} data - note that to be added to the notes collection in db
 */
const updateNote = async(noteId, userId, data) => {
   try{
    const filter = { userId, _id: noteId };
    const update = { text: data };
    const doc = await Notes.findOneAndUpdate(filter, update, { new: true});
    const updatedNotes = { id: doc._id, text: doc.text };
    return updatedNotes;

   } catch(error){
     console.error(error)
     return Promise.reject(error)
   } 
}

/**
 * Function to read the note
 * @param {string} noteId - id of the note that to read
 * @param {string} userId - id of the user

 */
const readNote = async (noteId,userId) => {
    try{
        const note = await Notes.find({userId, _id: noteId});
        return { id: note[0]._id, text: note[0].text }
    } catch(error) {
        console.error(error)
        return null
    }

}


/**
 * Function to delete the note
 * @param {string} noteId - id of the note that to read
 * @param {string} userId - id of the user
 */
const deleteNote = async (noteId, userId) => {
    try {
        const filter = { userId, _id: noteId};
        const isDeleted = await Notes.findOneAndDelete(filter);
        return isDeleted
    } catch (error){
        console.error(error)
        return Promise.reject(error)
    }
}



/**
 * Function to load all notes
 * @param {string} userId - id of the user
 */

const loadNotes = async (userId) => {
    try {
        const results = await Notes.find({ userId });
        const allNotes = results.map(({_id, text}) => ({id: _id, text}));
        return allNotes.length ? allNotes : null;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};


module.exports = {
    addNote,
    updateNote,
    readNote,
    deleteNote,
    loadNotes,

}