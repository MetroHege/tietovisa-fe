// src/components/AdminUserEditPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ModifyUserRequest, User } from "@/types/userTypes";
import { useUser } from "@/hooks/apiHooks";

const AdminUserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, modifyUser, userLoading, userError, deleteUserById } = useUser();
  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const getUserInformation = async (id: string) => {
    if (!id) {
      return
    }
    const user = await getUserById(id)
    setFormData(user)
  }

  const deleteUser = async (id: string) => {
    if (!id) {
      return
    }
    await deleteUserById(id)
  }

  useEffect(() => {
    if (id) {
      getUserInformation(id)
    }
  }, [id])



  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id)
      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error deleting user ", error)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const updates: ModifyUserRequest = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
        // Add more fields as necessary

      };

      await modifyUser(id!, updates);
      alert("User updated successfully!");
      navigate("/dashboard/users");
    } catch (err: any) {
      setError(err.message || "Error updating user.");
    }
  };

  if (userLoading || !formData) {
    return <p className="text-black dark:text-white">Loading user data...</p>;
  }

  if (userError || error) {
    return <p className="text-red-500">{userError || error}</p>;
  }

  return (
    id && (
      <div className="p-4 dark:bg-gray-900 my-10">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData?.username || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role:
            </label>
            <select
              name="role"
              value={formData?.role || "user"}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none"
            >
              Update User
            </button>
            <div className="flex-1 flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteUser(id)}
                className="py-2 px-4 bg-red-600 text-white rounded-md focus:outline-none ml-auto"
              >
                Delete User
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  );
};

export default AdminUserEditPage;
