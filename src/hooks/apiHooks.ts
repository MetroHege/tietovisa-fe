import fetchData from "@/lib/fetchData";
import {
  RegisterAndLoginUserResponse,
  RegisterUserRequest,
  LoginUserRequest,
  getUserByTokenResponse,
} from "@/types/userTypes";
import { useCallback, useState } from "react";

// Type for handling generic API requests
type ApiCall<T> = () => Promise<T>;

const useApiState = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const handleApiRequest = useCallback(
    async (apiCall: ApiCall<T>): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCall();
        setData(result);
        return result;
      } catch (error) {
        setError((error as Error).message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, data, handleApiRequest };
};

const useUser = () => {
  // For register and login
  const {
    loading: authLoading,
    error: authError,
    data: authData,
    handleApiRequest: handleAuthApiRequest,
  } = useApiState<RegisterAndLoginUserResponse>();

  // For getting user by token
  const {
    loading: tokenLoading,
    error: tokenError,
    data: tokenData,
    handleApiRequest: handleTokenApiRequest,
  } = useApiState<getUserByTokenResponse>();

  const registerUser = (
    credentials: RegisterUserRequest
  ): Promise<RegisterAndLoginUserResponse> => {
    return handleAuthApiRequest(async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };

      return await fetchData<RegisterAndLoginUserResponse>(
        import.meta.env.VITE_TIETOVISA_API + "/auth/register",
        options
      );
    });
  };

  const loginUser = (
    credentials: LoginUserRequest
  ): Promise<RegisterAndLoginUserResponse> => {
    return handleAuthApiRequest(async () => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };

      return await fetchData<RegisterAndLoginUserResponse>(
        import.meta.env.VITE_TIETOVISA_API + "/auth/login",
        options
      );
    });
  };

  const getUserByToken = (token: string): Promise<getUserByTokenResponse> => {
    return handleTokenApiRequest(async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch user by token
      return await fetchData<getUserByTokenResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/auth/me`,
        options
      );
    });
  };

  return {
    registerUser,
    loginUser,
    getUserByToken,
    authLoading,
    authError,
    authData,
    tokenLoading,
    tokenError,
    tokenData,
  };
};

export { useUser, useApiState };
