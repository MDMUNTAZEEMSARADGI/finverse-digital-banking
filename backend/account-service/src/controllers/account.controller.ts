import { Request, Response } from "express";
import {
  createAccount,
  getMyAccounts,
  getAccount,
  getBalance,
  freezeAccount,
  closeAccount,
  deposit,
  withdraw,
  getAccountById,
  getAccountsForUser,
} from "../services/account.service";

export const openAccount = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization!;

    const account = await createAccount(req.user!.id, req.body.type, token);

    res.status(201).json({
      success: true,
      account,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getMyAccounts(req.user!.id);

    res.json({
      success: true,
      accounts,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const account = await getAccount(req.params.id, req.user!.id);

    res.json({
      success: true,
      account,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAccountBalance = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const balance = await getBalance(req.params.id, req.user!.id);

    res.json({
      success: true,
      ...balance,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const freeze = async (req: Request<{ id: string }>, res: Response) => {
  const account = await freezeAccount(req.params.id);

  res.json({
    success: true,
    account,
  });
};

export const close = async (req: Request<{ id: string }>, res: Response) => {
  const account = await closeAccount(req.params.id);

  res.json({
    success: true,
    account,
  });
};

export const depositAmount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const account = await deposit(req.params.id, req.body.amount);

  res.json({
    success: true,
    account,
  });
};

export const withdrawAmount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const account = await withdraw(req.params.id, req.body.amount);

    res.json({
      success: true,
      account,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// iinernal authorized
export const getInternalAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const account = await getAccountById(req.params.id);

    res.json({
      success: true,
      account,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAccountsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  const accounts = await getAccountsForUser(userId);
  // const accounts = await getAccountsForUser(req.params.userId);

  res.json({
    success: true,
    accounts,
  });
};
