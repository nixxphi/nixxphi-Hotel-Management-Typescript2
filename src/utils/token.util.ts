import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

// Generates a token by signing a user's unique details against a secret key whenever they sign in.
export const generateToken = async (payload: any, expiresIn: string): Promise<string> => {
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
};

// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
export const verifyToken = async (token: string): Promise<any> => {
    return jwt.verify(token, secretKey);
};

export const checkTokenValidity = async (token: string): Promise<boolean> => {
    // Decode the token to extract the expiration date
    const decoded: any = jwt.decode(token);
    const exp: number | undefined = decoded?.exp;
    const expirationDate: Date = new Date(exp * 1000);

    // Checks if the token is expired
    if (token && expirationDate <= new Date()) {
        return false;
    }
    return true;
};
