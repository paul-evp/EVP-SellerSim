import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navSections = [
  "Catalog",
  "Inventory",
  "Pricing",
  "Orders",
  "Advertising",
  "Stores",
  "Growth",
  "Brands",
  "Reports & Analytics",
  "Payments",
  "Performance",
  "Settings",
];

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
            data-testid="nav-drawer-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-80 z-50 overflow-y-auto"
            style={{ backgroundColor: '#232F3E' }}
            data-testid="nav-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-white font-bold text-lg">Browse</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
                data-testid="button-close-drawer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Sections */}
            <div className="py-2">
              {navSections.map((section, idx) => (
                <div key={section} className="border-b border-white/10">
                  <Collapsible>
                    <CollapsibleTrigger
                      className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 transition-colors text-left"
                      data-testid={`nav-section-${idx}`}
                    >
                      <span className="text-sm font-medium">{section}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 py-2">
                      <p className="text-sm text-white/60">Subsections coming soon</p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
