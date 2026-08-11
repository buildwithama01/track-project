import { Receipt, TrendingUp, AlertCircle } from "lucide-react";
import { MOCK_EXPENSES as expenses } from "../data/mockdata";
import { formatCurrency } from "../lib/utils";

export default function Reports() {
  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>Financial and project insights</h1>
        </div>
        <div className="page-hero__actions">
          <button className="button button--outline">Download CSV</button>
          <button className="button button--primary">Generate Report</button>
        </div>
      </section>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon" style={{ color: 'var(--danger)' }}><Receipt size={24} /></div>
          <div className="stat-card__content">
            <p className="stat-card__value">{formatCurrency(expenses.reduce((a, b) => a + b.amount, 0))}</p>
            <p className="stat-card__label">Total Expenses Logged</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon" style={{ color: 'var(--warning)' }}><AlertCircle size={24} /></div>
          <div className="stat-card__content">
            <p className="stat-card__value">{expenses.filter(e => e.status === 'Pending').length}</p>
            <p className="stat-card__label">Pending Approvals</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon" style={{ color: 'var(--success)' }}><TrendingUp size={24} /></div>
          <div className="stat-card__content">
            <p className="stat-card__value">4</p>
            <p className="stat-card__label">Active Projects Budgeted</p>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card__header">
          <h2>Recent Expense Claims</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Expense Title</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Project</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500 }}>{exp.title}</td>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{exp.projectName}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600 }}>{formatCurrency(exp.amount)}</td>
                  <td style={{ padding: '16px', fontSize: '13px' }}>
                    <span style={{ padding: '4px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>{exp.category}</span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px' }}>
                    <span style={{ 
                      color: exp.status === 'Approved' ? 'var(--success)' : exp.status === 'Pending' ? 'var(--warning)' : 'var(--danger)',
                      fontWeight: 600
                    }}>
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
