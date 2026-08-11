import type { ReactNode } from "react";


interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  label,
  value,
  change,
  changeType,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div
        className="stat-card__icon"
        style={{ backgroundColor: color ?? "var(--primary-light)" }}
      >
        {icon}
      </div>
      <div>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
      {change ? (
        <span
          className={`stat-card__chip stat-card__chip--${changeType ?? "up"}`}
        >
          {changeType === "up" ? "▲" : "▼"} {change}
        </span>
      ) : null}
    </div>
  );
}
