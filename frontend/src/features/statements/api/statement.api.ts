import api from "../../../api/axios";

import type { StatementResponse } from "../types/statement.types";

/**
 * Fetch account statement
 */
export const getStatement = async (
  accountId: string,
): Promise<StatementResponse> => {
  const response = await api.get(`/statements/${accountId}`);

  return response.data;
};

/**
 * Download PDF Statement
 */
export const downloadStatement = async (accountId: string): Promise<Blob> => {
  const response = await api.get(`/statements/${accountId}/pdf`, {
    responseType: "blob",
  });

  return response.data;
};
