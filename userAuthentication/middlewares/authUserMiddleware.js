const User = require('../models/userModels.js');
const passwordRegexp = require("password-regexp")();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

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
    } catch(err) {
        res.status(400).send({data: null, message: err.message, sucess: false})
    }    
}

const passwordCriteria = () => (req,res,next) => {
    try{
        const password = req.body.password;
        if(!passwordRegexp.test(password)){
            return res.status(400).send({data: null, message: "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character", sucess: false})
        }
        return next()
        

    }catch(err) {
        res.status(400).send({data: null, message: err.message, sucess: false})
    }
}

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
    } catch(err) {
        res.status(400).send({data: null, message: err.message, sucess: false})
    }    
    
}

const userValidation = (schema) => async (req,res,next) => {
    const body = req.body;

    try {
        await schema.validate(body);
        return next();
    } catch(error) {
        return res.status(400).send({data: null, message: error.message, sucess: false})
    }
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
            if(err) {
               return  res.status(400).send({data: null, message: err.message, success: false})
            } else {
                req.decoded = decodedToken;
                return next()
            }
        } )
    } else {
        res.status(500).send({data: null, message: "Please signUp or Login to get the access", success: false})
    }
}


module.exports = {
    emailExistValidation,
    passwordCriteria,
    userNameExistValidation,
    userValidation,
    requireAuth
};