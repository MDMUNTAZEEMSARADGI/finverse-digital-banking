import api from "../../../api/axios";

import type { KycResponse } from "../types/kyc.types";

export const getMyKyc = async (): Promise<KycResponse> => {
  const response = await api.get("/kyc/me");

  return response.data;
};

export const submitKyc = async (data: unknown) => {
  const response = await api.post("/kyc", data);

  return response.data;
};

export const updateKyc = async (data: unknown) => {
  const response = await api.put("/kyc", data);

  return response.data;
};
