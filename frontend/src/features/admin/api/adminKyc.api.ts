import api from "../../../api/axios";

export interface AdminKyc {
  id: string;
  userId: string;
  aadhaarNumber: string;
  panNumber: string;

  addressLine1: string;
  addressLine2: string | null;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  aadhaarImageUrl: string | null;
  panImageUrl: string | null;
  selfieImageUrl: string | null;

  status: "PENDING" | "APPROVED" | "REJECTED";

  rejectionReason: string | null;

  createdAt: string;
  updatedAt: string;
}

interface AdminKycResponse {
  success: boolean;
  kycs: AdminKyc[];
}

export const getAllKyc = async (): Promise<AdminKycResponse> => {
  const response = await api.get("/kyc/admin");

  return response.data;
};

export const approveKyc = async (id: string) => {
  const response = await api.patch(
    `/kyc/admin/${id}/approve`
  );

  return response.data;
};

export const rejectKyc = async (
  id: string,
  reason: string
) => {
  const response = await api.patch(
    `/kyc/admin/${id}/reject`,
    {
      reason,
    }
  );

  return response.data;
};