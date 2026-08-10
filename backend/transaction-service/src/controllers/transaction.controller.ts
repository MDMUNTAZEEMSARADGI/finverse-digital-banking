import { Request, Response } from "express";
import {
  depositMoney,
  withdrawMoney,
  transferMoney,
  getTransactionHistory,
  getTransactionById,
} from "../services/transaction.service";

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

export const transfer = async (req: Request, res: Response) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    const transaction = await transferMoney(fromAccountId, toAccountId, amount);

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

export const getHistory = async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactionHistory(req.user!.id);

    res.json({
      success: true,
      transactions,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const transaction = await getTransactionById(userId);

    res.json({
      success: true,
      transaction,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
