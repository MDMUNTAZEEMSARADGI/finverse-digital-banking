import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (!REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

export const generateAccessToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const generateRefreshToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
};

