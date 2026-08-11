import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <Header />
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
