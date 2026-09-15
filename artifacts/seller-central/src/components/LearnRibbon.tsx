import { useState } from "react";
import { BookOpen, X } from "lucide-react";
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
            className="relative border border-[#c8dce0] border-l-4 border-l-[#2d8190] bg-[#f3f8f8] p-4"
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
               <BookOpen className="w-6 h-6 text-[#2d8190]" />
              </div>

              <div className="flex-1 pr-8">
                 <h3 className="text-base font-bold text-slate-900 mb-2">
                   Workspace guide: {title}
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
