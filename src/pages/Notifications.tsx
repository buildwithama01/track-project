import { Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { MOCK_ACTIVITIES as activities, MOCK_UPDATES as updates } from "../data/mockdata";

export default function Notifications() {
  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Notifications</p>
          <h1>Recent alerts and approvals</h1>
        </div>
        <div className="page-hero__actions">
          <button className="button button--ghost">Mark all as read</button>
        </div>
      </section>

      <div className="dashboard-grid">
        <div className="table-card">
          <div className="table-card__header">
            <h2>Activity Feed</h2>
          </div>
          <ul className="attention-list">
            {activities.map((act) => (
              <li key={act.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px' }}>
                <img src={act.actor.avatar} alt={act.actor.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '14px', WebkitTextFillColor: 'initial', background: 'none' }}>{act.actor.name}</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{act.action}</span>{' '}
                    <strong style={{ color: 'var(--text-primary)', fontSize: '14px', WebkitTextFillColor: 'initial', background: 'none' }}>{act.target}</strong>
                  </p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginTop: '4px' }}>{act.timestamp}</p>
                </div>
                {act.status === 'Completed' && <CheckCircle size={18} color="var(--success)" />}
                {act.status === 'Flagged' && <AlertTriangle size={18} color="var(--danger)" />}
                {act.status === 'Pending' && <Activity size={18} color="var(--warning)" />}
              </li>
            ))}
          </ul>
        </div>

        <div className="table-card">
          <div className="table-card__header">
            <h2>Pending Updates</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {updates.filter(u => u.status === 'Pending Review').map((upd) => (
              <div key={upd.id} className="dashboard-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px' }}>{upd.projectName}</h3>
                  <span style={{ padding: '2px 8px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Review</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{upd.summary}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="button button--primary" style={{ flex: 1, padding: '8px' }}>Approve</button>
                  <button className="button button--outline" style={{ flex: 1, padding: '8px' }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
