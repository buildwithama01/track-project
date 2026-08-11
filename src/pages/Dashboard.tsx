import { useState } from "react";
import { FileText, Layers, ShieldCheck, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar as ReBar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import StatCard from "../components/ui/StatCard";
import ProjectCard from "../components/shared/ProjectCard";
import ProjectDetailPanel from "../components/shared/ProjectDetailPanel";
import {
  MOCK_PROJECTS as projects,
  MOCK_CASH_FLOW_DATA as financialChartData,
} from "../data/mockdata";
import { formatCurrency } from "../lib/utils";
import type { Project } from "../data/mockdata";

const dashboardStats = {
  total_projects: projects.length,
  active_projects: projects.filter((project) => project.status === "Active")
    .length,
  total_budget: projects.reduce(
    (sum, project) => sum + (project.totalBudget ?? 0),
    0,
  ),
  total_spent: projects.reduce(
    (sum, project) => sum + (project.approvedSpending ?? 0),
    0,
  ),
  pending_approvals: projects.reduce(
    (count, project) =>
      count +
      (project.updateApprovalRequired || project.expenseApprovalRequired
        ? 1
        : 0),
    0,
  ),
  overdue_tasks: 2,
};

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="page-content">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Project performance at a glance</h1>
          <p className="page-hero__subtitle">
            Here is the summary of your projects
          </p>
        </div>
        <div className="page-hero__actions">
          <button className="button button--ghost">This Month ▾</button>
          <button className="button button--outline">Filter</button>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard
          label="Total Projects"
          value={dashboardStats.total_projects.toString()}
          icon={<TrendingUp size={20} />}
          color="var(--primary-light)"
        />
        <StatCard
          label="Active Projects"
          value={dashboardStats.active_projects.toString()}
          icon={<Layers size={20} />}
          color="var(--secondary-light)"
        />
        <StatCard
          label="Total Budget"
          value={formatCurrency(dashboardStats.total_budget)}
          icon={<ShieldCheck size={20} />}
          color="var(--secondary-light)"
        />
        <StatCard
          label="Total Spent"
          value={formatCurrency(dashboardStats.total_spent)}
          icon={<FileText size={20} />}
          color="var(--primary-light)"
        />
      </section>

      <section className="health-row">
        <div className="health-card health-card--healthy">
          <p className="health-card__label">Healthy</p>
          <p className="health-card__value">5</p>
        </div>
        <div className="health-card health-card--at-risk">
          <p className="health-card__label">At Risk</p>
          <p className="health-card__value">2</p>
        </div>
        <div className="health-card health-card--critical">
          <p className="health-card__label">Critical</p>
          <p className="health-card__value">1</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card dashboard-card--chart">
          <div className="dashboard-card__header">
            <div>
              <p className="eyebrow">Spending overview</p>
              <h2>Monthly spend vs budget</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={financialChartData} barGap={4} barCategoryGap="35%">
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "rgba(12,12,22,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
                labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }} />
              <ReBar
                dataKey="budgetCap"
                name="Budget Cap"
                fill="rgba(139,92,246,0.25)"
                radius={[4, 4, 0, 0]}
              />
              <ReBar
                dataKey="cashflow"
                name="Cash Flow"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
              <ReBar
                dataKey="inflow"
                name="Inflow"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card dashboard-card--attention">
          <p className="eyebrow">Attention</p>
          <ul className="attention-list">
            <li>
              <span>Pending approvals</span>
              <strong>{dashboardStats.pending_approvals}</strong>
            </li>
            <li>
              <span>Overdue tasks</span>
              <strong>{dashboardStats.overdue_tasks}</strong>
            </li>
            <li>
              <span>Budget warnings</span>
              <strong>2</strong>
            </li>
            <li>
              <span>No recent update</span>
              <strong>1</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="table-card">
        <div className="table-card__header">
          <div>
            <p className="eyebrow">Active Projects</p>
            <h2>Current project pipeline</h2>
          </div>
          <button className="button button--outline">View All</button>
        </div>
        <div className="project-grid">
          {projects.slice(0, 5).map((project: any) => (
            <div key={project.id} onClick={() => setSelectedProject(project)} style={{ display: "contents" }}>
              <ProjectCard project={project as any} />
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
