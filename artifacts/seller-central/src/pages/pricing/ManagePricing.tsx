import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  title: string;
  asin: string;
  sku: string;
  yourPrice: number;
  buyBoxPrice: number;
  winningBuyBox: boolean;
}

const products: Product[] = [
  { id: 1, title: "Bamboo Cutting Board Set (3-Pack)", asin: "B08XK2VQPN", sku: "ACH-BCB-003", yourPrice: 34.99, buyBoxPrice: 33.50, winningBuyBox: true },
  { id: 2, title: "Silicone Kitchen Utensil Set", asin: "B09MN3KPLR", sku: "ACH-SKU-007", yourPrice: 28.49, buyBoxPrice: 28.49, winningBuyBox: true },
  { id: 3, title: "Cast Iron Skillet 12-inch", asin: "B07ZQR8LMP", sku: "ACH-CIS-012", yourPrice: 49.95, buyBoxPrice: 47.00, winningBuyBox: false },
  { id: 4, title: "Stainless Steel Mixing Bowls", asin: "B08TLNQKFV", sku: "ACH-SMB-004", yourPrice: 42.00, buyBoxPrice: 42.00, winningBuyBox: true },
  { id: 5, title: "Bamboo Dish Rack", asin: "B09KLP2MNQ", sku: "ACH-BDR-011", yourPrice: 31.99, buyBoxPrice: 29.95, winningBuyBox: false },
  { id: 6, title: "Copper Moscow Mule Mugs (Set of 4)", asin: "B08YRTPQLN", sku: "ACH-CMM-006", yourPrice: 38.00, buyBoxPrice: 38.00, winningBuyBox: true },
  { id: 7, title: "Herb Garden Window Kit", asin: "B09XTVMNKP", sku: "ACH-HGW-009", yourPrice: 22.95, buyBoxPrice: 21.00, winningBuyBox: false },
  { id: 8, title: "Linen Dish Towels (6-Pack)", asin: "B07RQPLNMK", sku: "ACH-LDT-002", yourPrice: 19.99, buyBoxPrice: 19.99, winningBuyBox: true },
  { id: 9, title: "Wooden Salad Bowl Set", asin: "B08KNTQLPV", sku: "ACH-WSB-015", yourPrice: 54.00, buyBoxPrice: 52.00, winningBuyBox: false },
  { id: 10, title: "Glass Meal Prep Containers (10-Set)", asin: "B09MNPKLQT", sku: "ACH-GMP-008", yourPrice: 36.50, buyBoxPrice: 36.50, winningBuyBox: true },
  { id: 11, title: "Magnetic Knife Strip 16-inch", asin: "B08RQPLNKM", sku: "ACH-MKS-013", yourPrice: 27.99, buyBoxPrice: 26.50, winningBuyBox: false },
  { id: 12, title: "Ceramic Spice Jars Set (24 pcs)", asin: "B09YZPMLQK", sku: "ACH-CSJ-001", yourPrice: 44.95, buyBoxPrice: 44.95, winningBuyBox: true },
];

export default function ManagePricing() {
  const winningCount = products.filter(p => p.winningBuyBox).length;
  const notWinningCount = products.length - winningCount;
  const avgPrice = (products.reduce((sum, p) => sum + p.yourPrice, 0) / products.length).toFixed(2);

  const columns: DataTableColumn<Product>[] = [
    {
      key: "title",
      header: "Product",
      sortable: false,
      render: (row) => (
        <div>
          <div className="font-medium text-sm truncate max-w-xs">{row.title}</div>
          <div className="text-xs text-muted-foreground font-mono">{row.asin}</div>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      sortable: false,
      render: (row) => <span className="text-xs font-mono text-muted-foreground">{row.sku}</span>,
    },
    {
      key: "yourPrice",
      header: "Your Price",
      sortable: true,
      render: (row) => (
        <div className="space-y-1">
          <div className="font-medium">${row.yourPrice.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Edit price:</div>
          <Input
            defaultValue={row.yourPrice.toFixed(2)}
            onChange={() => {}}
            className="h-7 text-xs w-24"
            data-testid={`input-edit-price-${row.id}`}
          />
        </div>
      ),
    },
    {
      key: "buyBoxPrice",
      header: "Buy Box Price",
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-sm">${row.buyBoxPrice.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Lowest: ${row.buyBoxPrice.toFixed(2)}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Buy Box Status",
      sortable: false,
      render: (row) => (
        <StatusBadge
          status={row.winningBuyBox ? "active" : "warning"}
          label={row.winningBuyBox ? "Winning Buy Box" : "Not Winning"}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Manage Pricing"
        breadcrumbs={[{ label: "Pricing" }, { label: "Manage Pricing" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Manage Pricing"
          description="This page lets you view and update the price of each of your listings. Amazon compares your price to other sellers offering the same product to determine who wins the Buy Box — the prominent 'Add to Cart' button on the product page. Only one seller wins it at a time."
          whyItMatters="Roughly 80–90% of Amazon sales go through the Buy Box. If you are not winning it, you are effectively invisible to most shoppers — even if your listing is active."
        />

        <div className="flex gap-4">
          <div className="bg-white rounded-lg border px-4 py-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 inline-block"></div>
              {winningCount} of {products.length} Winning Buy Box
            </div>
          </div>
          <div className="bg-white rounded-lg border px-4 py-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-amber-500 inline-block"></div>
              {notWinningCount} Not Winning
            </div>
          </div>
          <div className="bg-white rounded-lg border px-4 py-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-500 inline-block"></div>
              Avg. Your Price: ${avgPrice}
            </div>
          </div>
        </div>

        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
