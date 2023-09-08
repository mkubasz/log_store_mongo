const jwt = require('jsonwebtoken');
const readEnvironmentVariable = require('./utils');

const secretKey = readEnvironmentVariable(process.env.SECRET_KEY, '1234');

module.exports = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        return res.status(401).send('Missing bearer token or client ID');
    }

    try {
        jwt.verify(bearerToken, secretKey, { algorithm: 'HS256' });

        req.clientId = req.headers['client-id'];

        next();
    } catch (err) {
        return res.status(401).send('Invalid bearer token');
    }
};