import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
}

export default function KPICard({ title, value, icon: Icon, subtitle }: KPICardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#1E293B] p-6 shadow-lg">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="rounded-lg bg-[#D4AF37]/10 p-3">
          <Icon className="h-6 w-6 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}
