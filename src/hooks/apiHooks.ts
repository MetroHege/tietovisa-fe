import fetchData from "@/lib/fetchData";
import {
  RegisterAndLoginUserResponse,
  RegisterUserRequest,
  LoginUserRequest,
  getUserByTokenResponse,
  ModifyUserRequest,
  ModifyUserResponse,
  UserWithNoPassword,
  UsersResponse,
  UsersCountResponse,
  User,
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
  const {
    loading: authLoading,
    error: authError,
    data: authData,
    handleApiRequest: handleAuthApiRequest,
  } = useApiState<RegisterAndLoginUserResponse>();

  const {
    loading: tokenLoading,
    error: tokenError,
    data: tokenData,
    handleApiRequest: handleTokenApiRequest,
  } = useApiState<UserWithNoPassword>();

  const {
    loading: modifyLoading,
    error: modifyError,
    data: modifyData,
    handleApiRequest: handleModifyApiRequest,
  } = useApiState<ModifyUserResponse>();

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    handleApiRequest: handleUsersApiRequest,
  } = useApiState<UsersResponse>();

  const {
    loading: usersCountLoading,
    error: usersCountError,
    data: usersCountData,
    handleApiRequest: handleUsersCountApiRequest,
  } = useApiState<UsersCountResponse>();

  const {
    loading: userLoading,
    error: userError,
    data: userData,
    handleApiRequest: handleUserApiRequest,
  } = useApiState<User>();



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

  const getUserByToken = (token: string): Promise<UserWithNoPassword> => {
    return handleTokenApiRequest(async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetchData<getUserByTokenResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/auth/me`,
        options
      );

      return response.user;
    });
  };

  const modifyUser = (
    userId: string,
    updates: ModifyUserRequest
  ): Promise<ModifyUserResponse> => {
    return handleModifyApiRequest(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      };

      return await fetchData<ModifyUserResponse>(
        `${import.meta.env.VITE_TIETOVISA_API}/auth/user/${userId}`,
        options
      );
    });
  };

  const getUsers = (): Promise<UsersResponse> => {
    return handleUsersApiRequest(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return await fetchData<UsersResponse>(
        import.meta.env.VITE_TIETOVISA_API + "/auth",
        options
      );
    });
  };

  const getUsersCount = (): Promise<UsersCountResponse> => {
    return handleUsersCountApiRequest(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return await fetchData<UsersCountResponse>(
        import.meta.env.VITE_TIETOVISA_API + "/auth/count",
        options
      );
    });
  };

  const getUserById = (userId: string): Promise<User> => {
    return handleUserApiRequest(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return await fetchData<User>(
        import.meta.env.VITE_TIETOVISA_API + "/auth/user/" + userId,
        options
      );
    });
  };

  const deleteUserById = (userId: string): Promise<User> => {
    return handleUserApiRequest(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found")
      }
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      return await fetchData<User>(import.meta.env.VITE_TIETOVISA_API +  '/auth/user/' + userId,
        options
      )
    })
  }

  return {
    registerUser,
    loginUser,
    authLoading,
    authError,
    authData,
    getUserByToken,
    tokenLoading,
    tokenError,
    tokenData,
    modifyUser,
    modifyLoading,
    modifyError,
    modifyData,
    getUsers,
    usersError,
    usersLoading,
    usersData,
    getUsersCount,
    usersCountLoading,
    usersCountError,
    usersCountData,
    getUserById,
    userLoading,
    userError,
    userData,
    deleteUserById
  };
};

export { useUser, useApiState };
