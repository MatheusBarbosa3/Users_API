const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://user_adm:ThW6F8A7cZBK7S6G@clusterapi-klqrn.mongodb.net/test?retryWrites=true';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

//Connection with database
mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Error in connecting to the database: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected application from the database!');
});

mongoose.connection.on('connected', () => {
    console.log('Connected application from the database!');
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;

