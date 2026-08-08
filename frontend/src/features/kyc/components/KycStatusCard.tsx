import type { Kyc } from "../types/kyc.types";

interface Props {
  kyc: Kyc;
}

const KycStatusCard = ({ kyc }: Props) => {
  const getColor = () => {
    switch (kyc.status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        KYC Status
      </h2>

      <span
        className={`rounded-full px-4 py-2 text-sm font-medium ${getColor()}`}
      >
        {kyc.status}
      </span>

      {kyc.rejectionReason && (
        <div className="mt-4 rounded-lg bg-red-50 p-4">
          <p className="font-medium text-red-600">
            Rejection Reason
          </p>

          <p className="mt-1 text-sm text-gray-700">
            {kyc.rejectionReason}
          </p>
        </div>
      )}
    </div>
  );
};

export default KycStatusCard;