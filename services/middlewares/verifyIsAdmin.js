import jwt from 'jsonwebtoken';
import User from './../../common/models/User.js';
import {isTokenVerified} from './verifyJwt.js';

const verifyIsAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token || !isTokenVerified(token))
            return res.status(401).json({ error: 'Invalid Token' });

        const userId = jwt.decode(token).id;
        const user = await User.findById(userId);

        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Call the next middleware function
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export default verifyIsAdmin;