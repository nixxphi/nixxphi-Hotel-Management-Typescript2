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
const secretKey = process.env.JWT_SECRET;
// Generates a token by signing a user's unique details against a secret key whenever they sign in.
const generateToken = (payload, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiresIn });
});
exports.generateToken = generateToken;
// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, secretKey);
});
exports.verifyToken = verifyToken;
const checkTokenValidity = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Decode the token to extract the expiration date
    const decoded = jsonwebtoken_1.default.decode(token);
    const exp = decoded === null || decoded === void 0 ? void 0 : decoded.exp;
    const expirationDate = new Date(exp * 1000);
    // Checks if the token is expired
    if (token && expirationDate <= new Date()) {
        return false;
    }
    return true;
});
exports.checkTokenValidity = checkTokenValidity;
//# sourceMappingURL=token.util.js.map