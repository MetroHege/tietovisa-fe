// Dashboard.js
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState("/dashboard");

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPath = e.target.value;
    setSelectedRoute(selectedPath);
    navigate(selectedPath);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-1/5 bg-gray-200 dark:bg-gray-800 p-4 space-y-4">
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "p-2 bg-blue-500 text-white rounded-md"
                : "p-2 text-black dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            }
          >
            Koti
          </NavLink>
          <NavLink
            to="/dashboard/quiz"
            className={({ isActive }) =>
              isActive
                ? "p-2 bg-blue-500 text-white rounded-md"
                : "p-2 text-black dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            }
          >
            Tietovisat
          </NavLink>
          <NavLink
            to="/dashboard/question"
            className={({ isActive }) =>
              isActive
                ? "p-2 bg-blue-500 text-white rounded-md"
                : "p-2 text-black dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            }
          >
            Kysymykset
          </NavLink>
          <NavLink
            to="/dashboard/upload-csv"
            className={({ isActive }) =>
              isActive
                ? "p-2 bg-blue-500 text-white rounded-md"
                : "p-2 text-black dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            }
          >
            Lataa CSV
          </NavLink>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              isActive
                ? "p-2 bg-blue-500 text-white rounded-md"
                : "p-2 text-black dark:text-white hover:bg-blue-500 hover:text-white rounded-md"
            }
          >
            Käyttäjät
          </NavLink>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800 md:hidden">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>
          {/* Dropdown Menu */}
          <select
            value={selectedRoute}
            onChange={handleDropdownChange}
            className="p-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md"
          >
            <option value="/dashboard">Koti</option>
            <option value="/dashboard/quiz">Tietovisat</option>
            <option value="/dashboard/question">Kysymykset</option>
            <option value="/dashboard/upload-csv">Lataa CSV</option>
            <option value="/dashboard/users">Käyttäjät</option>
          </select>
        </header>

        {/* Main content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
