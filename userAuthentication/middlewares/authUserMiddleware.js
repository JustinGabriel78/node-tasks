const User = require('../models/userModels.js');
const passwordRegexp = require("password-regexp")();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

/**
 * Middleware function to validate if the email already exist or not
 * @returns {Object} The HTTP response object containing the result of the email validation
 */
const emailExistValidation = () => (req,res,next) => {
    try{
        const email = req.body.email;
        User.findOne({email: email})
        .then((result) => {
            if(result) {
                return res.status(400).send({data: null, message: "Email already exist", sucess: false})
            }
            return next()
        })
    } catch(error) {
        res.status(400).send({data: null, message: error.message, sucess: false})
    }    
}

/**
 * Middleware function to validate if the password matches with certain criterias
 * @returns {Object} The HTTP response object containing the result of the password criteria matches or not
 */
const passwordCriteria = () => (req,res,next) => {
    try{
        const password = req.body.password;
        if(!passwordRegexp.test(password)){
            return res.status(400).send({data: null, message: "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character", sucess: false})
        }
        return next()
        

    }catch(error) {
        res.status(400).send({data: null, message: error.message, sucess: false})
    }
}

/**
 * Middleware function to validate if the username already exist or not
 * @returns {Object} The HTTP response object containing the result of the username already exist or not
 */
const userNameExistValidation = () => (req,res,next) => {
    try{
        const userName = req.body.userName;
        User.findOne({userName: userName})
        .then((result) => {
            if(result ) {
                return res.status(400).send({data: null, message: "UserName already exist", sucess: false})
            }
            return next()
        })
    } catch(error) {
        res.status(400).send({data: null, message: error.message, sucess: false})
    }    
    
}

/**
 * Middleware function to validate user input against a given schema.
 * @param {Object} schema - The schema object to validate against 
 */
const userValidation = (schema) => async (req,res,next) => {
    try {
        const body = req.body;
        await schema.validate(body);
        return next();
    } catch(error) {
        return res.status(400).send({data: null, message: error.message, sucess: false})
    }
}


/**
 * Middleware function to require authentication for protected routes
 * @param {object} req - The HTTP request object 
 * @param {object} res - The HTTP request object 
 * @param {function} next - The next function to be called in the middleware chain.
 * @returns {Object} - Returns either the next function or a response object with an error message and status code.
 */
const requireAuth = (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, process.env.JWT_TOKEN, (error, decodedToken) => {
                if(error) {
                   return  res.status(400).send({data: null, message: error.message, success: false})
                } else {
                    req.decoded = decodedToken;
                    return next()
                }
            } )
        } else {
            res.status(500).send({data: null, message: "Please signUp or Login to get the access", success: false})
        }
    } catch(error) {
        return res.status(400).send({data: null, message: error.message, sucess: false})
    }

}


module.exports = {
    emailExistValidation,
    passwordCriteria,
    userNameExistValidation,
    userValidation,
    requireAuth
};