import { useState } from "react";
import { MapPin } from "lucide-react";
import { MOCK_LOCATIONS as locations } from "../data/mockdata";
import type { LocationItem } from "../data/mockdata";
import { formatCurrency } from "../lib/utils";
import LocationDetailPanel from "../components/shared/LocationDetailPanel";

export default function Locations() {
  const [selected, setSelected] = useState<LocationItem | null>(null);

  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Locations</p>
          <h1>Regional project monitoring</h1>
        </div>
      </section>

      <div className="table-card">
        <div className="table-card__header">
          <div>
            <h2>Location health and project counts</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
              Click a region card to view a detailed breakdown.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="stat-card"
              onClick={() => setSelected(loc)}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", width: "100%" }}>
                <div className="stat-card__icon" style={{ backgroundColor: "rgba(139,92,246,0.12)", color: "var(--accent-primary)" }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", margin: 0 }}>{loc.state}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{loc.country}</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%", marginBottom: "16px" }}>
                <div>
                  <p style={{ color: "var(--text-tertiary)", fontSize: "12px", marginBottom: "4px" }}>Active Projects</p>
                  <p style={{ fontSize: "22px", fontWeight: 700 }}>{loc.activeProjects}</p>
                </div>
                <div>
                  <p style={{ color: "var(--text-tertiary)", fontSize: "12px", marginBottom: "4px" }}>Total Budget</p>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--success)" }}>{formatCurrency(loc.totalBudget)}</p>
                </div>
              </div>

              <div style={{ width: "100%", background: "rgba(255,255,255,0.04)", padding: "14px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Health Breakdown</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--success)", fontWeight: 700, fontSize: "13px" }}>✓ {loc.healthBreakdown.healthy} Healthy</span>
                  <span style={{ color: "var(--warning)", fontWeight: 700, fontSize: "13px" }}>⚠ {loc.healthBreakdown.atRisk} At Risk</span>
                  <span style={{ color: "var(--danger)", fontWeight: 700, fontSize: "13px" }}>✕ {loc.healthBreakdown.critical} Critical</span>
                </div>
              </div>

              <p style={{ marginTop: "14px", fontSize: "12px", color: "var(--text-tertiary)" }}>
                Click to view details →
              </p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <LocationDetailPanel location={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
