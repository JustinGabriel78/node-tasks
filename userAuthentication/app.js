const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config')
const userRoutes = require('./routes/user')
const cookieParser = require('cookie-parser')

//connect to MongoDB database
mongoose.connect(dbConfig.uri,dbConfig.options)
    .then((result) => {console.log('connected to db')})
    .catch((err) => console.log(err));


// middleware
app.use(cookieParser())
app.use(express.json());

// routes
app.use(userRoutes);

// unmatched routes

app.use((req,res) => {
  res.status(404).send({ data: null, message: "Invalid url", success: false });

})

app.listen(3000, () => 'connected to port 3000');

