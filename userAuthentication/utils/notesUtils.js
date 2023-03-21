const fs = require('fs');


/**
 * Function to add the notes
 * @param {string} text - note that to be added to the all notes
 */
const addNote = (text) => {
    const notes = loadNotes();
    const newNote = {id:Date.now(),text}
    notes.push(newNote)
    saveNotes(notes);
    return newNote
}

/**
 * Function update the notes
 * @param {integer} id - id of the the note 
 * @param {string} text - note that to be added to the all notes
 */
const updateNote = (id,text) => {
    const notes = loadNotes();
    const noteToUpdate = notes.find(note => note.id === id);
    noteToUpdate["text"] = text ;
    notes[id] = noteToUpdate ;
    saveNotes(notes) ;
    return readNote(id)

}

/**
 * Function to read the note
 * @param {integer} id - id of the note that to read
 * @returns {object} individual note
 */
const readNote = (id) => {
    const notes = loadNotes();
    const matchingNote = notes.find(note => note.id === id)
    return matchingNote
}


/**
 * Function to delete the note
 * @param {integer} id - id of the note to be deleted
 */
const deleteNote = (id) => {
    let updatedNotes = null ;
    const notes = loadNotes() ;
    updatedNotes = notes.filter(note => note.id !== id)
    saveNotes(updatedNotes)
}


/**
 * Function to find if there is any id error
 * @param {integer} id - id of the note
 * @returns {string}
 */
const idError = (id) => {
    const notes = loadNotes();
    const matchingNote = notes.find(note => note.id === id)
        if(!matchingNote){
            return "Invalid id!!"
        }
}

/**
 * Function to load all the notes
 * @returns {array}
 */
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('data.json');
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch {
        return []
    }
}

/**
 * Function to save notes 
 * @param {array} notes - array of all notes
 */
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('data.json',dataJSON)
}


module.exports = {
    addNote,
    updateNote,
    readNote,
    deleteNote,
    idError,
    loadNotes,

}