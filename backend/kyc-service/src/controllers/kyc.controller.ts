import { Request, Response } from "express";
import {
  submitKyc,
  getMyKyc,
  updateKyc,
  getAllKycs,
  approveKyc,
  rejectKyc,
} from "../services/kyc.service";

export const createKyc = async (req: Request, res: Response) => {
  try {
    const kyc = await submitKyc(req.user!.id, req.body);

    res.status(201).json({
      success: true,
      kyc,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getKyc = async (req: Request, res: Response) => {
  try {
    const kyc = await getMyKyc(req.user!.id);

    res.json({
      success: true,
      kyc,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const editKyc = async (req: Request, res: Response) => {
  try {
    const kyc = await updateKyc(req.user!.id, req.body);

    res.json({
      success: true,
      kyc,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllKyc = async (req: Request, res: Response) => {
  const kycs = await getAllKycs();

  res.json({
    success: true,
    kycs,
  });
};

export const approve = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id as string;

  const kyc = await approveKyc(id);

  res.json({
    success: true,
    kyc,
  });
};

export const reject = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id as string;

  const kyc = await rejectKyc(
    id,
    req.body.reason
  );

  res.json({
    success: true,
    kyc,
  });
};