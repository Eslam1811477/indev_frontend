import { RootState } from "../index";

export const isAuthenticated = (state: RootState): boolean => {
  return Boolean(state.auth.token);
};
