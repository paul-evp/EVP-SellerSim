import { useState } from "react";
import { GraduationCap, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LearnRibbonProps {
  title: string;
  description: string;
  whyItMatters: string;
  className?: string;
}

export function LearnRibbon({ title, description, whyItMatters, className }: LearnRibbonProps) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={cn("overflow-hidden", className)}
        >
          <div
            className="bg-blue-50 border-l-4 border-blue-500 p-4 relative"
            data-testid="learn-ribbon"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 transition-colors"
              data-testid="button-dismiss-ribbon"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>

              <div className="flex-1 pr-8">
                <div className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-wide">
                  Training Mode
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">
                  What is {title}?
                </h3>

                <p className="text-sm text-gray-700 mb-3">{description}</p>

                <p className="text-sm text-gray-700">
                  <span className="font-bold">Why this matters:</span> {whyItMatters}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
