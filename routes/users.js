const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createTokenUser = (userID) => {
    return jwt.sign({ id: userID }, 'password123', { expiresIn: '7d' });
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);

    } catch (error) {
        return res.send({ message: 'Error in query of users' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ message: 'No data sufficient' });

    try {
        if (await Users.findOne({ email })) return res.send({ message: 'User already registered' });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({ user, token: createTokenUser(user.id) });

    } catch (error) {
        return res.send({ message: 'Error fetching users' });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ message: 'No data sufficient' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ message: 'User not registered' });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.send({ message: 'Error to authenticate user' });

        user.password = undefined;
        return res.send({ user, token: createTokenUser(user.id) });

    } catch (error) {
        return res.send({ message: 'Error fetching users' });
    }
});

module.exports = router;