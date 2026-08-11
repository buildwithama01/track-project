import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";
import type { Project } from "../../types";
import { formatCurrency, formatDate } from "../../lib/utils";

interface ProjectCardProps {
  project: Project & {
    totalBudget?: number;
    approvedSpending?: number;
    updateApprovalRequired?: boolean;
    expenseApprovalRequired?: boolean;
    coverImage?: string;
    expectedCompletion?: string;
    health?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const spent = project.spent ?? project.approvedSpending ?? 0;
  const budget = project.budget ?? project.totalBudget ?? 0;
  const pendingApprovals =
    project.pending_approvals ??
    (project.updateApprovalRequired || project.expenseApprovalRequired ? 1 : 0);
  const managerName = project.manager.full_name ?? "Unknown";
  const healthStatus =
    project.health_status ??
    (project.health === "Healthy"
      ? "healthy"
      : project.health === "At Risk"
      ? "at_risk"
      : project.health === "Critical"
      ? "critical"
      : "healthy");
  const coverImage = project.cover_image_url ?? project.coverImage;
  const expectedEndDate = project.expected_end_date ?? project.expectedCompletion;

  return (
    <div className="project-card">
      <div className="project-card__cover">
        {coverImage ? (
          <img
            src={coverImage}
            alt={project.name}
            className="project-card__image"
          />
        ) : (
          <div className="project-card__cover-fallback" />
        )}
        <div className="project-card__cover-badge">
          <Badge status={healthStatus} label={healthStatus} />
        </div>
        <div
          className="project-card__health-dot"
          style={{
            backgroundColor:
              healthStatus === "healthy"
                ? "var(--secondary)"
                : healthStatus === "at_risk"
                  ? "var(--primary)"
                  : "var(--accent)",
          }}
        />
      </div>
      <div className="project-card__body">
        <h3>{project.name}</h3>
        <p className="project-card__meta">
          {project.location.city}, {project.location.state} ·{" "}
          {managerName}
        </p>
        <div className="project-card__progress-row">
          <ProgressBar value={project.progress} size="sm" />
          <span>{project.progress}%</span>
        </div>
        <div className="project-card__budget-row">
          <div>
            <p className="project-card__budget-label">Spent</p>
            <p className="project-card__budget-value">
              {formatCurrency(spent)}
            </p>
          </div>
          <div>
            <p className="project-card__budget-label">Budget</p>
            <p className="project-card__budget-value">
              {formatCurrency(budget)}
            </p>
          </div>
        </div>
        <div className="project-card__footer">
          <span>{formatDate(expectedEndDate)}</span>
          <span>{pendingApprovals} approvals</span>
        </div>
      </div>
    </div>
  );
}
