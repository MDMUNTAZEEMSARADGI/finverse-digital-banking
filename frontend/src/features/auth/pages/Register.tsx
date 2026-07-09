import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FiEye, FiEyeOff } from "react-icons/fi";

import toast from "react-hot-toast";

import { z } from "zod";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { registerUser } from "../redux/authThunks";

import { registerSchema } from "../validation/auth.schema";

import type { RegisterRequest } from "../types/auth.types";

const formSchema = registerSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = RegisterRequest & {
  confirmPassword: string;
};

const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { loading, token, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const { confirmPassword, ...payload } = data;

    const result = await dispatch(registerUser(payload));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration Successful");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>

        <p className="mb-8 text-center text-gray-500">
          Register to continue banking.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}

          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
          </div>

          {/* Email */}

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
          </div>

          {/* Phone */}

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
              className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
            />

            <p className="mt-1 text-sm text-red-500">{errors.phone?.message}</p>
          </div>

          {/* Password */}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          {/* Confirm Password */}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
