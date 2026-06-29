import prisma from "../config/prisma";

export const submitKyc = async (userId: string, data: any) => {
  const existing = await prisma.kyc.findUnique({
    where: {
      userId,
    },
  });

  if (existing) {
    throw new Error("KYC already submitted");
  }

  return prisma.kyc.create({
    data: {
      userId,
      ...data,
    },
  });
};

export const getMyKyc = async (userId: string) => {
  const kyc = await prisma.kyc.findUnique({
    where: {
      userId,
    },
  });

  if (!kyc) {
    throw new Error("KYC not found");
  }

  return kyc;
};

export const updateKyc = async (userId: string, data: any) => {
  const kyc = await prisma.kyc.findUnique({
    where: {
      userId,
    },
  });

  if (!kyc) {
    throw new Error("KYC not found");
  }

  if (kyc.status === "APPROVED") {
    throw new Error("Approved KYC cannot be updated");
  }

  return prisma.kyc.update({
    where: {
      userId,
    },
    data,
  });
};

export const getAllKycs = async () => {
  return prisma.kyc.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const approveKyc = async (id: string) => {
  return prisma.kyc.update({
    where: {
      id,
    },
    data: {
      status: "APPROVED",
      rejectionReason: null,
    },
  });
};

export const rejectKyc = async (id: string, reason: string) => {
  return prisma.kyc.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
      rejectionReason: reason,
    },
  });
};
