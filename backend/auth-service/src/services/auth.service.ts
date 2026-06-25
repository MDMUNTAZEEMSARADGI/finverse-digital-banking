import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export const registerUser = async (data: any) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: data.email,
        },
        {
          phone: data.phone,
        },
      ],
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return user;
};


export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  return user;
};


export const validateRefreshToken =
  async (token: string) => {
    const storedToken =
      await prisma.refreshToken.findUnique({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });

    if (!storedToken) {
      throw new Error(
        "Invalid refresh token"
      );
    }

    if (
      storedToken.expiresAt <
      new Date()
    ) {
      throw new Error(
        "Refresh token expired"
      );
    }

    return storedToken.user;
    };
  

    export const logoutUser =
  async (token: string) => {
    await prisma.refreshToken.deleteMany({
      where: {
        token,
      },
    });
  };