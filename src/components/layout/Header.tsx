import { Bell, Menu, Search, X } from "lucide-react";

interface HeaderProps {
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({
  isSidebarOpen = false,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__left">
        <button
          className="icon-button page-header__menu-button"
          type="button"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="page-header__breadcrumb">
          <p>ProMonitor</p>
          <span> / </span>
          <strong>Dashboard</strong>
        </div>
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
