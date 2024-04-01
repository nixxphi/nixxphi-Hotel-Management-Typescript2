import jwt from 'jsonwebtoken' 

const secretKey = process.env.JWT_SECRET

// Generates a token by signing a user's unique details against a secret key whenever they sign in.
export const generateToken = async (payload, expiresIn) => {
    return jwt.sign(payload, secretKey, {expiresIn: expiresIn})  
}

// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
export const verifyToken = async (token) => {
    return jwt.verify(token, secretKey)  
}

export const checkTokenValidity = async (token) => {
    // Decode the token to extract the expiration date
    const decoded = jwt.decode(token);
    const exp = decoded?.exp
    const expirationDate = new Date(exp * 1000);

    // Checks if the token is expired
    if (token && expirationDate <= new Date()) {
        return false
      }
    return true
}