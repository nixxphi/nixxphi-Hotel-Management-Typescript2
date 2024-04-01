import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.model';
import { userService } from '../services/index.service';
import { any, string } from 'joi';

// Controller function for user registration
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await userService.find({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists, please try another username.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userService.create({
      username,
      password: hashedPassword ,
      role: 'guest', 
      createdAt: new Date(), // Provide a value for createdAt
      updatedAt: new Date(),
    });

    const payload = { _id: newUser._id, username: newUser.username, role: newUser.role, createdAt: newUser.createdAt }

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    return res.status(201).json({ message: 'User registered successfully!', data: payload, token });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Function for user login
export const login = async (req: Request, res: Response) => {
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

    const payload = { _id: req.params.id, username: user.username, role: user.role, createdAt: user.createdAt }

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', data: payload, token });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
