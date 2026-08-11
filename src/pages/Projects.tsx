import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import ProjectCard from "../components/shared/ProjectCard";
import ProjectDetailPanel from "../components/shared/ProjectDetailPanel";
import { MOCK_PROJECTS as projects } from "../data/mockdata";
import type { Project } from "../data/mockdata";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Track all active workstreams</h1>
        </div>
        <div className="page-hero__actions">
          <button className="button button--primary">+ Create Project</button>
        </div>
      </section>

      <div className="table-card">
        <div className="table-card__header">
          <div>
            <h2>Project list and grid views</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
              Click any project to view full details, tasks, and expenses.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="button button--outline">
              <List size={16} /> List
            </button>
            <button className="button button--primary">
              <LayoutGrid size={16} /> Grid
            </button>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project: any) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{ display: "contents" }}
            >
              <ProjectCard project={project as any} />
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
