import { Request, Response } from "express";
import { getAccountStatement } from "../services/statement.service";

export const getStatement = async (
  req: Request<{ accountId: string }>,
  res: Response,
) => {
  try {
    const statement = await getAccountStatement(req.params.accountId);

    res.json({
      success: true,
      statement,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const downloadStatement = async (
  req: Request<{ accountId: string }>,
  res: Response,
) => {
  try {
    res.json({
      success: true,
      message: "Download Statement PDF",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
