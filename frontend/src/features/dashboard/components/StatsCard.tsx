import type { StatsCardProps } from "../types/dashboard.types";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
  change,
}: StatsCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>

          {change && (
            <p className="mt-3 text-sm font-medium text-green-600">{change}</p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
