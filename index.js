require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const users = require('./routes/users');
app.use(cors());
app.use(bodyParser());
app.use('/users', users);


app.listen(process.env.PORT || 8080, () => {
    console.log('Running on port 8080');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error != null) {
        console.error(error);         
    }
});

mongoose.connection.on('open', () => {
    console.log('DB succesfully connected');
});

mongoose.connection.on('error', () => {
    console.log('There was an error');
});

app.get('/', (req, res) => {
    res.send('Server running');
});

module.exports = app;