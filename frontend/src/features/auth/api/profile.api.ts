import api from "../../../api/axios";

import type { User } from "../types/auth.types";

interface ProfileResponse {
  success: boolean;
  user: User;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/users/profile");

  return response.data;
};