import { useState } from "react";
import { TopBar } from "./TopBar";
import { NavDrawer } from "./NavDrawer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopBar onMenuToggle={() => setNavOpen(true)} />
      <NavDrawer isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <main className="pt-14">{children}</main>
    </div>
  );
}
