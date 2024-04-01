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
exports.checkTokenValidity = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET; // Ensure JWT_SECRET is a string
// Generates a token by signing a user's unique details against a secret key whenever they sign in.
const generateToken = (payload, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn });
    }
    catch (error) {
        console.error("Error generating JWT token:", error);
        throw new Error("Failed to generate JWT token"); // Or handle error differently
    }
});
exports.generateToken = generateToken;
// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey); // Type cast for clarity
    }
    catch (error) {
        console.error("Error verifying JWT token:", error);
        return undefined; // Or handle error differently (e.g., throw an exception)
    }
});
exports.verifyToken = verifyToken;
const checkTokenValidity = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate token structure before accessing properties
        const decoded = jsonwebtoken_1.default.decode(token);
        if (typeof decoded === 'string') {
            console.error("Decoded token is a string, not a JWT payload. Potential decoding error.");
            return false;
        }
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.exp)) {
            return false;
        }
        const expirationDate = new Date(decoded.exp * 1000);
        // Add a buffer of 5 seconds to account for clock differences
        const bufferTime = new Date(expirationDate.getTime() - 5000);
        return !!token && bufferTime <= new Date();
    }
    catch (error) {
        console.error("Error checking token validity:", error);
        return false; // Or handle error differently
    }
});
exports.checkTokenValidity = checkTokenValidity;
//# sourceMappingURL=token.util.js.map