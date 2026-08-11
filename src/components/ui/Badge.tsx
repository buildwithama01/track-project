import { normalizeStatus } from "../../lib/utils";

interface BadgeProps {
  status: string;
  label?: string;
}

const badgeMap: Record<string, { bg: string; color: string }> = {
  healthy: { bg: "var(--secondary-light)", color: "var(--secondary)" },
  active: { bg: "var(--secondary-light)", color: "var(--secondary)" },
  approved: { bg: "var(--secondary-light)", color: "var(--secondary)" },
  completed: { bg: "var(--secondary-light)", color: "var(--secondary)" },
  at_risk: { bg: "var(--primary-light)", color: "var(--primary)" },
  pending: { bg: "var(--primary-light)", color: "var(--primary)" },
  in_progress: { bg: "var(--primary-light)", color: "var(--primary)" },
  submitted: { bg: "var(--primary-light)", color: "var(--primary)" },
  critical: { bg: "var(--accent-light)", color: "var(--accent)" },
  rejected: { bg: "var(--accent-light)", color: "var(--accent)" },
  blocked: { bg: "var(--accent-light)", color: "var(--accent)" },
  on_hold: { bg: "var(--warning-light)", color: "var(--warning)" },
  changes_requested: { bg: "var(--warning-light)", color: "var(--warning)" },
  archived: { bg: "var(--muted)", color: "var(--muted-foreground)" },
};

export default function Badge({ status, label }: BadgeProps) {
  const normalized = status as keyof typeof badgeMap;
  const style = badgeMap[normalized] ?? {
    bg: "var(--muted)",
    color: "var(--muted-foreground)",
  };
  return (
    <span
      className="badge"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {label ?? normalizeStatus(status)}
    </span>
  );
}
