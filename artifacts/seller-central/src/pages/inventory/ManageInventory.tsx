import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

interface InventoryItem {
  id: number;
  product: string;
  sku: string;
  fulfilledBy: "FBA" | "FBM";
  available: number;
  inbound: number | null;
  reserved: number;
  ipiFlag: boolean;
}

const inventoryData: InventoryItem[] = [
  { id: 1, product: "Bamboo Cutting Board Set (3-Pack)", sku: "ACH-BCB-003", fulfilledBy: "FBA", available: 142, inbound: 50, reserved: 12, ipiFlag: false },
  { id: 2, product: "Silicone Kitchen Utensil Set", sku: "ACH-SKU-007", fulfilledBy: "FBA", available: 87, inbound: 0, reserved: 5, ipiFlag: false },
  { id: 3, product: "Cast Iron Skillet 12-inch", sku: "ACH-CIS-012", fulfilledBy: "FBM", available: 34, inbound: null, reserved: 2, ipiFlag: false },
  { id: 4, product: "Stainless Steel Mixing Bowls", sku: "ACH-SMB-004", fulfilledBy: "FBA", available: 56, inbound: 100, reserved: 8, ipiFlag: false },
  { id: 5, product: "Copper Moscow Mule Mugs (Set of 4)", sku: "ACH-CMM-006", fulfilledBy: "FBA", available: 203, inbound: 0, reserved: 14, ipiFlag: false },
  { id: 6, product: "Herb Garden Window Kit", sku: "ACH-HGW-009", fulfilledBy: "FBM", available: 7, inbound: null, reserved: 0, ipiFlag: true },
  { id: 7, product: "Linen Dish Towels (6-Pack)", sku: "ACH-LDT-002", fulfilledBy: "FBA", available: 7, inbound: 200, reserved: 1, ipiFlag: true },
  { id: 8, product: "Wooden Salad Bowl Set", sku: "ACH-WSB-015", fulfilledBy: "FBM", available: 29, inbound: null, reserved: 3, ipiFlag: false },
  { id: 9, product: "Magnetic Knife Strip 16-inch", sku: "ACH-MKS-013", fulfilledBy: "FBA", available: 61, inbound: 0, reserved: 6, ipiFlag: false },
  { id: 10, product: "Ceramic Spice Jars Set (24 pcs)", sku: "ACH-CSJ-001", fulfilledBy: "FBA", available: 4, inbound: 150, reserved: 0, ipiFlag: true },
];

export default function ManageInventory() {
  const columns: DataTableColumn<InventoryItem>[] = [
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
      key: "fulfilledBy",
      header: "Fulfilled By",
      sortable: false,
      render: (row) => (
        <span
          className={`text-xs px-2 py-0.5 rounded font-medium ${
            row.fulfilledBy === "FBA"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.fulfilledBy}
        </span>
      ),
    },
    {
      key: "available",
      header: "Available",
      sortable: true,
      render: (row) => (
        <span className={row.available < 10 ? "font-bold text-red-600" : ""}>
          {row.available}
        </span>
      ),
    },
    {
      key: "inbound",
      header: "Inbound (FBA)",
      sortable: false,
      render: (row) => <span>{row.inbound !== null ? row.inbound : "—"}</span>,
    },
    {
      key: "reserved",
      header: "Reserved",
      sortable: false,
      render: (row) => <span>{row.reserved}</span>,
    },
    {
      key: "ipiFlag",
      header: "IPI Flag",
      sortable: false,
      render: (row) =>
        row.ipiFlag ? (
          <StatusBadge status="warning" label="Low Stock" />
        ) : (
          <span>—</span>
        ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Manage Inventory"
        breadcrumbs={[{ label: "Inventory" }, { label: "Manage Inventory" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Manage Inventory"
          description="This page gives you a real-time view of your available inventory across all your listings. You can update quantities for merchant-fulfilled (FBM) products, see what's available in Amazon's warehouses (FBA), and identify items running low before they go out of stock."
          whyItMatters="Running out of stock kills your sales velocity and can drop your search ranking. Monitoring this page weekly — or setting up restock alerts — is a core habit of successful sellers."
        />

        <DataTable columns={columns} data={inventoryData} />
      </div>
    </div>
  );
}
