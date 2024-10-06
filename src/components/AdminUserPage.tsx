import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "@/types/userTypes";
import { useUser } from "@/hooks/apiHooks";

const AdminUserPage: React.FC = () => {
  const { getUsers, usersLoading, usersError, usersData } = useUser();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4 dark:bg-gray-900 my-10">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Manage Users</h2>

      {usersLoading && <p className="text-black dark:text-white">Loading...</p>}

      {usersError && <p className="text-red-500">{usersError}</p>}

      {usersData && usersData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-600 text-black dark:text-white font-medium rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link
                      to={`/dashboard/edit-user/${user._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!usersLoading && usersData && usersData.length === 0 && (
        <p className="text-black dark:text-gray-300">No users found.</p>
      )}
    </div>
  );
};

export default AdminUserPage;
