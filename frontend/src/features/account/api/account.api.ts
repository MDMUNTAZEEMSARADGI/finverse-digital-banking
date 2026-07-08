import api from "../../../api/axios";

import type {
  GetAccountsResponse,
  OpenAccountRequest,
  OpenAccountResponse,
} from "../types/account.types";

export const getAccounts =
  async (): Promise<GetAccountsResponse> => {
    const response =
      await api.get("/accounts");

    return response.data;
  };

export const openAccount =
  async (
    data: OpenAccountRequest
  ): Promise<OpenAccountResponse> => {
    const response =
      await api.post(
        "/accounts",
        data
      );

    return response.data;
  };

export const getAccount =
  async (id: string) => {
    const response =
      await api.get(
        `/accounts/${id}`
      );

    return response.data;
  };

export const getBalance =
  async (id: string) => {
    const response =
      await api.get(
        `/accounts/balance/${id}`
      );

    return response.data;
  };