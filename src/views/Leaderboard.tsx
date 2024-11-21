import { useUserContext } from "@/hooks/contextHooks";
import useResult from "@/hooks/resultHooks";
import { LeaderboardResponse } from "@/types/resultTypes";
import { useEffect, useState } from "react";


const Leaderboard = () => {
  const {
    getAllTimeTopUsers,
    getDailyTopUsers,
    getWeeklyTopUsers,
    allTimeTopLoading,
    allTimeTopError,
    dailyTopLoading,
    dailyTopError,
    weeklyTopLoading,
    weeklyTopError,
  } = useResult();

  const { user } = useUserContext();

  const [allTime, setAllTime] = useState<LeaderboardResponse[]>([]);
  const [weekly, setWeekly] = useState<LeaderboardResponse[]>([]);
  const [daily, setDaily] = useState<LeaderboardResponse[]>([]);

  const fetchLeaderboardData = async () => {
    try {
      const allTimeData = await getAllTimeTopUsers();
      setAllTime(allTimeData);

      const dailyData = await getDailyTopUsers();
      setDaily(dailyData);

      const weeklyData = await getWeeklyTopUsers();
      setWeekly(weeklyData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md my-5">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Leaderboard</h1>

      {/* All-Time Top Users */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">All-Time Top Users</h2>
        {allTimeTopLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : allTime.length > 0 ? (
          <ul className="space-y-2">
            {allTime.map((entry) => (
              <li
                key={entry._id}
                className={`flex justify-between items-center p-3 rounded-md shadow-sm hover:shadow-md transition-shadow text-sm ${
                  entry.username === user?.username
                    ? "bg-blue-100 dark:bg-blue-700"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <span className="font-medium text-gray-800 dark:text-gray-100">{entry.username}</span>
                <span className="text-gray-500 dark:text-gray-400">{entry.totalPoints} points</span>
              </li>
            ))}
          </ul>
        ) : allTimeTopError ? (
          <p className="text-center text-red-600 dark:text-red-400">Error loading all-time top users</p>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No data available</p>
        )}
      </section>

      {/* Daily Top Users */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Daily Top Users</h2>
        {dailyTopLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : daily.length > 0 ? (
          <ul className="space-y-2">
            {daily.map((entry) => (
              <li
                key={entry._id}
                className={`flex justify-between items-center p-3 rounded-md shadow-sm hover:shadow-md transition-shadow text-sm ${
                  entry.username === user?.username
                    ? "bg-blue-100 dark:bg-blue-700"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <span className="font-medium text-gray-800 dark:text-gray-100">{entry.username}</span>
                <span className="text-gray-500 dark:text-gray-400">{entry.totalPoints} points</span>
              </li>
            ))}
          </ul>
        ) : dailyTopError ? (
          <p className="text-center text-red-600 dark:text-red-400">Error loading daily top users</p>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No data available</p>
        )}
      </section>

      {/* Weekly Top Users */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Weekly Top Users</h2>
        {weeklyTopLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : weekly.length > 0 ? (
          <ul className="space-y-2">
            {weekly.map((entry) => (
              <li
                key={entry._id}
                className={`flex justify-between items-center p-3 rounded-md shadow-sm hover:shadow-md transition-shadow text-sm ${
                  entry.username === user?.username
                    ? "bg-blue-100 dark:bg-blue-700"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <span className="font-medium text-gray-800 dark:text-gray-100">{entry.username}</span>
                <span className="text-gray-500 dark:text-gray-400">{entry.totalPoints} points</span>
              </li>
            ))}
          </ul>
        ) : weeklyTopError ? (
          <p className="text-center text-red-600 dark:text-red-400">Error loading weekly top users</p>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No data available</p>
        )}
      </section>
    </div>
  );
};

export default Leaderboard;
