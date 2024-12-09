import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/apiHooks";
import { AuthContextType } from "@/types/LocalTypes";
import { RegisterUserRequest, UserWithNoPassword } from "@/types/userTypes";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const [registerResult, setRegisterResult] =
    useState<UserWithNoPassword | null>(null);
  const [autoLoginLoading, setAutoLoginLoading] = useState(true);

  const {
    loginUser,
    registerUser,
    authLoading,
    authError,
    getUserByToken,
    tokenLoading,
    tokenError,
    modifyUser,
  } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const loginResult = await loginUser({ email, password });
      if (loginResult) {
        localStorage.setItem("token", loginResult.token);
        const { password, ...userWithoutPassword } = loginResult.user;
        setUser(userWithoutPassword);
        navigate("/");
      }
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleRegister = async (userData: RegisterUserRequest) => {
    try {
      const registerResponse = await registerUser(userData);
      if (registerResponse) {
        const { password, ...userWithoutPassword } = registerResponse.user;
        setRegisterResult(userWithoutPassword);
        navigate("/");
      }
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  const handleAutoLogin = async () => {
    setAutoLoginLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        if (import.meta.env.REACT_APP_ENV === "development") {
          console.warn("No token found for auto-login.");
        }
        return;
      }

      const userResponse = await getUserByToken(token);
      if (userResponse) {
        setUser(userResponse);
      } else {
        console.warn("Auto-login failed: Unable to fetch user data.");
        handleLogout();
      }
    } catch (e) {
      console.error("Unexpected error during auto-login:", e);
    } finally {
      setAutoLoginLoading(false);
    }
  };

  const handleModifyUser = async (
    userId: string,
    updates: {
      username: string;
      email: string;
      password: string;
      role: string;
    },
  ) => {
    try {
      await modifyUser(userId, updates);
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser as UserWithNoPassword);
    } catch (e) {
      throw new Error("Failed to update user details");
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        registerResult,
        handleLogin,
        handleLogout,
        handleAutoLogin,
        handleRegister,
        handleModifyUser,
        autoLoginLoading,
        authLoading,
        authError,
        tokenLoading,
        tokenError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
