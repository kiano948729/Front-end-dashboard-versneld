import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface MarketShareChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  "#D4AF37", // Goud
  "#22C55E", // Groen
  "#3B82F6", // Blauw
  "#8B5CF6", // Paars
  "#F59E0B", // Oranje
  "#EF4444", // Rood
  "#06B6D4", // Cyaan
  "#EC4899", // Roze
];

export default function MarketShareChart({ data }: MarketShareChartProps) {
  return (
    <div className="rounded-xl bg-[#1E293B] p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Top Market Share by Race</h3>
        <p className="text-sm text-gray-400">Distribution across Middle-earth</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#fff"
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: "20px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
