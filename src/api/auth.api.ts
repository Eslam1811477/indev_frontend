import axiosInstance from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const loginRequest = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/login", data);
  return res.data;
};
