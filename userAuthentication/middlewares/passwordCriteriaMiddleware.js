const passwordRegexp = require("password-regexp")();
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

module.exports = passwordCriteria