const User = require('../models/userModels.js');
const createToken = require('../utils/createToken');
const {hashPassword, comparePassword } = require('../utils/passwordHashing.js')


/**
 * Function to create a new user account
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - If there is an error while hashing the password or saving the user
 * @returns {Object} The HTTP response object containing the result of the signup process.
 */
const signup = async(req,res) => {
    try{
        const hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword;
        const user = new User(req.body);
        const savedUser = await user.save();
        if(savedUser){
            return res.status(201).send({data: null, message: "SignUp sucessfully", success: true})
        }
           
    }catch(error){
        res.status(500).send({data: null, message: error.message, success: false})
    }

}


/**
 * Function used to signin the user
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @throws {Error} - If there is an error while finding the email, comparing the password or creating the token
 * @returns {Object} The HTTP response object containing the result of the signin process.
 */
const signin = async(req,res) => {
    try{
        const userEnteredEmail = req.body.email;
        const result = await User.find({email: userEnteredEmail});
        if(result.length !== 0){
            const userEnteredPassword = req.body.password;
            const {email, password, _id } = result[0];
            const passwordCompared = await comparePassword(userEnteredPassword, password);
            if(passwordCompared) {
                const token = createToken(email,_id);
                res.cookie('jwt',token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
                return res.status(200).send({data: token , message: "Loged In sucessfully", success: true})
            }
            return res.status(404).send({data: null, message: "password doesn't match", success: false})

        } else {
            res.status(404).send({data: null, message: "Invalid email", success: false})
        }

    } catch(error) {
        res.status(500).send({data: null, message: error.message, success: false})
    } 

}

/**
 * 
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {object} The HTTP response object containing the result of the signout process.
 */
const signout = (req,res) => {
    try{
        res.cookie('jwt', '', {maxAge: 1})
        return res.status(200).send({data: null, message: "user loged out", success: true})
    } catch(error) {
        res.status(500).send({data: null, message: error.message, success: false}) 
    }
    
}

module.exports = {
    signin,
    signup,
    signout
}

