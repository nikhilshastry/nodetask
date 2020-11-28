const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();
//using mongo database 'nodetask'  
mongoose.connect('mongodb://localhost/nodetask')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
 
app.use(express.json());
app.use('/api/users', users);

//Running on Port 4000
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));