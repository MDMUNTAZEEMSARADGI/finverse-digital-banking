import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", balance: 120000 },
  { month: "Feb", balance: 145000 },
  { month: "Mar", balance: 132000 },
  { month: "Apr", balance: 168000 },
  { month: "May", balance: 190000 },
  { month: "Jun", balance: 245870 },
];

const BalanceChart = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        Balance Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;