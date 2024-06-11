const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.token || req.headers['x-access-token'];
    if (!accessToken) return res.status(401).json({ message: 'User not authenticated' });

    // If the token is provided, verify it
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        // If the token is valid, extract user information from the decoded token
        const { id, email } = decoded;

        // Add user information to the request object for further processing
        req.userId = id;
        // req.username = username;
        req.email = email;

        next();
    });
};

module.exports = verifyToken;




