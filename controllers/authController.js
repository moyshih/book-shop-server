import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../common/models/User.js'
import { v4 as uuidv4 } from 'uuid';

// User login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid user or password' });
        }

        // Check if the password is correct
        const isMatch = user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid user or password' });
        }

        const payloadObject = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin ?? false
        };

        // Generate JWT token
        const token = jwt.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_LIFE });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// User Register
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists in database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Create the new user
        const newUser = new User({
            id: uuidv4(),
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export default {
    login,
    register,
}