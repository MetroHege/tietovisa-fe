import { RegisterUserRequest, UserWithNoPassword } from "./userTypes";

type AuthContextType = {
  user: UserWithNoPassword | null;
  registerResult: UserWithNoPassword | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  handleAutoLogin: () => Promise<void>;
  handleRegister: (user: RegisterUserRequest) => Promise<void>;
  handleModifyUser: (
    userId: string,
    updates: { username: string; email: string; password: string, role: string }
  ) => Promise<void>;
  authLoading: boolean;
  authError: string | null;
  tokenLoading: boolean;
  tokenError: string | null;
  autoLoginLoading: boolean;
};

export type { AuthContextType };
