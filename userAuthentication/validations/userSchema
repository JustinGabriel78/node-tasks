const yup = require('yup');

const userNameSchema = yup.object({
    userName: yup.string().strict().required()
})

const emailSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email is required'),
})

const passwordSchema = yup.object({
    password: yup.string().min(8).max(15).required('Password is required!')
})

module.exports = {
    userNameSchema,
    emailSchema,
    passwordSchema

}