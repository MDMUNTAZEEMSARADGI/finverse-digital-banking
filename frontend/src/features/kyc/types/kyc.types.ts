export type KycStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface Kyc {
  id: string;

  userId: string;

  aadhaarNumber: string;

  panNumber: string;

  addressLine1: string;

  addressLine2?: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  aadhaarImageUrl?: string;

  panImageUrl?: string;

  selfieImageUrl?: string;

  status: KycStatus;

  rejectionReason?: string;

  createdAt: string;

  updatedAt: string;
}

export interface KycResponse {
  success: boolean;

  kyc: Kyc;
}