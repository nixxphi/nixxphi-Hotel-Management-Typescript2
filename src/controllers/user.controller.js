import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from '../services/index.service.js';

// Controller function for user registration
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await userService.find({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists, please try another username.' });
    }

    // Hash the password
    req.body.password = await bcrypt.hash(password, 10);

    // To create a new user
    const newUser = await userService.create(req.body);
    const payload = { _id: newUser._id, username: newUser.username, createdAt: newUser.createdAt }

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {httpOnly: true})
    
    return res.status(201).json({ message: 'User registered successfully!', data: payload, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Function for user login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await userService.find({ username });
    if (!user) {
      return res.status(404).json({ message: 'This user does not exist' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const payload = { _id: user._id, username: user.username, createdAt: user.createdAt }

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.cookie('token', token, {httpOnly: true})

    return res.status(200).json({ message: 'Login successful', data: payload, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};