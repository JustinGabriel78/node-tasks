const User = require('../models/userModels.js');

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

module.exports = userNameExistValidation;