const jwt = require('jsonwebtoken')
require('dotenv').config();


/***
 * function to create json web token
 * @param {string} email - email of the user
 * @param {string} userId - id of the user
 * @returns {string} json web token
 */
const token = (email, userId) => {
    try{
        return jwt.sign({ email, userId }, process.env.JWT_TOKEN, {expiresIn: '24h'})
    } catch(error) {
        console.error(error);
        return Promise.reject(error);
    }
}


module.exports = token