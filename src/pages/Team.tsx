import { Users, Mail, Clock } from "lucide-react";
import { MOCK_TEAM as team } from "../data/mockdata";

export default function Team() {
  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Team</p>
          <h1>Manage your project stakeholders</h1>
        </div>
        <div className="page-hero__actions">
          <button className="button button--primary">+ Invite Member</button>
        </div>
      </section>

      <div className="table-card">
        <div className="table-card__header">
          <h2>Team directory and roles</h2>
        </div>
        
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {team.map((member) => (
            <div key={member.id} className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={member.avatar} alt={member.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{member.name}</h3>
                    <span style={{ color: 'var(--accent-secondary)', fontSize: '13px', fontWeight: 'bold' }}>{member.role}</span>
                  </div>
                </div>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  background: member.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: member.status === 'Active' ? 'var(--success)' : 'var(--danger)'
                }}>
                  {member.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <Mail size={16} />
                  <span>{member.email}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <Users size={16} />
                  <span>{member.assignedProjectsCount} Assigned Projects</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <Clock size={16} />
                  <span>Last active: {member.lastActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
