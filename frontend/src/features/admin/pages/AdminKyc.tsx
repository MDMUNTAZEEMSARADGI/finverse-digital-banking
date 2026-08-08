import { useEffect, useState } from "react";

import {
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
} from "lucide-react";

import {
  getAllKyc,
  approveKyc,
  rejectKyc,
} from "../api/adminKyc.api";

import type { Kyc } from "../api/adminKyc.api";

const AdminKyc = () => {
  const [kycs, setKycs] = useState<Kyc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedKyc, setSelectedKyc] =
    useState<Kyc | null>(null);

  const [rejectModal, setRejectModal] =
    useState(false);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const fetchKycApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllKyc();

      setKycs(response.kycs);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to load KYC applications",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycApplications();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveKyc(id);

      await fetchKycApplications();

      setSelectedKyc(null);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to approve KYC",
      );
    }
  };

  const handleReject = async () => {
    if (!selectedKyc) return;

    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      await rejectKyc(
        selectedKyc.id,
        rejectionReason,
      );

      setRejectModal(false);
      setSelectedKyc(null);
      setRejectionReason("");

      await fetchKycApplications();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to reject KYC",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p>Loading KYC applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            KYC Management
          </h1>

          <p className="text-gray-500">
            Review and manage customer KYC applications.
          </p>
        </div>

        <button
          onClick={fetchKycApplications}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          <RefreshCw size={18} />

          Refresh
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Applications
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {kycs.length}
          </h2>
        </div>

        <div className="rounded-xl bg-yellow-50 p-6 shadow">
          <p className="text-yellow-700">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-700">
            {
              kycs.filter(
                (kyc) => kyc.status === "PENDING",
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl bg-green-50 p-6 shadow">
          <p className="text-green-700">
            Approved
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {
              kycs.filter(
                (kyc) => kyc.status === "APPROVED",
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-4 text-left">
                User ID
              </th>

              <th className="px-4 py-4 text-left">
                PAN
              </th>

              <th className="px-4 py-4 text-left">
                City
              </th>

              <th className="px-4 py-4 text-left">
                Status
              </th>

              <th className="px-4 py-4 text-left">
                Submitted
              </th>

              <th className="px-4 py-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {kycs.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No KYC applications found.
                </td>
              </tr>
            ) : (
              kycs.map((kyc) => (

                <tr
                  key={kyc.id}
                  className="border-b"
                >

                  <td className="px-4 py-4">
                    <span className="font-mono text-sm">
                      {kyc.userId.slice(0, 8)}...
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {kyc.panNumber}
                  </td>

                  <td className="px-4 py-4">
                    {kyc.city}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        kyc.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : kyc.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {kyc.status}
                    </span>

                  </td>

                  <td className="px-4 py-4">
                    {new Date(
                      kyc.createdAt,
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">

                    <button
                      onClick={() =>
                        setSelectedKyc(kyc)
                      }
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Eye size={17} />

                      Review
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Review Modal */}

      {selectedKyc && !rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                KYC Review
              </h2>

              <button
                onClick={() =>
                  setSelectedKyc(null)
                }
                className="text-gray-500"
              >
                ✕
              </button>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  User ID
                </p>

                <p className="font-mono">
                  {selectedKyc.userId}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="font-semibold">
                  {selectedKyc.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Aadhaar
                </p>

                <p>
                  {selectedKyc.aadhaarNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  PAN
                </p>

                <p>
                  {selectedKyc.panNumber}
                </p>
              </div>

              <div className="md:col-span-2">

                <p className="text-sm text-gray-500">
                  Address
                </p>

                <p>
                  {selectedKyc.addressLine1}

                  {selectedKyc.addressLine2 &&
                    `, ${selectedKyc.addressLine2}`}

                  , {selectedKyc.city},{" "}
                  {selectedKyc.state},{" "}
                  {selectedKyc.country} -{" "}
                  {selectedKyc.postalCode}
                </p>

              </div>

            </div>

            {/* Documents */}

            <div className="mt-6">

              <h3 className="mb-4 text-lg font-semibold">
                Documents
              </h3>

              <div className="grid gap-4 md:grid-cols-3">

                {selectedKyc.aadhaarImageUrl && (
                  <a
                    href={
                      selectedKyc.aadhaarImageUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border p-4 text-center text-blue-600 hover:bg-gray-50"
                  >
                    Aadhaar Document
                  </a>
                )}

                {selectedKyc.panImageUrl && (
                  <a
                    href={selectedKyc.panImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border p-4 text-center text-blue-600 hover:bg-gray-50"
                  >
                    PAN Document
                  </a>
                )}

                {selectedKyc.selfieImageUrl && (
                  <a
                    href={
                      selectedKyc.selfieImageUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border p-4 text-center text-blue-600 hover:bg-gray-50"
                  >
                    Selfie
                  </a>
                )}

              </div>

            </div>

            {/* Actions */}

            {selectedKyc.status === "PENDING" && (
              <div className="mt-8 flex justify-end gap-3">

                <button
                  onClick={() =>
                    setRejectModal(true)
                  }
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                >
                  <XCircle size={18} />

                  Reject
                </button>

                <button
                  onClick={() =>
                    handleApprove(
                      selectedKyc.id,
                    )
                  }
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                >
                  <CheckCircle size={18} />

                  Approve
                </button>

              </div>
            )}

          </div>

        </div>
      )}

      {/* Reject Modal */}

      {rejectModal && selectedKyc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-xl bg-white p-6">

            <h2 className="text-xl font-bold">
              Reject KYC
            </h2>

            <p className="mt-2 text-gray-500">
              Please provide a reason for rejecting this KYC application.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) =>
                setRejectionReason(
                  e.target.value,
                )
              }
              placeholder="Enter rejection reason..."
              className="mt-4 h-32 w-full rounded-lg border p-3"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                onClick={() => {
                  setRejectModal(false);
                  setRejectionReason("");
                }}
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Reject KYC
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminKyc;
