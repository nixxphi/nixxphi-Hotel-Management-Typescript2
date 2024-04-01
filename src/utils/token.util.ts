import jwt from 'jsonwebtoken';

interface JWTPayload {
 _Id: string,
  username: string 
}

const secretKey = process.env.JWT_SECRET as string; // Ensure JWT_SECRET is a string

// Generates a token by signing a user's unique details against a secret key whenever they sign in.
export const generateToken = async (payload: JWTPayload, expiresIn: string | number): Promise<string> => {
  try {
    return jwt.sign(payload, secretKey, { expiresIn });
  } catch (error: any) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate JWT token"); // Or handle error differently
  }
};

// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
export const verifyToken = async (token: string): Promise<JWTPayload | undefined> => {
  try {
    return jwt.verify(token, secretKey) as JWTPayload; // Type cast for clarity
  } catch (error: any) {
    console.error("Error verifying JWT token:", error);
    return undefined; // Or handle error differently (e.g., throw an exception)
  }
};

export const checkTokenValidity = async (token: string): Promise<boolean> => {
  try {
    // Validate token structure before accessing properties
    const decoded = jwt.decode(token);

    if (typeof decoded === 'string') {
      console.error("Decoded token is a string, not a JWT payload. Potential decoding error.");
      return false;
    }
    
    if (!decoded?.exp) {
      return false;
    }
    const expirationDate = new Date(decoded.exp * 1000);
    // Add a buffer of 5 seconds to account for clock differences
    const bufferTime = new Date(expirationDate.getTime() - 5000);
    return !!token && bufferTime <= new Date();
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false; // Or handle error differently
  }
};
