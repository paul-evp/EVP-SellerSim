import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("bg-card border-b border-border px-6 py-4", className)} data-testid="page-header">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="text-primary hover:underline" data-testid={`breadcrumb-${idx}`}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-muted-foreground" data-testid={`breadcrumb-${idx}`}>
                    {crumb.label}
                  </span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="page-title">
            {title}
          </h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
