import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import type {
  HealthStatus,
  TaskPriority,
  TaskStatus,
  ExpenseStatus,
  ProjectStatus,
  UpdateStatus,
} from "../types";

export const formatCurrency = (
  amount: number | null | undefined,
  currency = "NGN",
): string => {
  const symbol = currency === "NGN" ? "₦" : currency === "USD" ? "$" : currency;
  const value = amount ?? 0;
  return `${symbol}${value.toLocaleString("en-NG")}`;
};

export const formatDate = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), "d MMM yyyy");
  } catch {
    return dateStr;
  }
};

export const formatRelativeTime = (dateStr: string): string => {
  try {
    return formatDistanceToNowStrict(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
};

export const getHealthColor = (status: HealthStatus): string => {
  switch (status) {
    case "healthy":
      return "var(--secondary)";
    case "at_risk":
      return "var(--primary)";
    case "critical":
      return "var(--accent)";
    default:
      return "var(--muted-foreground)";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "healthy":
    case "active":
    case "approved":
    case "completed":
      return "var(--secondary)";
    case "at_risk":
    case "pending":
    case "in_progress":
    case "submitted":
      return "var(--primary)";
    case "critical":
    case "rejected":
    case "blocked":
      return "var(--accent)";
    case "on_hold":
    case "changes_requested":
      return "var(--warning)";
    default:
      return "var(--muted-foreground)";
  }
};

export const getStatusLabel = (status: string): string => {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const calcBudgetUtilization = (
  spent: number,
  budget: number,
): number => {
  return Math.min(100, Math.round((spent / budget) * 100));
};

export const calcRemainingBudget = (budget: number, spent: number): number => {
  return Math.max(0, budget - spent);
};

export const normalizePriority = (priority: TaskPriority | string) => {
  return priority.replace(/_/g, " ");
};

export const normalizeStatus = (
  status: TaskStatus | ExpenseStatus | ProjectStatus | UpdateStatus | string,
) => {
  return status.replace(/_/g, " ");
};
