import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { loginUser, logoutUser } from "../services/auth.service";
import prisma from "../config/prisma";
import { validateRefreshToken } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // res.status(201).json({
    //   success: true,
    //   user,
    //   accessToken,
    //   refreshToken,
    // });

    const { password, ...safeUser } = user;

    res.status(201).json({
      success: true,
      user: safeUser,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      user: safeUser,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const user = await validateRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      accessToken,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    await logoutUser(refreshToken);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
