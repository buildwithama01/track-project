interface ProgressBarProps {
  value: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  color,
  size = "md",
  showLabel = false,
}: ProgressBarProps) {
  const height = size === "sm" ? 4 : size === "lg" ? 8 : 6;
  const fillColor =
    (color ?? value > 80)
      ? "var(--secondary)"
      : value < 30
        ? "var(--warning)"
        : "var(--primary)";

  return (
    <div className="progress-bar">
      {showLabel ? <span className="progress-bar__label">{value}%</span> : null}
      <div className="progress-bar__track" style={{ height: `${height}px` }}>
        <div
          className="progress-bar__fill"
          style={{ width: `${value}%`, backgroundColor: fillColor }}
        />
      </div>
    </div>
  );
}
