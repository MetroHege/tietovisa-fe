/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/apiHooks"; // Assuming `useUser` is imported from your hooks
import { AuthContextType } from "@/types/LocalTypes";
import { RegisterUserRequest, UserWithNoPassword } from "@/types/userTypes";

// Create UserContext
const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const [registerResult, setRegisterResult] = useState<UserWithNoPassword | null>(null);
  const [autoLoginLoading, setAutoLoginLoading] = useState(true);

  const {
    loginUser,
    registerUser,
    authLoading,
    authError,
    getUserByToken,
    tokenLoading,
    tokenError
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
        navigate("/login");
      }
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log((e as Error).message);
    }
  }, [navigate]);

  const handleAutoLogin = async () => {
    setAutoLoginLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userResponse = await getUserByToken(token);
        if (userResponse) {
          setUser(userResponse); // Sets user state
        } else {
          console.log("Failed to fetch user data.");
        }
      } else {
        console.log("No token found in localStorage.");
      }
    } catch (e) {
      console.error("Error during auto-login:", e);
    } finally {
      setAutoLoginLoading(false);
    }
  };


  // Initiate auto-login on mount
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
        autoLoginLoading,
        authLoading,
        authError,
        tokenLoading,
        tokenError
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
