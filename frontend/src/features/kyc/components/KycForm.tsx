import { useEffect, useState } from "react";

import { useAppDispatch } from "../../../store/hooks";

import { createKyc, editKyc } from "../redux/kycThunks";

import type { Kyc } from "../types/kyc.types";

interface Props {
  kyc: Kyc | null;
}

const KycForm = ({ kyc }: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    aadhaarImageUrl: "",
    panImageUrl: "",
    selfieImageUrl: "",
  });

  useEffect(() => {
    if (!kyc) return;

    setFormData({
      aadhaarNumber: kyc.aadhaarNumber,
      panNumber: kyc.panNumber,
      addressLine1: kyc.addressLine1,
      addressLine2: kyc.addressLine2 ?? "",
      city: kyc.city,
      state: kyc.state,
      country: kyc.country,
      postalCode: kyc.postalCode,
      aadhaarImageUrl: kyc.aadhaarImageUrl ?? "",
      panImageUrl: kyc.panImageUrl ?? "",
      selfieImageUrl: kyc.selfieImageUrl ?? "",
    });
  }, [kyc]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (kyc) {
      dispatch(editKyc(formData));
    } else {
      dispatch(createKyc(formData));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-semibold">
        {kyc ? "Update KYC" : "Submit KYC"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="aadhaarNumber"
          placeholder="Aadhaar Number"
          value={formData.aadhaarNumber}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="panNumber"
          placeholder="PAN Number"
          value={formData.panNumber}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="addressLine1"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="addressLine2"
          placeholder="Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="aadhaarImageUrl"
          placeholder="Aadhaar Image URL"
          value={formData.aadhaarImageUrl}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="panImageUrl"
          placeholder="PAN Image URL"
          value={formData.panImageUrl}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          name="selfieImageUrl"
          placeholder="Selfie Image URL"
          value={formData.selfieImageUrl}
          onChange={handleChange}
          className="rounded border p-3 col-span-2"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {kyc ? "Update KYC" : "Submit KYC"}
      </button>
    </form>
  );
};

export default KycForm;
