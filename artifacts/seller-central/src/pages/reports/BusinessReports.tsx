import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

const salesByDay = [
  { date: "Jul 25", sales: 312.40, orders: 8 },
  { date: "Jul 26", sales: 487.20, orders: 13 },
  { date: "Jul 27", sales: 390.50, orders: 10 },
  { date: "Jul 28", sales: 620.00, orders: 17 },
  { date: "Jul 29", sales: 534.75, orders: 14 },
  { date: "Jul 30", sales: 718.30, orders: 19 },
  { date: "Jul 31", sales: 845.90, orders: 22 },
  { date: "Aug 1",  sales: 291.48, orders: 7  },
];

interface SummaryRow { id: number; metric: string; value: string; change: string; positive: boolean; }

const summaryRows: SummaryRow[] = [
  { id: 1, metric: "Ordered Product Sales",  value: "$4,200.53", change: "+12% vs last period", positive: true  },
  { id: 2, metric: "Units Ordered",          value: "110",        change: "+8% vs last period",  positive: true  },
  { id: 3, metric: "Orders",                 value: "98",         change: "+9% vs last period",  positive: true  },
  { id: 4, metric: "Average Order Value",    value: "$42.86",     change: "+3% vs last period",  positive: true  },
  { id: 5, metric: "Sessions (Page Views)",  value: "3,847",      change: "−2% vs last period",  positive: false },
  { id: 6, metric: "Unit Session %",         value: "2.86%",      change: "+0.4pp vs last period", positive: true },
];

const summaryColumns: DataTableColumn<SummaryRow>[] = [
  { key: "metric", header: "Metric", sortable: false },
  {
    key: "value",
    header: "Value (Jul 25 – Aug 1)",
    sortable: false,
    render: (row) => <span className="font-semibold">{row.value}</span>,
  },
  {
    key: "change",
    header: "Change",
    sortable: false,
    render: (row) => (
      <span className={`text-sm font-medium ${row.positive ? "text-green-700" : "text-red-600"}`}>
        {row.change}
      </span>
    ),
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border rounded-lg shadow-lg p-3 text-sm">
        <div className="font-medium mb-1">{label}</div>
        <div className="text-[#146EB4]">Sales: <strong>${payload[0]?.value?.toFixed(2)}</strong></div>
        <div className="text-gray-600">Orders: <strong>{payload[1]?.value}</strong></div>
      </div>
    );
  }
  return null;
};

export default function BusinessReports() {
  const totalSales  = salesByDay.reduce((s, d) => s + d.sales, 0);
  const totalOrders = salesByDay.reduce((s, d) => s + d.orders, 0);

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Business Reports"
        breadcrumbs={[{ label: "Reports & Analytics" }, { label: "Business Reports" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Business Reports"
          description="Business Reports give you a daily view of your sales, traffic, and conversion data. The key metric to watch is your Unit Session Percentage — that's your conversion rate. It tells you what percentage of shoppers who viewed your listing actually bought. Industry average is around 10–15% for well-optimized listings."
          whyItMatters="If traffic is high but conversion is low, your listing has a problem — weak images, unclear bullets, or a price that's out of range. If conversion is high but traffic is low, your problem is SEO or ad spend. Business Reports help you diagnose which lever to pull."
        />

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Sales (7 days)",  value: `$${totalSales.toFixed(2)}` },
            { label: "Total Orders (7 days)", value: `${totalOrders}` },
            { label: "Peak Day",              value: "Aug 1 · $845.90" },
            { label: "Avg. Daily Sales",      value: `$${(totalSales / salesByDay.length).toFixed(2)}` },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border px-5 py-4 shadow-sm">
              <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className="text-xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold mb-1">Sales by Day</h2>
          <p className="text-sm text-muted-foreground mb-5">Jul 25 – Aug 1, 2026</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesByDay} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#146EB4" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#146EB4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#146EB4"
                strokeWidth={2}
                fill="url(#salesGrad)"
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#22c55e"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#146EB4] inline-block" /> Sales ($)</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-green-500 inline-block border-dashed border-t border-green-500" /> Orders (dashed)</span>
          </div>
        </div>

        {/* Summary table */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold mb-4">Metrics Summary</h2>
          <DataTable columns={summaryColumns} data={summaryRows} />
        </div>
      </div>
    </div>
  );
}
