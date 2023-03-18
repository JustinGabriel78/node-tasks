const idValidation = (schema) => async (req,res,next) => {
    const id = +req.params.id;
    const noteId = {id}

    try {
        await schema.validate(noteId)
        return next();
    } catch(error) {
        return res.status(400).send({ data: null, message: error.message, success: false })
    }
}



module.exports = idValidation

