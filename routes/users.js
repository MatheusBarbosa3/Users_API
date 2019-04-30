const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({ message: 'Error in query of users' });
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ message: 'No data sufficient' });

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ message: 'Error fetching users' });
        if (data) return res.send({ message: 'User already registered' });

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ message: 'Error to create user' });
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ message: 'No data sufficient' });

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ message: 'Error fetching users' });
        if (!data) return res.send({ message: 'User not registered' });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.send({ message: 'Error to authenticate user' });
            data.password = undefined;
            return res.send(data);
        });
    }).select('+password');
});

module.exports = router;