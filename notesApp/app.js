const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    handler(argv){
        const text = argv._[1]
        // const text = argv._.splice(1).join(" ")
        const length = argv._.length
        const err = notes.addError(length)
        if(err) {
            throw new Error(err)
        }
        notes.addNote(text)
    }
})

yargs.command({
    command: 'getList',
    describe: 'List the notes',
    handler(argv){
        const length = argv._.length
        const err = notes.listError(length)
        if(err) {
            throw new Error(err)
        }
        notes.getNotes()
    }
})

yargs.command({
    command: 'update',
    describe: 'Update the notes',
    handler(argv){
        const id = argv._[1];
        const text = argv._[2];
        const length = argv._.length;
        const error = notes.twoArgumentIdError(id)
        const err = notes.updateError(length)
        if(error) {
            throw new Error(error)
        } else if(err) {
            throw new Error(err)
        }
        
        notes.updateNote(id,text)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv){
        const id = argv._[1];
        const length = argv._.length;
        const error = notes.idError(id)
        const err = notes.commandError(length)
        if(error) {
            throw new Error(error)
        } else if (err) {
            throw new Error(err)
        }
        notes.readNote(id)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    handler(argv){
        const id = argv._[1];
        const length = argv._.length;
        const error = notes.idError(id)
        const err = notes.commandError(length)
        if(error) {
            throw new Error(error)
        } else if (err) {
            throw new Error(err)
        }
        notes.deleteNote(id)
    }
})

yargs.command({
    command: '*',
    describe: 'Invalid Commands',
    handler(){
        throw new Error("Invalid Command !!")
    }
})


try{
    yargs.parse()
}catch(err) {
    console.log(chalk.bgRed(err))
}

