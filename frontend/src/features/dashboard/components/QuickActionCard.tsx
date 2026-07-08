import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  to,
  color,
}: QuickActionCardProps) => {
  return (
    <Link
      to={to}
      className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="text-white" size={28} />
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </Link>
  );
};

export default QuickActionCard;