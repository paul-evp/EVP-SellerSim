import { type ReactNode } from "react";
import { Link } from "wouter";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Filter,
  DollarSign,
  ExternalLink,
  MoreVertical,
  Package,
  Plus,
  Search,
  Sparkles,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LearnRibbon } from "@/components/LearnRibbon";

// Generate the same fake sales data behavior used by the original dashboard.
const generateSalesData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sales: Math.floor(Math.random() * 3700) + 800,
    });
  }
  return data;
};

const salesData = generateSalesData();

const salesWidgetData = salesData.slice(-9).map((point, index) => ({
  time: `${index + 8} ${index + 8 < 12 ? "AM" : "PM"}`,
  productSales: Math.round(point.sales / 180),
  unitsOrdered: Math.max(0, Math.round(point.sales / 2400)),
}));

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: ReactNode;
  href: string;
}

function KPICard({ title, value, change, trend, icon, href }: KPICardProps) {
  return (
    <Link
      href={href}
      className="group min-w-0 border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(22,42,61,0.04)] transition-colors hover:border-[#2d8190]"
      data-testid={`kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{title}</p>
          <p className="mt-2 font-mono text-[25px] font-bold tracking-tight text-slate-900">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1 text-[11px]">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-600" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-rose-600" />}
              {trend === "neutral" && <AlertTriangle className="h-3 w-3 text-amber-600" />}
              <span className={trend === "up" ? "text-emerald-700" : trend === "down" ? "text-rose-700" : "text-amber-700"}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="rounded-sm bg-slate-100 p-2 text-[#2d8190] transition-colors group-hover:bg-[#e6f2f3]">{icon}</div>
      </div>
    </Link>
  );
}

interface AlertItemProps {
  type: "error" | "warning" | "success" | "info";
  title: string;
  subtitle: string;
  href: string;
}

function AlertItem({ type, title, subtitle, href }: AlertItemProps) {
  const styles = {
    error: { border: "border-l-rose-500", icon: <AlertTriangle className="h-4 w-4 text-rose-600" /> },
    warning: { border: "border-l-amber-500", icon: <AlertTriangle className="h-4 w-4 text-amber-600" /> },
    success: { border: "border-l-emerald-500", icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" /> },
    info: { border: "border-l-[#2d8190]", icon: <Activity className="h-4 w-4 text-[#2d8190]" /> },
  };

  return (
    <Link
      href={href}
      className={`group flex items-start gap-3 border-b border-l-2 border-slate-200 bg-white px-4 py-3 transition-colors last:border-b-0 hover:bg-slate-50 ${styles[type].border}`}
      data-testid={`alert-${type}`}
    >
      <div className="mt-0.5 shrink-0">{styles[type].icon}</div>
      <div className="min-w-0 flex-1">
        <h4 className="text-[13px] font-semibold text-slate-800">{title}</h4>
        <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>
      </div>
      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#2d8190]" />
    </Link>
  );
}

function RailLink({ href, label, count, active }: { href: string; label: string; count?: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between border-l-2 px-3 py-2 text-[12px] transition-colors ${active ? "border-[#f28b32] bg-[#e8eff1] font-semibold text-slate-900" : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
      data-testid={`rail-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span>{label}</span>
      {count && <span className="font-mono text-[10px] text-slate-500">{count}</span>}
    </Link>
  );
}

function RailCountBadge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "rose" }) {
  return (
    <span
      className={`inline-flex min-w-4 items-center justify-center rounded-sm px-1 py-0.5 text-[9px] font-bold leading-none ${
        tone === "rose" ? "bg-rose-600 text-white" : "bg-slate-600 text-white"
      }`}
    >
      {children}
    </span>
  );
}

function ActionCard({
  href,
  title,
  tone,
  badge,
  children,
}: {
  href: string;
  title: string;
  tone: "critical" | "medium";
  badge: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group block border border-slate-200 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(22,42,61,0.05)] transition-colors hover:border-[#2d8190]"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-bold leading-4 text-slate-800 group-hover:text-[#24717d]">{title}</p>
        <span className={`shrink-0 text-[9px] font-bold uppercase tracking-[0.04em] ${tone === "critical" ? "text-rose-600" : "text-amber-600"}`}>
          {badge}
        </span>
      </div>
      <p className="mt-0.5 text-[10px] leading-3.5 text-slate-600">{children}</p>
    </Link>
  );
}

function RecommendationCard({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative block border border-slate-200 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(22,42,61,0.04)] transition-colors hover:border-[#2d8190]"
    >
      <MoreVertical className="absolute right-2 top-2 h-3.5 w-3.5 text-slate-400" />
      <p className="pr-4 text-[11px] font-bold leading-4 text-slate-800 group-hover:text-[#24717d]">{title}</p>
      <p className="mt-0.5 pr-2 text-[10px] leading-3.5 text-slate-600">{children}</p>
    </Link>
  );
}

function SectionHeading({ title, action, href }: { title: string; action?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
      <h2 className="text-[13px] font-bold tracking-tight text-slate-800">{title}</h2>
      {action && href && (
        <Link href={href} className="flex items-center gap-1 text-[11px] font-semibold text-[#24717d] hover:underline" data-testid={`link-section-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          {action} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function SalesWidget() {
  const chartConfig = [
    { title: "Product sales", dataKey: "productSales" as const, color: "#8296d1", formatter: (value: number) => `$${value}.00` },
    { title: "Units ordered", dataKey: "unitsOrdered" as const, color: "#8296d1", formatter: (value: number) => `${value}` },
  ];

  return (
    <section className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]" data-testid="sales-widget">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">⠿</span>
          <h2 className="text-[14px] font-bold tracking-tight text-slate-800">Sales</h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <Link href="/reports/business" className="text-[#24717d] hover:underline">Explore with reports</Link>
          <Link href="/reports/business" className="text-[#24717d] hover:underline">Profit analytics</Link>
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="px-4 pt-2 text-[10px] text-slate-500">Updated: just now</div>

      <div className="flex flex-wrap items-center gap-2 px-4 py-2">
        <button type="button" className="inline-flex h-7 min-w-28 items-center justify-between gap-3 border border-slate-200 bg-white px-2.5 text-[10px] text-slate-600">
          Today <ChevronDown className="h-3 w-3 text-slate-500" />
        </button>
        <label className="relative min-w-44 flex-1 sm:max-w-56">
          <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search ASIN or title"
            className="h-7 w-full border border-slate-200 bg-white pl-7 pr-2 text-[10px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#2d8190]"
            data-testid="input-sales-search"
          />
        </label>
        <div className="flex h-7 items-center gap-1 border border-slate-200 px-1.5">
          {["MX", "BR", "CA", "US"].map((marketplace, index) => (
            <button
              key={marketplace}
              type="button"
              className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold ${index === 3 ? "bg-[#e8f2f3] text-[#24717d]" : "text-slate-500 hover:bg-slate-100"}`}
              data-testid={`button-marketplace-${marketplace.toLowerCase()}`}
            >
              {marketplace}
            </button>
          ))}
          <ChevronDown className="ml-0.5 h-3 w-3 text-slate-400" />
        </div>
        <label className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-slate-400">
          <input type="checkbox" className="h-3 w-3 accent-[#2d8190]" />
          Compare dates
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-y border-slate-200 px-4 py-2 text-[10px] text-slate-600">
        <span>Ordered product sales <b className="ml-1 text-slate-800">$2,847.50</b></span>
        <span className="hidden h-3 w-px bg-slate-200 sm:block" />
        <span>Units ordered <b className="ml-1 text-slate-800">143</b></span>
        <span className="hidden h-3 w-px bg-slate-200 sm:block" />
        <span>Conversion rate <b className="ml-1 text-slate-800">11.8%</b></span>
      </div>

      <div className="grid gap-4 px-4 pb-3 pt-2 md:grid-cols-2">
        {chartConfig.map((chart) => (
          <div key={chart.title} className="min-w-0">
            <p className="mb-1 text-[11px] font-semibold text-slate-700">{chart.title}</p>
            <div className="h-[145px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesWidgetData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 3" stroke="#e6eaed" vertical={false} />
                  <XAxis dataKey="time" stroke="#81909b" tickLine={false} axisLine={false} interval={1} style={{ fontSize: "8px" }} />
                  <YAxis
                    stroke="#81909b"
                    tickLine={false}
                    axisLine={false}
                    width={28}
                    tickFormatter={(value) => chart.dataKey === "productSales" ? `$${value}` : `${value}`}
                    style={{ fontSize: "8px" }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#172a3d", border: "0", borderRadius: "2px", color: "#fff", fontSize: "10px" }}
                    formatter={(value: number) => [chart.formatter(value), chart.title]}
                  />
                  <Line type="linear" dataKey={chart.dataKey} stroke={chart.color} strokeWidth={1.5} dot={{ r: 1.5, fill: chart.color }} activeDot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8296d1]" /> Today so far
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeedbackRatingWidget() {
  return (
    <section className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]" data-testid="feedback-rating-widget">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">⠿</span>
          <h2 className="text-[13px] font-bold text-slate-800">Feedback Rating</h2>
        </div>
        <MoreVertical className="h-4 w-4 text-slate-400" />
      </div>
      <div className="px-4 pt-2">
        <Link href="/orders/manage" className="text-[10px] font-semibold text-[#24717d] hover:underline">Manage feedback</Link>
        <p className="text-[10px] text-slate-500">Last 365 days</p>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-end gap-2">
          <span className="font-mono text-[22px] font-bold text-slate-900">4.9</span>
          <span className="pb-0.5 text-[15px] tracking-tight text-amber-500">★★★★★</span>
          <span className="pb-0.5 text-[10px] text-slate-500">(343 ratings)</span>
        </div>
        <div className="mt-3 grid grid-cols-2 border-t border-slate-200 pt-2 text-[10px]">
          <div><p className="text-slate-500">Negative</p><p className="mt-1 text-[15px] font-bold text-slate-800">0</p></div>
          <div className="border-l border-slate-200 pl-4"><p className="text-slate-500">Positive</p><p className="mt-1 text-[15px] font-bold text-slate-800">343</p></div>
        </div>
      </div>
    </section>
  );
}

function TopProductIssuesWidget() {
  const issues = [
    { label: "Very poor", value: "1", tone: "bg-rose-600" },
    { label: "Poor", value: "0", tone: "bg-orange-400" },
    { label: "Fair", value: "2", tone: "bg-yellow-500" },
    { label: "Good", value: "2", tone: "bg-emerald-500" },
    { label: "Excellent", value: "22", tone: "bg-green-700" },
  ];

  return (
    <section className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]" data-testid="top-product-issues-widget">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">⠿</span>
          <h2 className="text-[13px] font-bold text-slate-800">Top Product Issues</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/catalog/listings" className="text-[10px] font-semibold text-[#24717d] hover:underline">View top product issues</Link>
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </div>
      </div>
      <div className="flex items-center gap-5 border-b border-slate-200 px-4 pt-2 text-[11px] font-semibold">
        <button type="button" className="border-b-2 border-[#2d8190] pb-2 text-[#24717d]">Customer health</button>
        <button type="button" className="pb-2 text-slate-500 hover:text-slate-800">Sentiment</button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-5">
        {issues.map((issue) => (
          <div key={issue.label} className="border border-slate-200 px-2 py-3 text-center">
            <span className={`mx-auto block max-w-20 rounded-full px-1 py-0.5 text-[9px] font-bold text-white ${issue.tone}`}>{issue.label}</span>
            <p className="mt-2 text-[14px] font-bold text-slate-800">{issue.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-[calc(100dvh-6rem)] bg-[#eef1f3]">
      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]">
              <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-slate-800">Actions</span>
                  <RailCountBadge tone="rose">2</RailCountBadge>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Filter className="h-3 w-3" />
                  <span>All</span>
                  <ChevronDown className="h-3 w-3" />
                  <span className="ml-1 text-slate-300">‹</span>
                </div>
              </div>
              <div className="space-y-2 border-b border-slate-200 p-2">
                <ActionCard href="/performance" title="Your account is at risk" tone="critical" badge="Critical">
                  A critical event has occurred with your account
                </ActionCard>
                <ActionCard href="/inventory/manage" title="Fix stranded inventory" tone="medium" badge="Medium">
                  21 over 15 days stranded
                  <br />
                  21 total stranded
                </ActionCard>
              </div>
              <div className="border-b border-slate-200 p-2">
                <div className="mb-2 flex items-center gap-1.5 px-1">
                  <span className="text-[13px] font-bold text-slate-800">Recommendations</span>
                  <RailCountBadge>17</RailCountBadge>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
                </div>
                <div className="space-y-2">
                  <RecommendationCard href="/growth" title="List globally">Automate international sales</RecommendationCard>
                  <RecommendationCard href="/catalog/listings" title="Improve listing quality">Add product details to SKUs</RecommendationCard>
                  <RecommendationCard href="/growth" title="Increase Repeat Sales">View Recommendation Details</RecommendationCard>
                  <RecommendationCard href="/advertising/campaigns" title="Earn Brand Referral Bonuses">Create advertising campaigns</RecommendationCard>
                  <RecommendationCard href="/settings" title="Receive notifications on WhatsApp">Opt in to WhatsApp</RecommendationCard>
                </div>
                <Link href="/growth" className="mt-2 block px-1 text-[10px] font-semibold text-[#24717d] hover:underline">See more</Link>
              </div>
              <div className="space-y-1.5 p-2">
                <button type="button" className="flex w-full items-center justify-center gap-2 py-1.5 text-[11px] font-semibold text-[#7c3aed] hover:bg-violet-50">
                  <Sparkles className="h-3.5 w-3.5" /> Ask Seller Assistant
                </button>
                <button type="button" className="flex w-full items-center justify-center gap-1 py-1 text-[10px] font-semibold text-[#24717d] hover:bg-[#f3f8f8]">
                  Access a canvas <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="mt-4 flex flex-wrap items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-[11px] shadow-[0_1px_2px_rgba(22,42,61,0.04)]">
              <span className="font-semibold text-slate-600">Workspace status</span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="inline-flex items-center gap-1.5 text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Selling account active</span>
              <span className="hidden h-3 w-px bg-slate-200 sm:block" />
              <span className="text-slate-500">Last settlement: <b className="font-mono text-slate-700">$6,284.91</b></span>
              <span className="hidden h-3 w-px bg-slate-200 sm:block" />
              <span className="text-slate-500">IPI score: <b className="text-emerald-700">487 · Good</b></span>
              <button type="button" className="ml-auto inline-flex items-center gap-1 font-semibold text-[#24717d] hover:underline" data-testid="button-status-details">Details <ExternalLink className="h-3 w-3" /></button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
              <KPICard title="Sales today" value="$2,847.50" change="+12.3% vs yesterday" trend="up" icon={<DollarSign className="h-5 w-5" />} href="/reports/business" />
              <KPICard title="Units ordered" value="143 units" change="+8 vs yesterday" trend="up" icon={<Package className="h-5 w-5" />} href="/orders/manage" />
              <KPICard title="Awaiting shipment" value="17 orders" change="Action needed" trend="neutral" icon={<ShoppingCart className="h-5 w-5" />} href="/orders/manage" />
              <KPICard title="Account health" value="Good" change="247 / 300" trend="up" icon={<Activity className="h-5 w-5" />} href="/performance" />
            </div>

            <LearnRibbon
              className="mt-4"
              title="your workspace"
              description="Review performance, surface account issues, and move directly into the tools that need your attention."
              whyItMatters="A quick daily review keeps listing quality, inventory coverage, and order promises on track."
            />

            <div className="mt-4 space-y-4">
              <SalesWidget />
              <div className="grid gap-4 xl:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.8fr)]">
                <FeedbackRatingWidget />
                <TopProductIssuesWidget />
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.9fr)]">
              <section className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]">
                <SectionHeading title="Tasks & alerts" action="See all tasks" href="/catalog/listings" />
                <div>
                  <AlertItem type="error" title="2 listings need attention" subtitle="Suppressed due to missing attributes" href="/catalog/listings" />
                  <AlertItem type="warning" title="IPI score updated" subtitle="Your Inventory Performance Index is 487 (Good)" href="/inventory/manage" />
                  <AlertItem type="warning" title="17 orders awaiting shipment" subtitle="Ship by today to meet promised delivery" href="/orders/manage" />
                  <AlertItem type="success" title="New Buy Box win" subtitle="ACME Bamboo Cutting Board won Buy Box" href="/catalog/listings" />
                </div>
              </section>
              <section className="border border-slate-200 bg-white shadow-[0_1px_2px_rgba(22,42,61,0.04)]">
                <SectionHeading title="Quick actions" />
                <div className="grid gap-2 p-4 sm:grid-cols-2 xl:grid-cols-1">
                  <Link href="/catalog/add-product" className="flex items-center justify-between border border-slate-200 px-3 py-2.5 text-[11px] font-semibold text-slate-700 hover:border-[#2d8190] hover:bg-[#f3f8f8]" data-testid="link-quick-add-product"><span className="flex items-center gap-2"><Plus className="h-4 w-4 text-[#2d8190]" /> Add a product</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" /></Link>
                  <Link href="/inventory/fba-shipments" className="flex items-center justify-between border border-slate-200 px-3 py-2.5 text-[11px] font-semibold text-slate-700 hover:border-[#2d8190] hover:bg-[#f3f8f8]" data-testid="link-quick-shipment"><span className="flex items-center gap-2"><Package className="h-4 w-4 text-[#2d8190]" /> Send inventory</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" /></Link>
                  <Link href="/pricing/manage" className="flex items-center justify-between border border-slate-200 px-3 py-2.5 text-[11px] font-semibold text-slate-700 hover:border-[#2d8190] hover:bg-[#f3f8f8]" data-testid="link-quick-pricing"><span className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#2d8190]" /> Manage pricing</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" /></Link>
                  <Link href="/orders/manage" className="flex items-center justify-between border border-slate-200 px-3 py-2.5 text-[11px] font-semibold text-slate-700 hover:border-[#2d8190] hover:bg-[#f3f8f8]" data-testid="link-quick-orders"><span className="flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-[#2d8190]" /> Manage orders</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" /></Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}