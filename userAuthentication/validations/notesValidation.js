const yup = require('yup')

const addNotesSchema = yup.object({
    text: yup.string().strict().required()
})

const noteIdSchema = yup.object({
    id: yup.string().strict().required()
})


module.exports = {
    addNotesSchema,
    noteIdSchema
} 