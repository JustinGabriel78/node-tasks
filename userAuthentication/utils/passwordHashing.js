const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * function to create hashed password
 * @param {string} plainPassword - user password
 * @returns {string} hashed password
 */
const hashPassword = async(plainPassword) => {
    try{
        const hash = await bcrypt.hash(plainPassword,saltRounds)
        return hash
    } catch (error) {
        console.error(error);
        return Promise.reject(error)
    }

}


/**
 * Function to compare the user entered password 
 * @param {string} plainPassword - user password
 * @param {string} hashedPassword - hashed user password
 * @returns {boolean} 
 */
const comparePassword = async(plainPassword, hashedPassword ) => {
    try {
        const result = await bcrypt.compare(plainPassword,hashedPassword )
        return result
    } catch(error) {
        console.error(error);
        return Promise.reject(error)
    }

}
module.exports = {
    hashPassword,
    comparePassword
}