"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_service_js_1 = require("../services/index.service.js");
// Controller function for user registration
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check if user already exists
        const existingUser = yield index_service_js_1.userService.find({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists, please try another username.' });
        }
        // Hash the password
        req.body.password = yield bcrypt_1.default.hash(password, 10);
        // To create a new user
        const newUser = yield index_service_js_1.userService.create(req.body);
        const payload = { _id: newUser._id, username: newUser.username, createdAt: newUser.createdAt };
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.status(201).json({ message: 'User registered successfully!', data: payload, token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
// Function for user login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check if user exists
        const user = yield index_service_js_1.userService.find({ username });
        if (!user) {
            return res.status(404).json({ message: 'This user does not exist' });
        }
        // Check if password is correct
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const payload = { _id: user._id, username: user.username, createdAt: user.createdAt };
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie('token', token, {httpOnly: true})
        return res.status(200).json({ message: 'Login successful', data: payload, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
//# sourceMappingURL=user.controller.js.map