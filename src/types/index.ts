export type ProjectStatus =
  | "active"
  | "completed"
  | "on_hold"
  | "at_risk"
  | "critical"
  | "archived";
export type HealthStatus = "healthy" | "at_risk" | "critical";
export type ExpenseStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "changes_requested";
export type TaskStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "critical";
export type UpdateStatus = "draft" | "submitted" | "approved" | "rejected";
export type UserRole = "admin" | "project_manager";

export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  status: "active" | "inactive";
  assigned_projects: number;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  project_count: number;
}

export interface Project {
  id: string;
  project_code: string;
  name: string;
  description: string;
  category: string;
  location: Location;
  manager: User;
  cover_image_url?: string;
  start_date: string;
  expected_end_date: string;
  budget: number;
  currency: string;
  spent: number;
  progress: number;
  status: ProjectStatus;
  health_status: HealthStatus;
  task_count: number;
  completed_tasks: number;
  pending_approvals: number;
}

export interface Milestone {
  id: string;
  project_id: string;
  name: string;
  status: "planned" | "in_progress" | "completed" | "on_hold";
  progress: number;
  target_date: string;
  task_count: number;
  completed_tasks: number;
}

export interface Task {
  id: string;
  project_id: string;
  milestone_id?: string;
  name: string;
  assignee: User;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  due_date: string;
  milestone_name?: string;
}

export interface Expense {
  id: string;
  project_id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  expense_date: string;
  vendor_name?: string;
  submitted_by: User;
  status: ExpenseStatus;
  receipt_url?: string;
}

export interface Evidence {
  id: string;
  project_id: string;
  task_name?: string;
  milestone_name?: string;
  file_url: string;
  caption?: string;
  uploaded_by: User;
  created_at: string;
  mime_type: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  submitted_by: User;
  progress: number;
  summary: string;
  accomplishments?: string;
  issues?: string;
  next_steps?: string;
  status: UpdateStatus;
  created_at: string;
  evidence_count: number;
}

export interface ActivityLog {
  id: string;
  actor: User;
  action: string;
  entity_type: string;
  entity_name: string;
  project_name?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read_at?: string;
  created_at: string;
  entity_type?: string;
}
