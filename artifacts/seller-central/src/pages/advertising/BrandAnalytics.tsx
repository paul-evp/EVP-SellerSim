import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ShieldCheck } from "lucide-react";

const searchTermData = [
  { term: "bamboo cutting board",          clicks: 1840, conversions: 127, cvr: 6.9 },
  { term: "cast iron skillet 12 inch",     clicks: 1220, conversions:  98, cvr: 8.0 },
  { term: "kitchen utensil set silicone",  clicks:  980, conversions:  61, cvr: 6.2 },
  { term: "glass meal prep containers",    clicks:  870, conversions:  74, cvr: 8.5 },
  { term: "mixing bowls stainless steel",  clicks:  760, conversions:  43, cvr: 5.7 },
  { term: "wooden salad bowl",             clicks:  640, conversions:  38, cvr: 5.9 },
  { term: "ceramic spice jars set",        clicks:  590, conversions:  52, cvr: 8.8 },
];

interface MarketBasketRow {
  id: number;
  purchasedProduct: string;
  alsoFrequentlyBought: string;
  combinationRate: string;
  opportunity: string;
}

const marketBasketData: MarketBasketRow[] = [
  {
    id: 1,
    purchasedProduct: "Bamboo Cutting Board Set (3-Pack)",
    alsoFrequentlyBought: "Wooden Salad Bowl Set",
    combinationRate: "23%",
    opportunity: "Bundle opportunity",
  },
  {
    id: 2,
    purchasedProduct: "Cast Iron Skillet 12-inch",
    alsoFrequentlyBought: "Silicone Kitchen Utensil Set",
    combinationRate: "31%",
    opportunity: "Cross-promote in A+ content",
  },
  {
    id: 3,
    purchasedProduct: "Glass Meal Prep Containers (10-Set)",
    alsoFrequentlyBought: "Linen Dish Towels (6-Pack)",
    combinationRate: "18%",
    opportunity: "Sponsored Display retargeting",
  },
  {
    id: 4,
    purchasedProduct: "Ceramic Spice Jars Set (24 pcs)",
    alsoFrequentlyBought: "Bamboo Dish Rack",
    combinationRate: "27%",
    opportunity: "Virtual bundle candidate",
  },
];

const marketBasketColumns: DataTableColumn<MarketBasketRow>[] = [
  {
    key: "purchasedProduct",
    header: "Purchased Product",
    sortable: false,
    render: (row) => <span className="text-sm font-medium">{row.purchasedProduct}</span>,
  },
  {
    key: "alsoFrequentlyBought",
    header: "Also Frequently Bought",
    sortable: false,
    render: (row) => <span className="text-sm">{row.alsoFrequentlyBought}</span>,
  },
  {
    key: "combinationRate",
    header: "Combination Rate",
    sortable: false,
    render: (row) => (
      <span className="text-sm font-semibold text-[#146EB4]">{row.combinationRate}</span>
    ),
  },
  {
    key: "opportunity",
    header: "Action / Opportunity",
    sortable: false,
    render: (row) => (
      <span className="inline-flex items-center rounded-md bg-green-50 border border-green-200 px-2 py-0.5 text-xs font-medium text-green-800">
        {row.opportunity}
      </span>
    ),
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg shadow-lg p-3 text-sm">
        <div className="font-medium mb-1 max-w-[180px]">{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.fill || p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-medium">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BrandAnalytics() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Brand Analytics"
        breadcrumbs={[{ label: "Advertising" }, { label: "Brand Analytics" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Brand Analytics — Brand Registry Exclusive"
          description="Brand Analytics gives brand-registered sellers unique insight into how shoppers search and buy on Amazon. You can see the top search terms in your category, how your ASINs rank for those terms, and which of your products are frequently purchased together (Market Basket Analysis). This data is available only to sellers enrolled in Amazon Brand Registry."
          whyItMatters="Knowing the exact search terms shoppers use to find products like yours — even before they discover your brand — lets you optimize listings and ad campaigns far more precisely than guessing. Market Basket data reveals natural bundle and cross-sell opportunities you can act on through A+ content, virtual bundles, or Sponsored Display ads."
        />

        {/* Brand Registry badge */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 w-fit">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Brand Registry Active</span>
          <StatusBadge status="active" label="Verified" />
        </div>

        {/* Search Term Performance */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="font-semibold text-base">Search Term Performance</h2>
            <span className="text-xs text-muted-foreground bg-gray-100 rounded px-2 py-0.5">
              Reporting period: Jul 1–31, 2026
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Top search terms driving clicks and conversions to your brand's products.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={searchTermData}
              margin={{ top: 5, right: 20, left: 0, bottom: 60 }}
              barCategoryGap="30%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="term"
                tick={{ fontSize: 11 }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "16px" }} />
              <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#146EB4" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="right" dataKey="conversions" name="Conversions" fill="#22c55e" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
            {[
              { label: "Top Term",            value: "bamboo cutting board" },
              { label: "Best CVR",            value: "ceramic spice jars set (8.8%)" },
              { label: "Avg. Conv. Rate",     value: `${(searchTermData.reduce((s, d) => s + d.cvr, 0) / searchTermData.length).toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                <div className="text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Basket Analysis */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold text-base mb-1">Market Basket Analysis</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Products from your catalog that shoppers frequently purchase together in the same session.
            The combination rate shows what % of buyers of the first product also purchased the second.
          </p>
          <DataTable columns={marketBasketColumns} data={marketBasketData} />
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            <strong className="text-foreground">How to use this:</strong> High combination rates above 20% are strong signals to create
            virtual bundles, add cross-sell callouts in A+ content, or target buyers of complementary products
            with Sponsored Display ads.
          </div>
        </div>

        {/* Repeat Purchase Behavior note */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold text-base mb-3">Repeat Purchase Behavior</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New-to-Brand Customers",    value: "74%", desc: "of buyers purchased your brand for the first time" },
              { label: "Repeat Purchase Rate",       value: "26%", desc: "of buyers returned within 90 days" },
              { label: "Avg. Order Value (Repeat)",  value: "$52.40", desc: "repeat buyers spend 38% more per order" },
              { label: "Top Repeat Product",         value: "Linen Dish Towels", desc: "highest repeat purchase rate in catalog" },
            ].map(({ label, value, desc }) => (
              <div key={label} className="border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="text-2xl font-bold text-[#146EB4]">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
