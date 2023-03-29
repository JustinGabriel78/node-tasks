require('dotenv').config();

module.exports = {
    uri: process.env.API,
    options: { useNewUrlParser: true,useUnifiedTopology: true}
}



