/**
 * Middleware function to validate user input against a given schema.
 * @param {Object} schema - The schema object to validate against 
 */
const idValidation = (schema) => async (req,res,next) => {
    const id = req.params.id;

    try {
        await schema.validate({id})
        return next();
    } catch(error) {
        return res.status(400).send({ data: null, message: error.message, success: false })
    }
}

/**
 * Middleware function to validate user input against a given schema.
 * @param {object} schema -  The schema object to validate against 
 */
const textValidation = (schema) => async (req,res,next) => {
    const body = req.body;

    try {
        await schema.validate(body)
        return next();
    } catch(error) {
        return res.status(400).send({ data: null, message: error.message, success: false })
    }
}


module.exports = {
    idValidation,
    textValidation
}