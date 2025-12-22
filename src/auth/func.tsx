import { useMutation } from "@tanstack/react-query";
import { TOKEN_KEY } from "./keys";
import { loginRequest } from "../api/auth.api";

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
    },
    onError:(e)=>{
      console.log(e.message)
    }
  });
};