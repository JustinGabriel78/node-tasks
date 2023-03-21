const yup = require('yup')

const addNotesSchema = yup.object({
    text: yup.string().strict().required()
})

const noteIdSchema = yup.object({
    id: yup.number().strict().required().typeError("Id must be a number")
})


module.exports = {
    addNotesSchema,
    noteIdSchema
} 