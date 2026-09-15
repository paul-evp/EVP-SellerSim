import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  placeholder?: boolean;
}

interface NavCategory {
  label: string;
  items: NavItem[];
}

const navConfig: NavCategory[] = [
  {
    label: "Products",
    items: [
      { label: "Workspace", href: "/" },
      { label: "Manage products", href: "/catalog/listings" },
      { label: "Manage pricing", href: "/pricing/manage" },
      { label: "Add products", href: "/catalog/add-product" },
      { label: "Analyze reviews", href: "/advertising/brand-analytics" },
      { label: "Research products", href: "/growth" },
      { label: "Sell globally", href: "/growth" },
      { label: "Product reports", href: "/reports/inventory" },
    ],
  },
  {
    label: "Supply chain",
    items: [
      { label: "Workspace", href: "/inventory/manage" },
      { label: "Manage Amazon inventory", href: "/inventory/manage" },
      { label: "Manage seller fulfilled inventory", href: "/inventory/manage" },
      { label: "Manage shipments", href: "/inventory/fba-shipments" },
      { label: "Send to Amazon", href: "/inventory/fba-shipments" },
      { label: "Supply chain reports", href: "/reports/inventory" },
    ],
  },
  {
    label: "Orders",
    items: [{ label: "Workspace", href: "/orders/manage", placeholder: true }],
  },
  {
    label: "Marketing",
    items: [{ label: "Workspace", href: "/advertising/campaigns", placeholder: true }],
  },
  {
    label: "Finance",
    items: [{ label: "Workspace", href: "/payments", placeholder: true }],
  },
  {
    label: "Account health",
    items: [{ label: "Workspace", href: "/performance", placeholder: true }],
  },
  {
    label: "Programs and apps",
    items: [{ label: "Workspace", href: "/growth", placeholder: true }],
  },
];

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (label: string) => {
    setOpenCategory((current) => (current === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/55"
            data-testid="nav-drawer-backdrop"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(360px,88vw)] flex-col overflow-y-auto bg-[#232F3E] shadow-2xl"
            aria-label="Main menu"
            data-testid="nav-drawer"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="text-lg font-bold text-white">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
                aria-label="Collapse menu"
                data-testid="button-close-drawer"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 py-2">
              {navConfig.map((category) => {
                const isOpenCategory = openCategory === category.label;
                return (
                  <div key={category.label} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.label)}
                      className="flex w-full items-center justify-between px-5 py-3.5 text-left text-white transition-colors hover:bg-white/10"
                      aria-expanded={isOpenCategory}
                      data-testid={`nav-category-${category.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="text-sm font-semibold">{category.label}</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${isOpenCategory ? "rotate-90" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpenCategory && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden bg-[#1b2735]"
                        >
                          {category.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={onClose}
                              className={`block px-8 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white ${
                                item.placeholder ? "text-white/90" : "text-white/75"
                              }`}
                              data-testid={`nav-link-${category.label.toLowerCase().replace(/\s+/g, "-")}-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex items-center gap-5 text-sm">
                <a
                  href="#site-map"
                  onClick={onClose}
                  className="text-white/75 underline-offset-4 hover:text-white hover:underline"
                >
                  Site map
                </a>
                <a
                  href="https://sellercentral.amazon.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-white/75 underline-offset-4 hover:text-white hover:underline"
                >
                  Seller Central ↗
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}