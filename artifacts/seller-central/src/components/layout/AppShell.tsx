import { useState } from "react";
import { TopBar } from "./TopBar";
import { NavDrawer } from "./NavDrawer";
import { Footer } from "./Footer";
import { Link } from "wouter";

interface AppShellProps {
  children: React.ReactNode;
}

const workspaceTabs = [
  { label: "My business", detail: "Today's Global Sales", value: "$70", href: "/" },
  { label: "Products", detail: "Active", value: "11/46", href: "/catalog/listings" },
  { label: "Supply chain", detail: "Performance Index", value: "628/1,000 ↑ 1 pts", href: "/inventory/manage" },
  { label: "Orders", detail: "Open Orders", value: "3", href: "/orders/manage" },
  { label: "Marketing", detail: "Impressions", value: "0", href: "/advertising/campaigns" },
  { label: "Finance", detail: "Total balance", value: "$884", href: "/payments" },
  { label: "Customers", detail: "Feedback Rating", value: "4.9/5 stars", href: "/orders/manage" },
];

export function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopBar onMenuToggle={() => setNavOpen(true)} />
      <NavDrawer isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <div className="fixed left-0 right-0 top-14 z-40 h-14 border-b border-slate-300 bg-[#eef1f3] shadow-sm">
        <nav className="mx-auto flex h-full max-w-[1600px] gap-1 overflow-x-auto px-3 sm:px-6" aria-label="Workspace tabs">
          {workspaceTabs.map((tab, index) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex min-w-[132px] flex-1 shrink-0 flex-col justify-center border border-slate-200 bg-white px-3 py-1.5 transition-colors hover:border-[#2d8190] hover:bg-[#f8fbfb] ${
                index === 0 ? "border-t-2 border-t-[#2d8190]" : ""
              }`}
              data-testid={`workspace-tab-${tab.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className={`text-[11px] font-bold ${index === 0 ? "text-[#24717d]" : "text-slate-800"}`}>{tab.label}</span>
              <span className="truncate text-[9px] text-slate-500">{tab.detail}</span>
              <span className="truncate text-[11px] font-bold text-slate-700">{tab.value}</span>
            </Link>
          ))}
        </nav>
      </div>
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}
