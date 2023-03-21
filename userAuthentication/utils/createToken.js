const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const token = (email, id) => jwt.sign({ email, id }, process.env.JWT_TOKEN, {expiresIn: '24h'})

module.exports = token