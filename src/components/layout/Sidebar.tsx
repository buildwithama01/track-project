import {
  Home,
  Layers,
  MapPin,
  MonitorPlay,
  PieChart,
  Users,
  Bell,
  Settings2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/projects", label: "Projects", icon: Layers },
  { to: "/locations", label: "Locations", icon: MapPin },
  { to: "/live", label: "Live", icon: MonitorPlay },
  { to: "/reports", label: "Reports", icon: PieChart },
  { to: "/team", label: "Team", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { to: "/settings", label: "Settings", icon: Settings2 },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">PM</div>
        <div>
          <p className="sidebar__brand-title">ProMonitor</p>
          <p className="sidebar__brand-subtitle">Project tracking</p>
        </div>
      </div>

      <div className="sidebar__nav">
        <p className="sidebar__section">MAIN MENU</p>
        {navItems.slice(0, 2).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__item${isActive ? " sidebar__item--active" : ""}`
            }
          >
            <item.icon className="sidebar__icon" />
            {item.label}
          </NavLink>
        ))}

        <p className="sidebar__section">MONITORING</p>
        {navItems.slice(2, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__item${isActive ? " sidebar__item--active" : ""}`
            }
          >
            <item.icon className="sidebar__icon" />
            {item.label}
          </NavLink>
        ))}

        <p className="sidebar__section">MANAGEMENT</p>
        {navItems.slice(5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar__item${isActive ? " sidebar__item--active" : ""}`
            }
          >
            <item.icon className="sidebar__icon" />
            {item.label}
            {item.badge ? (
              <span className="sidebar__badge">{item.badge}</span>
            ) : null}
          </NavLink>
        ))}
      </div>

      <div className="sidebar__profile">
        <img
          className="sidebar__avatar"
          src="https://i.pravatar.cc/40?img=12"
          alt="Chidi Okafor"
        />
        <div>
          <p className="sidebar__profile-name">Chidi Okafor</p>
          <p className="sidebar__profile-role">Admin</p>
        </div>
      </div>
    </aside>
  );
}
