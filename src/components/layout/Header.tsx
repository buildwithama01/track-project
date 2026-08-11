import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="page-header">
      <div className="page-header__breadcrumb">
        <p>ProMonitor</p>
        <span> / </span>
        <strong>Dashboard</strong>
      </div>
      <div className="page-header__actions">
        <button className="icon-button" type="button" aria-label="Search">
          <Search size={18} />
        </button>
        <button
          className="icon-button icon-button--badge"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="badge badge--notification">3</span>
        </button>
        <div className="page-header__avatar">CO</div>
      </div>
    </header>
  );
}
