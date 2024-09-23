import { RegisterUserRequest, UserWithNoPassword } from "./userTypes";

type AuthContextType = {
  user: UserWithNoPassword | null;
  registerResult: UserWithNoPassword | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  handleAutoLogin: () => Promise<void>;
  handleRegister: (user: RegisterUserRequest) => Promise<void>;
  modifyUser: (
    userId: string,
    token: string,
    updates: { username: string; email: string; password: string }
  ) => Promise<void>;
  authLoading: boolean; // loading state for login/register
  authError: string | null; // error state for login/register
  tokenLoading: boolean; // loading state for auto-login
  tokenError: string | null; // error state for auto-login
  autoLoginLoading: boolean;
};

export type { AuthContextType };
