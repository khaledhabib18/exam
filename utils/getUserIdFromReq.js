const jwt = require('jsonwebtoken');

const getUserIdFromReq = (req) => {
    try {
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            throw new Error('Token missing');
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload.id;
    } catch (err) {
        console.error('GetUserId middleware error:', err);
        return null;
    }
};

module.exports = getUserIdFromReq;