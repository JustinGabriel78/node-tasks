const fs = require('fs');
const chalk = require('chalk')

const addNote = (text) => {
    const notes = loadNotes();
    console.log(typeof notes)
    notes.push({id:notes.length,text})
    saveNotes(notes);
    console.log(chalk.bgGreen("Note added Sucessfully"))
    console.log(`id:${notes.length - 1} `)
    console.log(`note: ${text}`)


}

const getNotes = () =>{
    const notes = loadNotes();
    console.log(chalk.bold("Your Notes"))
    console.log(notes)
}

const updateNote = (id,text) => {
    const notes = loadNotes();
    const update = notes[id];
    update["text"] = text ;
    notes[id] = update ;
    saveNotes(notes) ;
    console.log(chalk.bgGreen("Note is updated"))

}

const readNote = (id) => {
    const notes = loadNotes();
    console.log(chalk.bold("Your Note"))
    console.log(notes[id].text)
}

const deleteNote = (id) => {
    let updatedNotes = null ;
    const notes = loadNotes() ;

    notes.splice(id,1) ;
    updatedNotes = notes.map((note,index) => {
        note.id = index
        return note
    })
    saveNotes(updatedNotes)
    console.log(chalk.bgGreen("Note deleted sucessfully"))

}

const addError = (length) => {
    if(length < 2) {
        return "Add command requires a note to add"
    } else if( length > 2) {
        return "Note should added  within double quotes"
    }
}

const listError = (length) => {
    if(length !== 1 ) {
        return "Only getList command is required!"
    }
}

const updateError = (length) => {

    if(length > 3) {
        return "Only id and updated note is required. Updated note should be within double quotes"
    } else if (length < 3) {
        return "Id and note is required ."
    } 
    
}

const idError = (id) => {
    const notes = loadNotes();
    if(!id) {
        return "Id required "
    } else if (typeof id !== "number" ) {
        return "Invalid id!. Id should be a number"
    } else if(!notes[id]){
        return "Invalid id!!"
    }
}

const twoArgumentIdError = (id) => {
    const notes = loadNotes();
    if(!id) {
        return "Id and note is required  "
    } else if (typeof id !== "number" ) {
        return "Invalid id!. Id should be a number"
    } else if(!notes[id]){
        return "Invalid id!!"
    }
}

const commandError = (length) => {
    if(length > 2) {
        return "Only id is required"
    }
}



const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('data.json');
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('data.json',dataJSON)
}


module.exports = {
    addNote,
    getNotes,
    updateNote,
    readNote,
    deleteNote,
    addError,
    listError,
    updateError,
    idError,
    commandError,
    twoArgumentIdError,
}

