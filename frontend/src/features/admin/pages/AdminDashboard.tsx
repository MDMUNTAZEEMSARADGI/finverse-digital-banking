import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  fetchAdminKyc,
  approveAdminKyc,
  rejectAdminKyc,
} from "../redux/adminKycThunk";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();

  const {
    kycs,
    loading,
    error,
  } = useAppSelector(
    (state) => state.adminKyc
  );

  useEffect(() => {
    dispatch(fetchAdminKyc());
  }, [dispatch]);

  const pending = kycs.filter(
    (kyc) => kyc.status === "PENDING"
  );

  const approved = kycs.filter(
    (kyc) => kyc.status === "APPROVED"
  );

  const rejected = kycs.filter(
    (kyc) => kyc.status === "REJECTED"
  );

  const handleApprove = async (
    id: string
  ) => {
    await dispatch(
      approveAdminKyc(id)
    );
  };

  const handleReject = async (
    id: string
  ) => {
    const reason = window.prompt(
      "Enter rejection reason:"
    );

    if (!reason) return;

    await dispatch(
      rejectAdminKyc({
        id,
        reason,
      })
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading Admin Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Manage KYC applications and customers.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-gray-500">
            Total KYC
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {kycs.length}
          </h2>
        </div>

        <div className="rounded-xl bg-yellow-50 p-6 shadow">
          <p className="text-yellow-700">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {pending.length}
          </h2>
        </div>

        <div className="rounded-xl bg-green-50 p-6 shadow">
          <p className="text-green-700">
            Approved
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {approved.length}
          </h2>
        </div>

        <div className="rounded-xl bg-red-50 p-6 shadow">
          <p className="text-red-700">
            Rejected
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {rejected.length}
          </h2>
        </div>

      </div>

      {/* KYC table */}

      <div className="rounded-xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-xl font-bold">
            KYC Applications
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-4 text-left">
                  User ID
                </th>

                <th className="p-4 text-left">
                  Aadhaar
                </th>

                <th className="p-4 text-left">
                  PAN
                </th>

                <th className="p-4 text-left">
                  Location
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {kycs.map((kyc) => (

                <tr
                  key={kyc.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {kyc.userId}
                  </td>

                  <td className="p-4">
                    {kyc.aadhaarNumber}
                  </td>

                  <td className="p-4">
                    {kyc.panNumber}
                  </td>

                  <td className="p-4">
                    {kyc.city}, {kyc.state}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        kyc.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : kyc.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {kyc.status}
                    </span>

                  </td>

                  <td className="p-4">

                    {kyc.status === "PENDING" && (
                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleApprove(kyc.id)
                          }
                          className="rounded-lg bg-green-600 px-4 py-2 text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleReject(kyc.id)
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-white"
                        >
                          Reject
                        </button>

                      </div>
                    )}

                    {kyc.status === "APPROVED" && (
                      <span className="text-green-600">
                        Approved
                      </span>
                    )}

                    {kyc.status === "REJECTED" && (
                      <span className="text-red-600">
                        Rejected
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;