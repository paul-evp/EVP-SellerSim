import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Download, FileText, RefreshCw, CheckCircle } from "lucide-react";

interface ReportRow {
  id: string;
  name: string;
  description: string;
  lastRequested: string | null;
  status: "Ready" | "Processing" | "Not Requested";
}

const reports: ReportRow[] = [
  {
    id: "rpt-001",
    name: "FBA Inventory Health Report",
    description: "Shows all FBA inventory with sell-through rate, days of supply, and stranded inventory flags.",
    lastRequested: "Jul 31, 2026",
    status: "Ready",
  },
  {
    id: "rpt-002",
    name: "Restock Inventory Report",
    description: "Lists products recommended for restocking based on sales velocity and current stock levels.",
    lastRequested: "Jul 29, 2026",
    status: "Ready",
  },
  {
    id: "rpt-003",
    name: "Inventory Ledger Report",
    description: "Complete history of all inventory transactions: receipts, shipments, adjustments, removals.",
    lastRequested: "Jul 28, 2026",
    status: "Processing",
  },
  {
    id: "rpt-004",
    name: "Stranded Inventory Report",
    description: "Inventory in FBA warehouses that cannot be sold due to listing issues or suppressed listings.",
    lastRequested: null,
    status: "Not Requested",
  },
  {
    id: "rpt-005",
    name: "FBA Removal Order Detail Report",
    description: "Details of all removal orders — items returned to you or disposed by Amazon.",
    lastRequested: null,
    status: "Not Requested",
  },
];

const statusMap: Record<ReportRow["status"], { status: "active" | "pending" | "inactive"; label: string }> = {
  Ready:         { status: "active",  label: "Ready" },
  Processing:    { status: "pending", label: "Processing" },
  "Not Requested": { status: "inactive", label: "Not Requested" },
};

export default function InventoryReports() {
  const [rowState, setRowState] = useState<Record<string, ReportRow["status"]>>(
    Object.fromEntries(reports.map(r => [r.id, r.status]))
  );
  const [downloaded, setDownloaded] = useState<Record<string, boolean>>({});

  const request = (id: string) => {
    setRowState(prev => ({ ...prev, [id]: "Processing" }));
    setTimeout(() => setRowState(prev => ({ ...prev, [id]: "Ready" })), 1800);
  };

  const download = (id: string) => setDownloaded(prev => ({ ...prev, [id]: true }));

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Inventory Reports"
        breadcrumbs={[{ label: "Reports & Analytics" }, { label: "Inventory Reports" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Inventory Reports"
          description="Inventory Reports give you detailed snapshots of your stock health. Most reports must be requested — Amazon generates them on demand and they take a few minutes to prepare. Once ready, you download the report as a flat file (tab-separated .txt) which you can open in Excel or Google Sheets."
          whyItMatters="The Inventory Health Report is the most important one to run weekly. It shows sell-through rate, days of supply, and aged inventory — data you use to decide whether to restock, run a promotion to clear slow-movers, or request a removal before you get charged long-term storage fees."
        />

        <div className="space-y-3">
          {reports.map((report) => {
            const status  = rowState[report.id];
            const badge   = statusMap[status];
            const isDone  = downloaded[report.id];

            return (
              <div
                key={report.id}
                className="bg-white rounded-lg border shadow-sm px-5 py-4 flex items-start gap-4"
                data-testid={`report-row-${report.id}`}
              >
                <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-sm">{report.name}</span>
                    <StatusBadge status={badge.status} label={badge.label} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                  {report.lastRequested && (
                    <p className="text-xs text-muted-foreground mt-1">Last generated: {report.lastRequested}</p>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {status === "Not Requested" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => request(report.id)}
                      data-testid={`button-request-${report.id}`}
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                      Request Report
                    </Button>
                  )}
                  {status === "Processing" && (
                    <Button variant="outline" size="sm" disabled data-testid={`button-processing-${report.id}`}>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Generating…
                    </Button>
                  )}
                  {status === "Ready" && !isDone && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#146EB4] hover:bg-[#0F5A92]"
                      onClick={() => download(report.id)}
                      data-testid={`button-download-${report.id}`}
                    >
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                  )}
                  {status === "Ready" && isDone && (
                    <Button variant="ghost" size="sm" className="text-green-700 cursor-default" disabled>
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                      Downloaded
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>EVP Hub Sim note:</strong> Downloaded reports are tab-delimited .txt files. You can import them directly into Excel (Data → From Text/CSV) or Google Sheets (File → Import).
        </div>
      </div>
    </div>
  );
}
