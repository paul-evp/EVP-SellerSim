import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { CheckCircle, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  name: string;
  value: number;
  threshold: number;        // must stay BELOW this
  warningThreshold: number; // amber zone starts here
  unit: string;
  label: string;
  description: string;
  status: "good" | "warning" | "critical";
}

const metrics: Metric[] = [
  {
    name: "Order Defect Rate",
    value: 0.21,
    warningThreshold: 0.5,
    threshold: 1.0,
    unit: "%",
    label: "ODR",
    description: "Percentage of orders with a defect: A-to-Z claim, chargeback, or negative feedback. Must stay below 1%.",
    status: "good",
  },
  {
    name: "Late Shipment Rate",
    value: 1.8,
    warningThreshold: 2.0,
    threshold: 4.0,
    unit: "%",
    label: "LSR",
    description: "Percentage of FBM orders shipped after the expected ship date. Must stay below 4%.",
    status: "warning",
  },
  {
    name: "Valid Tracking Rate",
    value: 97.4,
    warningThreshold: 90.0,
    threshold: 95.0,  // must stay ABOVE for VTR
    unit: "%",
    label: "VTR",
    description: "Percentage of packages with a valid tracking number that updates before delivery. Must stay above 95%.",
    status: "good",
  },
];

const policyItems = [
  { label: "Restricted products policy",           pass: true },
  { label: "Intellectual property complaints",      pass: true },
  { label: "Listing policy violations",            pass: true },
  { label: "Authenticity and condition complaints", pass: true },
  { label: "Food and product safety issues",        pass: true },
  { label: "Buyer experience complaints",           pass: true },
];

function MetricGauge({ metric }: { metric: Metric }) {
  // For ODR and LSR: lower is better. For VTR: higher is better.
  const isVTR = metric.label === "VTR";
  const pct = isVTR
    ? Math.min(100, (metric.value / 100) * 100)
    : Math.min(100, (metric.value / metric.threshold) * 100);

  const barColor =
    metric.status === "good"     ? "bg-green-500" :
    metric.status === "warning"  ? "bg-amber-500" :
                                    "bg-red-500";

  const borderColor =
    metric.status === "good"    ? "border-green-200" :
    metric.status === "warning" ? "border-amber-200" :
                                   "border-red-200";

  const bgColor =
    metric.status === "good"    ? "bg-green-50" :
    metric.status === "warning" ? "bg-amber-50" :
                                   "bg-red-50";

  const StatusIcon =
    metric.status === "good"    ? CheckCircle :
    metric.status === "warning" ? AlertTriangle :
                                   XCircle;

  const iconColor =
    metric.status === "good"    ? "text-green-600" :
    metric.status === "warning" ? "text-amber-600" :
                                   "text-red-600";

  return (
    <div className={cn("rounded-xl border-2 p-5 shadow-sm", borderColor, bgColor)}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{metric.label}</div>
          <div className="font-semibold text-sm mt-0.5">{metric.name}</div>
        </div>
        <StatusIcon className={cn("w-5 h-5 flex-shrink-0", iconColor)} />
      </div>

      {/* Big value */}
      <div className={cn("text-4xl font-black my-3", iconColor)}>
        {metric.value}{metric.unit}
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${isVTR ? pct : pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0{metric.unit}</span>
          <span className="text-red-600 font-medium">
            {isVTR ? `Min ${metric.threshold}${metric.unit}` : `Max ${metric.threshold}${metric.unit}`}
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{metric.description}</p>

      {metric.status === "warning" && (
        <div className="mt-3 flex items-start gap-2 bg-amber-100 border border-amber-300 rounded p-2 text-xs text-amber-800">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          Approaching the limit. Review recent FBM orders for late shipments.
        </div>
      )}
    </div>
  );
}

export default function AccountHealth() {
  const overallGood = metrics.every(m => m.status === "good");
  const hasWarning  = metrics.some(m => m.status === "warning");

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Account Health"
        breadcrumbs={[{ label: "Performance" }, { label: "Account Health" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Account Health — Your Selling Privileges Dashboard"
          description="Account Health measures whether you're meeting Amazon's performance targets. There are three core metrics: Order Defect Rate (ODR) — must stay below 1%; Late Shipment Rate (LSR) — below 4%; and Valid Tracking Rate (VTR) — above 95% for FBM orders. If these metrics breach their limits, Amazon can suspend or restrict your selling account."
          whyItMatters="A healthy account is your most important asset as an Amazon seller. Suspension can happen within hours of breaching a threshold, and reinstatement can take days or weeks. Monitoring Account Health daily — especially for FBM sellers — is non-negotiable."
        />

        {/* Overall status banner */}
        <div className={cn(
          "flex items-center gap-3 rounded-lg border px-5 py-3",
          overallGood ? "bg-green-50 border-green-200" :
          hasWarning  ? "bg-amber-50 border-amber-200" :
                        "bg-red-50 border-red-200"
        )}>
          {overallGood  && <ShieldCheck   className="w-5 h-5 text-green-600" />}
          {hasWarning   && <AlertTriangle className="w-5 h-5 text-amber-600" />}
          <div>
            <div className={cn("text-sm font-semibold",
              overallGood ? "text-green-800" : hasWarning ? "text-amber-800" : "text-red-800"
            )}>
              {overallGood  ? "Account Standing: Good" :
               hasWarning   ? "Account Standing: At Risk — Action Needed" :
                              "Account Standing: Critical"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {overallGood
                ? "All metrics are within Amazon's required thresholds."
                : "One or more metrics are approaching their limit. Review and act now."}
            </div>
          </div>
        </div>

        {/* Metric gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.map((m) => <MetricGauge key={m.label} metric={m} />)}
        </div>

        {/* Policy compliance */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold mb-4">Policy Compliance</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Amazon tracks policy violations separately from performance metrics. Each open violation can lead to listing suppression, account suspension, or both.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {policyItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-2 border-b last:border-0 sm:last:border-0">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
                <span className="ml-auto text-xs font-medium text-green-700">No violations</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metric context */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold mb-3">How Each Metric Is Calculated</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: "ODR",  detail: "= (A-to-Z claims granted + chargebacks + negative feedback) ÷ total orders. Measured on a rolling 60-day window." },
              { label: "LSR",  detail: "= FBM orders confirmed shipped after expected ship date ÷ total FBM orders. Rolling 10-day window." },
              { label: "VTR",  detail: "= FBM orders with a valid carrier tracking number scanned before delivery ÷ total FBM orders. Rolling 30-day window." },
            ].map(({ label, detail }) => (
              <div key={label} className="flex gap-3 border-b pb-3 last:border-0 last:pb-0">
                <span className="font-bold text-[#146EB4] w-8 flex-shrink-0">{label}</span>
                <span className="text-muted-foreground">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
