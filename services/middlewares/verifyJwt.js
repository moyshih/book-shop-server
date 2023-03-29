import jwt from 'jsonwebtoken';

const verifyJwt = (req, res, next) => {
    
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    const isVerified = isTokenVerified(token);

    if (isVerified)
        next();
    else
        return res.status(401).json({ error: 'Invalid Token' });
};

export const isTokenVerified = (token) => {
    try {
        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        return true;
    } catch (err) {
        return false;
    }
}

export default verifyJwt;