import { Save, User, Lock, BellRing, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Platform configuration</h1>
        </div>
        <div className="page-hero__actions">
          <button className="button button--primary"><Save size={16} /> Save Changes</button>
        </div>
      </section>

      <div className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="dashboard-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--accent-primary)', textAlign: 'left' }}>
            <User size={20} color="var(--accent-secondary)" />
            <span style={{ fontWeight: 600, color: 'ActiveText' }}>Profile Settings</span>
          </button>
          <button className="dashboard-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.7, textAlign: 'left' }}>
            <Lock size={20} color="var(--accent-secondary)" />
            <span style={{ fontWeight: 600, color: 'ActiveText' }}>Security & Privacy</span>
          </button>
          <button className="dashboard-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.7, textAlign: 'left' }}>
            <BellRing size={20} color="var(--accent-secondary)" />
            <span style={{ fontWeight: 600, color: 'ActiveText' }}>Notification Preferences</span>
          </button>
          <button className="dashboard-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.7, textAlign: 'left' }}>
            <Palette size={20} color="var(--accent-secondary)" />
            <span style={{ fontWeight: 600, color: 'ActiveText' }}>Appearance</span>
          </button>
        </div>

        <div className="table-card">
          <div className="table-card__header">
            <h2>Profile Settings</h2>
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Full Name</label>
              <input type="text" defaultValue="Chidi Okafor" style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Email Address</label>
              <input type="email" defaultValue="chidi.o@promonitor.io" style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Role</label>
              <input type="text" defaultValue="Administrator" disabled style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-light)', color: 'var(--text-tertiary)', outline: 'none' }} />
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <button type="button" className="button button--outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Deactivate Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
