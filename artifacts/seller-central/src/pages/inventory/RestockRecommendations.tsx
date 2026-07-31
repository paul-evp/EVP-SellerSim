import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

interface RestockItem {
  id: number;
  product: string;
  sku: string;
  daysOfSupply: number;
  salesPerDay: number;
  inStock: number;
  reorderQty: number;
}

const restockData: RestockItem[] = [
  { id: 1, product: "Linen Dish Towels (6-Pack)", sku: "ACH-LDT-002", daysOfSupply: 7, salesPerDay: 1.2, inStock: 7, reorderQty: 200 },
  { id: 2, product: "Herb Garden Window Kit", sku: "ACH-HGW-009", daysOfSupply: 0, salesPerDay: 0.8, inStock: 7, reorderQty: 150 },
  { id: 3, product: "Ceramic Spice Jars Set (24 pcs)", sku: "ACH-CSJ-001", daysOfSupply: 3, salesPerDay: 1.5, inStock: 4, reorderQty: 300 },
  { id: 4, product: "Cast Iron Skillet 12-inch", sku: "ACH-CIS-012", daysOfSupply: 28, salesPerDay: 1.2, inStock: 34, reorderQty: 50 },
  { id: 5, product: "Wooden Salad Bowl Set", sku: "ACH-WSB-015", daysOfSupply: 24, salesPerDay: 1.3, inStock: 29, reorderQty: 80 },
];

export default function RestockRecommendations() {
  const columns: DataTableColumn<RestockItem>[] = [
    {
      key: "product",
      header: "Product",
      sortable: false,
      render: (row) => (
        <div>
          <div className="font-medium text-sm">{row.product}</div>
          <div className="text-xs font-mono text-muted-foreground">{row.sku}</div>
        </div>
      ),
    },
    {
      key: "daysOfSupply",
      header: "Days of Supply",
      sortable: true,
      render: (row) => {
        let colorClass = "text-green-600 font-bold";
        if (row.daysOfSupply < 15) colorClass = "text-red-600 font-bold";
        else if (row.daysOfSupply >= 15 && row.daysOfSupply <= 30)
          colorClass = "text-amber-600 font-bold";

        return <span className={colorClass}>{row.daysOfSupply}</span>;
      },
    },
    {
      key: "salesPerDay",
      header: "Sales / Day",
      sortable: true,
      render: (row) => <span>{row.salesPerDay} units</span>,
    },
    {
      key: "inStock",
      header: "In Stock",
      sortable: false,
      render: (row) => <span>{row.inStock}</span>,
    },
    {
      key: "reorderQty",
      header: "Reorder Qty",
      sortable: false,
      render: (row) => (
        <span className="font-semibold text-blue-700">{row.reorderQty}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      sortable: false,
      render: () => (
        <Button variant="outline" size="sm" data-testid="button-order-now">
          Order Now
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Restock Recommendations"
        breadcrumbs={[{ label: "Inventory" }, { label: "Restock Recommendations" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Restock Recommendations"
          description="Amazon analyzes your sales velocity, lead times, and current stock levels to recommend when and how much to reorder. This page surfaces the products most at risk of going out of stock before your next replenishment arrives."
          whyItMatters="Going out of stock on a strong-performing ASIN can take weeks to recover in ranking. Restocking proactively — using Amazon's recommended quantities as a starting point — protects your sales momentum."
        />

        <DataTable columns={columns} data={restockData} />
      </div>
    </div>
  );
}
