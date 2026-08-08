import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { fetchKyc } from "../redux/kycThunks";

import KycForm from "../components/KycForm";
import KycStatusCard from "../components/KycStatusCard";

const Kyc = () => {
  const dispatch = useAppDispatch();

  const { kyc, loading, error } = useAppSelector((state) => state.kyc);

  useEffect(() => {
    dispatch(fetchKyc());
  }, [dispatch]);

  if (loading) {
    return <div className="py-10 text-center">Loading KYC...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">KYC Verification</h1>

        <p className="mt-2 text-gray-500">
          Complete your KYC to unlock all banking features.
        </p>
      </div>

      {error && error !== "KYC not found" && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      {kyc && <KycStatusCard kyc={kyc} />}

      {(!kyc || kyc.status !== "APPROVED") && <KycForm kyc={kyc} />}

      {kyc?.status === "APPROVED" && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-700">
          Your KYC has been approved. You can no longer edit your information.
        </div>
      )}
    </div>
  );
};

export default Kyc;
