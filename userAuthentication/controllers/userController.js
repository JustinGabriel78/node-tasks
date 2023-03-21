const User = require('../models/userModels.js');
const createToken = require('../utils/createToken');
const hashing = require('../utils/passwordHashing.js')

const signup = async(req,res) => {
    try{
        const hashedPassword = await hashing.hashPassword(req.body.password)
        req.body.password = hashedPassword;
        const user = new User(req.body);
        const savedUser = await user.save();
        if(savedUser){
            return res.status(201).send({data: null, message: "SignUp sucessfully", success: true})
        }
           
    }catch(err){
        res.status(500).send({data: null, message: err.message, success: false})
    }

}

const signin = async(req,res) => {
    try{
        const userEnteredEmail = req.body.email;
        const result = await User.find({email: userEnteredEmail});
        if(result.length !== 0){
            const userEnteredPassword = req.body.password;
            const {email, password, _id } = result[0];
            const passwordCompared = await hashing.comparePassword(userEnteredPassword, password);
            if(passwordCompared) {
                const token = createToken(email,_id);
                res.cookie('jwt',token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
                return res.status(200).send({data: token , message: "Loged In sucessfully", success: true})
            }
            return res.status(400).send({data: null, message: "password doesn't match", success: false})

        } else {
            res.status(400).send({data: null, message: "Invalid email", success: false})
        }

    } catch(err) {
        res.status(500).send({data: null, message: err.message, success: false})
    } 

}

module.exports = {
    signin,
    signup
}

