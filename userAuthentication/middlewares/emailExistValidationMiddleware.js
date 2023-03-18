const User = require('../models/userModels.js');

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

module.exports = emailExistValidation;