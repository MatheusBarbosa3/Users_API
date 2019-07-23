const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if (!token_header) return res.status(401).send({ message: 'Token not send' });

    jwt.verify(token_header, 'password123', (err, decoded) => {
        if (err) return res.send({ message: 'Invalid token' });
        res.locals.auth_data = decoded;
        return next();
    });

}

module.exports = auth;