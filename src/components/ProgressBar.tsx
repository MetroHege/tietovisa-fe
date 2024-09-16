import React from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="relative w-full bg-gray-200 rounded p-2 mt-2">
      <div
        className="bg-green-500 h-full rounded flex items-center pl-3"
        style={{ width: `${percentage}%` }}
      >
        <span className="text-md font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
