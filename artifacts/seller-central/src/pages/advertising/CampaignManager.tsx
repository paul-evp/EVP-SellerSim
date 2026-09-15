import { useState } from "react";
import { useLocation } from "wouter";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  type: "Sponsored Products" | "Sponsored Brands" | "Sponsored Display";
  status: "Active" | "Paused" | "Ended";
  dailyBudget: number;
  spend: number;
  sales: number;
  impressions: number;
  clicks: number;
  acos: number;
}

const campaigns: Campaign[] = [
  {
    id: "camp-001",
    name: "Kitchen Essentials — Auto",
    type: "Sponsored Products",
    status: "Active",
    dailyBudget: 25.00,
    spend: 312.47,
    sales: 1840.00,
    impressions: 48200,
    clicks: 523,
    acos: 16.9,
  },
  {
    id: "camp-002",
    name: "Cast Iron Skillet — Exact KW",
    type: "Sponsored Products",
    status: "Active",
    dailyBudget: 15.00,
    spend: 198.30,
    sales: 594.75,
    impressions: 21400,
    clicks: 287,
    acos: 33.3,
  },
  {
    id: "camp-003",
    name: "EVP Sarisari Store — Brand Defense",
    type: "Sponsored Brands",
    status: "Active",
    dailyBudget: 20.00,
    spend: 245.10,
    sales: 980.40,
    impressions: 63000,
    clicks: 812,
    acos: 25.0,
  },
  {
    id: "camp-004",
    name: "Bamboo Products — Retargeting",
    type: "Sponsored Display",
    status: "Paused",
    dailyBudget: 10.00,
    spend: 87.50,
    sales: 174.99,
    impressions: 92100,
    clicks: 143,
    acos: 50.0,
  },
];

const typeColors: Record<Campaign["type"], string> = {
  "Sponsored Products": "bg-blue-100 text-blue-800 border-blue-200",
  "Sponsored Brands":   "bg-purple-100 text-purple-800 border-purple-200",
  "Sponsored Display":  "bg-teal-100 text-teal-800 border-teal-200",
};

function AcosBadge({ acos }: { acos: number }) {
  if (acos < 20) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
        <TrendingDown className="w-3 h-3" />
        {acos.toFixed(1)}%
      </span>
    );
  }
  if (acos <= 35) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <Minus className="w-3 h-3" />
        {acos.toFixed(1)}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
      <TrendingUp className="w-3 h-3" />
      {acos.toFixed(1)}%
    </span>
  );
}

export default function CampaignManager() {
  const [, navigate] = useLocation();

  const totalSpend  = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalSales  = campaigns.reduce((s, c) => s + c.sales, 0);
  const overallAcos = (totalSpend / totalSales) * 100;
  const activeCount = campaigns.filter(c => c.status === "Active").length;

  const columns: DataTableColumn<Campaign>[] = [
    {
      key: "name",
      header: "Campaign",
      sortable: false,
      render: (row) => (
        <div>
          <div className="font-medium text-sm">{row.name}</div>
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border mt-1",
            typeColors[row.type]
          )}>
            {row.type}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: false,
      render: (row) => (
        <StatusBadge
          status={row.status === "Active" ? "active" : row.status === "Paused" ? "warning" : "inactive"}
          label={row.status}
        />
      ),
    },
    {
      key: "dailyBudget",
      header: "Daily Budget",
      sortable: true,
      render: (row) => <span className="text-sm">${row.dailyBudget.toFixed(2)}</span>,
    },
    {
      key: "spend",
      header: "Spend (MTD)",
      sortable: true,
      render: (row) => <span className="text-sm font-medium">${row.spend.toFixed(2)}</span>,
    },
    {
      key: "sales",
      header: "Ad Sales (MTD)",
      sortable: true,
      render: (row) => <span className="text-sm font-medium text-green-700">${row.sales.toFixed(2)}</span>,
    },
    {
      key: "impressions",
      header: "Impressions",
      sortable: true,
      render: (row) => <span className="text-sm">{row.impressions.toLocaleString()}</span>,
    },
    {
      key: "clicks",
      header: "Clicks",
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm">{row.clicks.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">CTR: {((row.clicks / row.impressions) * 100).toFixed(2)}%</div>
        </div>
      ),
    },
    {
      key: "acos",
      header: "ACOS",
      sortable: true,
      render: (row) => <AcosBadge acos={row.acos} />,
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      render: (row) => (
        <Button variant="outline" size="sm" data-testid={`button-edit-${row.id}`}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Campaign Manager"
        breadcrumbs={[{ label: "Advertising" }, { label: "Campaign Manager" }]}
        actions={
          <Button
            className="bg-[#146EB4] hover:bg-[#0F5A92] text-white"
            onClick={() => navigate("/advertising/create")}
            data-testid="button-create-campaign"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        }
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Understanding ACOS (Advertising Cost of Sale)"
          description="ACOS is your ad spend divided by ad-attributed sales, expressed as a percentage. For example, if you spent $20 in ads and made $100 in sales from those ads, your ACOS is 20%. Lower is generally better — but the right ACOS target depends on your profit margin. A product with a 40% margin can sustain a higher ACOS than one with a 15% margin."
          whyItMatters="ACOS is the primary dial sellers use to judge campaign efficiency. A green ACOS (<20%) means ads are very efficient. Amber (20–35%) is typical for competitive categories. Red (>35%) means you may be spending more on ads than you're profiting — you should pause or optimize those campaigns."
        />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Campaigns",  value: `${activeCount}`,                          sub: `of ${campaigns.length} total` },
            { label: "Total Spend (MTD)", value: `$${totalSpend.toFixed(2)}`,               sub: "this month" },
            { label: "Ad Sales (MTD)",    value: `$${totalSales.toFixed(2)}`,               sub: "attributed to ads" },
            { label: "Blended ACOS",      value: `${overallAcos.toFixed(1)}%`,              sub: "all campaigns" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border px-5 py-4 shadow-sm">
              <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* ACOS legend */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> ACOS &lt;20% — Efficient
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> 20–35% — Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> &gt;35% — Needs Attention
          </span>
        </div>

        <DataTable columns={columns} data={campaigns} />
      </div>
    </div>
  );
}
