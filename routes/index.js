const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: 'alright for the method GET of Root' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'alright for the method POST of Root' });
});

module.exports = router;