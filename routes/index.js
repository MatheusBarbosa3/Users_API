const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'alright for the method GET of Root' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'alright for the method POST of Root' });
});

module.exports = router;