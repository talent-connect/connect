import { isLoggedIn } from "../services/auth/auth";
import { history } from "../services/history/history";

export const useNotAuthenticatedRedirector = () => {
  if (!isLoggedIn()) {
    history.replace("/front/login");
    return { isRedirectingToLogin: true };
  }
  return { isRedirectingToLogin: false };
};
