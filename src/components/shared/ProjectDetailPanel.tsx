import { useState } from "react";
import {
  X,
  MapPin,
  Calendar,
  User,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  BarChart2,
} from "lucide-react";
import type { Project } from "../../data/mockdata";
import {
  MOCK_MILESTONES,
  MOCK_TASKS,
  MOCK_EXPENSES,
} from "../../data/mockdata";
import { formatCurrency, formatDate } from "../../lib/utils";

interface ProjectDetailPanelProps {
  project: Project;
  onClose: () => void;
}

const healthColor = (health: string) => {
  if (health === "Healthy") return "var(--success)";
  if (health === "At Risk") return "var(--warning)";
  return "var(--danger)";
};

const statusColor = (status: string) => {
  if (status === "Completed" || status === "Approved") return "var(--success)";
  if (status === "In Progress" || status === "Pending") return "var(--warning)";
  if (status === "Blocked" || status === "Overdue" || status === "Critical") return "var(--danger)";
  return "var(--text-secondary)";
};

export default function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "expenses">("overview");

  const milestones = MOCK_MILESTONES.filter((m) => m.projectId === project.id);
  const tasks = MOCK_TASKS.filter((t) => t.projectId === project.id);
  const expenses = MOCK_EXPENSES.filter((e) => e.projectId === project.id);

  const budgetUsed = project.approvedSpending ?? 0;
  const budgetTotal = project.totalBudget ?? 1;
  const budgetPct = Math.min(100, Math.round((budgetUsed / budgetTotal) * 100));
  const budgetColor =
    budgetPct > 90 ? "var(--danger)" : budgetPct > 70 ? "var(--warning)" : "var(--success)";

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart2 },
    { id: "tasks" as const, label: "Tasks", icon: CheckCircle2, count: tasks.length },
    { id: "expenses" as const, label: "Expenses", icon: DollarSign, count: expenses.length },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(640px, 100vw)",
          background: "rgba(12, 12, 22, 0.97)",
          borderLeft: "1px solid var(--border-light)",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Cover Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--bg-tertiary)" }} />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12,12,22,1) 0%, rgba(12,12,22,0.3) 60%, transparent 100%)",
            }}
          />
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
          {/* Health badge */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "24px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${healthColor(project.health)}`,
                color: healthColor(project.health),
              }}
            >
              {project.health}
            </span>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "24px 28px 0", flexShrink: 0 }}>
          <p style={{ fontSize: "12px", color: "var(--accent-secondary)", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>
            {project.code}
          </p>
          <h2 style={{ fontSize: "24px", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            {project.name}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
            {project.description}
          </p>

          {/* Meta chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "var(--text-secondary)", fontSize: "13px" }}>
              <MapPin size={14} color="var(--accent-secondary)" />
              {project.location.city}, {project.location.state}
            </div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "var(--text-secondary)", fontSize: "13px" }}>
              <Calendar size={14} color="var(--accent-secondary)" />
              {formatDate(project.startDate)} → {formatDate(project.expectedCompletion)}
            </div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", color: "var(--text-secondary)", fontSize: "13px" }}>
              <User size={14} color="var(--accent-secondary)" />
              {project.manager.name}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Overall Progress</span>
              <span style={{ fontSize: "13px", fontWeight: 700 }}>{project.progress}%</span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${project.progress}%`,
                  background: "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
                  borderRadius: "999px",
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>

          {/* Budget stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              marginTop: "20px",
              padding: "16px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
            }}
          >
            {[
              { label: "Total Budget", value: formatCurrency(project.totalBudget), color: "var(--text-primary)" },
              { label: "Spent", value: formatCurrency(project.approvedSpending), color: budgetColor },
              { label: "Remaining", value: formatCurrency((project.totalBudget ?? 0) - (project.approvedSpending ?? 0)), color: "var(--success)" },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px" }}>{item.label}</p>
                <p style={{ fontSize: "16px", fontWeight: 700, color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Budget utilization bar */}
          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Budget Utilization</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: budgetColor }}>{budgetPct}%</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${budgetPct}%`, background: budgetColor, borderRadius: "999px", transition: "width 1s ease" }} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginTop: "28px", borderBottom: "1px solid var(--border-light)", paddingBottom: "0" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderBottom: `2px solid ${activeTab === tab.id ? "var(--accent-primary)" : "transparent"}`,
                  color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-tertiary)",
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <tab.icon size={14} />
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    style={{
                      background: activeTab === tab.id ? "var(--accent-primary)" : "var(--bg-tertiary)",
                      borderRadius: "999px",
                      padding: "1px 7px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Body */}
        <div style={{ padding: "24px 28px 40px", flex: 1 }}>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Category */}
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>Category</p>
                <p style={{ fontWeight: 600 }}>{project.category}</p>
              </div>
              {/* Address */}
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>Full Address</p>
                <p style={{ color: "var(--text-secondary)" }}>{project.location.address}, {project.location.city}, {project.location.state}, {project.location.country}</p>
              </div>
              {/* Pending expenses */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <AlertTriangle size={18} color="var(--warning)" />
                  <span style={{ fontWeight: 600 }}>Pending Expense Claims</span>
                </div>
                <span style={{ fontWeight: 700, color: "var(--warning)", fontSize: "18px" }}>
                  {formatCurrency(project.pendingExpenses)}
                </span>
              </div>

              {/* Milestones */}
              {milestones.length > 0 && (
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "16px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Milestones</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {milestones.map((ms) => (
                      <div
                        key={ms.id}
                        style={{
                          padding: "16px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                          <h4 style={{ margin: 0, fontSize: "15px" }}>{ms.name}</h4>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: statusColor(ms.status) }}>{ms.status}</span>
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "12px" }}>{ms.description}</p>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "10px", color: "var(--text-tertiary)", fontSize: "12px" }}>
                          <Calendar size={12} /> {formatDate(ms.targetDate)}
                        </div>
                        <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${ms.progress}%`, background: "var(--accent-gradient)", borderRadius: "999px" }} />
                        </div>
                        <p style={{ textAlign: "right", fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>{ms.progress}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {milestones.length === 0 && (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--text-tertiary)", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px dashed var(--border-strong)" }}>
                  <TrendingUp size={24} style={{ marginBottom: "8px", opacity: 0.5 }} />
                  <p>No milestones logged yet</p>
                </div>
              )}
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === "tasks" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {tasks.length === 0 && (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--text-tertiary)", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px dashed var(--border-strong)" }}>
                  <CheckCircle2 size={24} style={{ marginBottom: "8px", opacity: 0.5 }} />
                  <p>No tasks for this project</p>
                </div>
              )}
              {tasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ margin: 0, fontSize: "15px", flex: 1, paddingRight: "12px" }}>{task.title}</h4>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background: `${statusColor(task.status)}22`,
                        color: statusColor(task.status),
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>{task.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "var(--text-tertiary)" }}>
                    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <img src={task.assignee.avatar} alt={task.assignee.name} style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                      {task.assignee.name}
                    </span>
                    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <Clock size={12} /> Due {formatDate(task.dueDate)}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        background: task.priority === "Critical" ? "rgba(239,68,68,0.12)" : task.priority === "High" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.05)",
                        color: task.priority === "Critical" ? "var(--danger)" : task.priority === "High" ? "var(--warning)" : "var(--text-secondary)",
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Progress</span>
                      <span style={{ fontSize: "12px", fontWeight: 700 }}>{task.progress}%</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${task.progress}%`,
                          background: task.status === "Blocked" || task.status === "Overdue" ? "var(--danger)" : "var(--accent-gradient)",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EXPENSES TAB */}
          {activeTab === "expenses" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {expenses.length === 0 && (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--text-tertiary)", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px dashed var(--border-strong)" }}>
                  <FileText size={24} style={{ marginBottom: "8px", opacity: 0.5 }} />
                  <p>No expenses logged for this project</p>
                </div>
              )}
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, paddingRight: "12px" }}>
                      <h4 style={{ margin: "0 0 4px", fontSize: "15px" }}>{exp.title}</h4>
                      <p style={{ color: "var(--text-tertiary)", fontSize: "12px", margin: 0 }}>{exp.vendor}</p>
                    </div>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: exp.status === "Approved" ? "var(--success)" : exp.status === "Pending" ? "var(--warning)" : "var(--danger)",
                      }}
                    >
                      {formatCurrency(exp.amount)}
                    </span>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "13px", margin: 0 }}>{exp.description}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "var(--text-tertiary)", alignItems: "center" }}>
                    <span style={{ padding: "2px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }}>{exp.category}</span>
                    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <Calendar size={12} /> {exp.dateSubmitted}
                    </span>
                    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      <img src={exp.submittedBy.avatar} alt={exp.submittedBy.name} style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                      {exp.submittedBy.name}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontWeight: 700,
                        fontSize: "11px",
                        background: exp.status === "Approved" ? "rgba(16,185,129,0.12)" : exp.status === "Pending" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                        color: exp.status === "Approved" ? "var(--success)" : exp.status === "Pending" ? "var(--warning)" : "var(--danger)",
                      }}
                    >
                      {exp.status}
                    </span>
                  </div>

                  {exp.rejectionReason && (
                    <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.2)", fontSize: "13px", color: "var(--danger)" }}>
                      <strong>Note: </strong>{exp.rejectionReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
