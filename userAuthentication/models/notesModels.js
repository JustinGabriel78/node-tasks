const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notesSchema = new Schema({
    text: {
        type: String,
        required: true,

    },
    userId: {
        type: String,
        required: true,
        
    }
}, {timestamps: true});




const Notes = mongoose.model('Note',notesSchema);

module.exports = Notes;