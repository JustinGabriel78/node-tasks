const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = async(plainPassword) => {
    const hash = await bcrypt.hash(plainPassword,saltRounds)
    return hash
}

const comparePassword = async(plainPassword, hashedPassword ) => {
    const result = await bcrypt.compare(plainPassword,hashedPassword )
    return result
}
module.exports = {
    hashPassword,
    comparePassword
}