const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config')
const userRoutes = require('./routes/user')


//connect to MongoDB database
mongoose.connect(dbConfig.uri,dbConfig.options)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));




app.use(express.json());
app.use(userRoutes);

app.listen(3000, () => 'connected to port 3000');

