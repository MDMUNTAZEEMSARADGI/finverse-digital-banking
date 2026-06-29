import { Request, Response } from "express";
import { depositMoney, withdrawMoney } from "../services/transaction.service";

export const deposit = async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body;

    const transaction = await depositMoney(accountId, amount);

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  try {
    const { accountId, amount } = req.body;

    const transaction = await withdrawMoney(accountId, amount);

    res.status(201).json({
      success: true,
      transaction,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
