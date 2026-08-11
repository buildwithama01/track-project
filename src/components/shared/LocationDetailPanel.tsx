import { useState } from "react";
import {
  X,
  MapPin,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ChevronRight,
} from "lucide-react";
import type { LocationItem } from "../../data/mockdata";
import { MOCK_PROJECTS } from "../../data/mockdata";
import { formatCurrency } from "../../lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

interface LocationDetailPanelProps {
  location: LocationItem;
  onClose: () => void;
}

const healthColor = (h: number, total: number) =>
  total === 0 ? 0 : Math.round((h / total) * 100);

export default function LocationDetailPanel({ location, onClose }: LocationDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "projects">("overview");

  // Get all projects belonging to this location (match by state)
  const locationProjects = MOCK_PROJECTS.filter(
    (p) => p.location.state === location.state || p.location.city === location.city
  );

  const totalBudget = locationProjects.reduce((s, p) => s + p.totalBudget, 0);
  const totalSpent = locationProjects.reduce((s, p) => s + p.approvedSpending, 0);
  const totalPending = locationProjects.reduce((s, p) => s + p.pendingExpenses, 0);
  const spentPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const healthTotal =
    location.healthBreakdown.healthy +
    location.healthBreakdown.atRisk +
    location.healthBreakdown.critical;

  const budgetChartData = locationProjects.map((p) => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    Budget: p.totalBudget,
    Spent: p.approvedSpending,
  }));

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Activity },
    { id: "projects" as const, label: "Projects", icon: Building2, count: locationProjects.length },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
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
          width: "min(600px, 100vw)",
          background: "rgba(12,12,22,0.97)",
          borderLeft: "1px solid var(--border-light)",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 100%)",
            borderBottom: "1px solid var(--border-light)",
            padding: "40px 28px 28px",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Icon + title */}
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                boxShadow: "0 0 24px rgba(139,92,246,0.4)",
              }}
            >
              <MapPin size={28} color="white" />
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px", marginBottom: "4px", textTransform: "uppercase" }}>
                {location.country}
              </p>
              <h2 style={{ fontSize: "26px", margin: 0, letterSpacing: "-0.02em" }}>{location.state}</h2>
              <p style={{ color: "var(--text-secondary)", margin: "4px 0 0", fontSize: "14px" }}>{location.city}</p>
            </div>
          </div>

          {/* Quick stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "28px" }}>
            {[
              { label: "Total Projects", value: location.projectCount, icon: Building2 },
              { label: "Active", value: location.activeProjects, icon: Activity },
              { label: "Total Budget", value: formatCurrency(location.totalBudget), icon: DollarSign },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "10px", color: "var(--text-tertiary)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{s.label}</p>
                <p style={{ fontSize: "20px", fontWeight: 700 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginTop: "28px", borderBottom: "1px solid var(--border-light)" }}>
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
                      background: activeTab === tab.id ? "var(--accent-primary)" : "rgba(255,255,255,0.1)",
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
        <div style={{ padding: "28px", flex: 1 }}>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

              {/* Health Breakdown */}
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Health Breakdown</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {[
                    { label: "Healthy", value: location.healthBreakdown.healthy, color: "var(--success)", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
                    { label: "At Risk", value: location.healthBreakdown.atRisk, color: "var(--warning)", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
                    { label: "Critical", value: location.healthBreakdown.critical, color: "var(--danger)", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "20px",
                        borderRadius: "14px",
                        background: item.bg,
                        border: `1px solid ${item.border}`,
                        textAlign: "center",
                      }}
                    >
                      <p style={{ fontSize: "36px", fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.value}</p>
                      <p style={{ fontSize: "12px", color: item.color, marginTop: "8px", fontWeight: 600 }}>{item.label}</p>
                      <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                        {healthColor(item.value, healthTotal)}% of total
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Summary */}
              <div>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Financial Summary</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { label: "Total Budget", value: totalBudget, color: "var(--text-primary)" },
                    { label: "Total Spent", value: totalSpent, color: spentPct > 90 ? "var(--danger)" : spentPct > 70 ? "var(--warning)" : "var(--success)" },
                    { label: "Pending Expenses", value: totalPending, color: "var(--warning)" },
                    { label: "Remaining", value: totalBudget - totalSpent, color: "var(--success)" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "10px",
                      }}
                    >
                      <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{item.label}</span>
                      <span style={{ fontWeight: 700, color: item.color, fontSize: "16px" }}>{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>

                {/* Budget utilization bar */}
                <div style={{ marginTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Budget Utilization</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: spentPct > 90 ? "var(--danger)" : spentPct > 70 ? "var(--warning)" : "var(--success)" }}>{spentPct}%</span>
                  </div>
                  <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${spentPct}%`,
                        background: spentPct > 90 ? "var(--danger)" : spentPct > 70 ? "var(--warning)" : "linear-gradient(to right, var(--accent-primary), var(--accent-secondary))",
                        borderRadius: "999px",
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Budget Chart */}
              {budgetChartData.length > 0 && (
                <div>
                  <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Budget vs Spent per Project</p>
                  <div style={{ borderRadius: "14px", padding: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-light)" }}>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={budgetChartData} barGap={4} barCategoryGap="35%">
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                        />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(12,12,22,0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            color: "#fff",
                          }}
                          formatter={(value) => formatCurrency(value as number)}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
                        <Bar dataKey="Budget" fill="rgba(139,92,246,0.3)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Spent" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {locationProjects.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", color: "var(--text-tertiary)", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px dashed var(--border-strong)" }}>
                  <Building2 size={28} style={{ marginBottom: "8px", opacity: 0.4 }} />
                  <p>No projects found for this location</p>
                </div>
              )}
              {locationProjects.map((project) => {
                const spentPct = Math.min(100, Math.round((project.approvedSpending / project.totalBudget) * 100));
                const healthCol =
                  project.health === "Healthy" ? "var(--success)"
                    : project.health === "At Risk" ? "var(--warning)"
                      : "var(--danger)";
                return (
                  <div
                    key={project.id}
                    style={{
                      borderRadius: "14px",
                      border: "1px solid var(--border-light)",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.02)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {/* Cover strip */}
                    {project.coverImage && (
                      <div style={{ height: "100px", overflow: "hidden", position: "relative" }}>
                        <img src={project.coverImage} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,12,22,0.9), transparent)" }} />
                        <div style={{ position: "absolute", bottom: "10px", left: "14px", display: "flex", gap: "6px" }}>
                          <span style={{ padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: "rgba(0,0,0,0.6)", color: healthCol, border: `1px solid ${healthCol}` }}>
                            {project.health}
                          </span>
                          <span style={{ padding: "2px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div>
                          <p style={{ fontSize: "11px", color: "var(--accent-secondary)", marginBottom: "4px", fontWeight: 700 }}>{project.code}</p>
                          <h4 style={{ margin: 0, fontSize: "16px" }}>{project.name}</h4>
                        </div>
                        <ChevronRight size={16} color="var(--text-tertiary)" />
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "14px" }}>{project.category}</p>

                      {/* Progress */}
                      <div style={{ marginBottom: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Progress</span>
                          <span style={{ fontSize: "12px", fontWeight: 700 }}>{project.progress}%</span>
                        </div>
                        <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${project.progress}%`, background: "linear-gradient(to right, #8b5cf6, #3b82f6)", borderRadius: "999px" }} />
                        </div>
                      </div>

                      {/* Budget */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", fontSize: "13px" }}>
                        <div>
                          <p style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>Budget</p>
                          <p style={{ fontWeight: 600 }}>{formatCurrency(project.totalBudget)}</p>
                        </div>
                        <div>
                          <p style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>Spent</p>
                          <p style={{ fontWeight: 600, color: spentPct > 90 ? "var(--danger)" : "var(--text-primary)" }}>{formatCurrency(project.approvedSpending)}</p>
                        </div>
                        <div>
                          <p style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>Manager</p>
                          <p style={{ fontWeight: 600, fontSize: "11px" }}>{project.manager.name.split(" ")[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
