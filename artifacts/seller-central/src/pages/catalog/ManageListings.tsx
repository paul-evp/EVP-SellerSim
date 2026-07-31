import { useState } from "react";
import { useLocation } from "wouter";
import { Package, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  title: string;
  asin: string;
  sku: string;
  price: string;
  status: "active" | "inactive" | "incomplete";
  qty: number;
}

const products: Product[] = [
  { id: 1, title: "Bamboo Cutting Board Set (3-Pack)", asin: "B08XK2VQPN", sku: "ACH-BCB-003", price: "$34.99", status: "active", qty: 142 },
  { id: 2, title: "Silicone Kitchen Utensil Set", asin: "B09MN3KPLR", sku: "ACH-SKU-007", price: "$28.49", status: "active", qty: 87 },
  { id: 3, title: "Cast Iron Skillet 12-inch", asin: "B07ZQR8LMP", sku: "ACH-CIS-012", price: "$49.95", status: "active", qty: 34 },
  { id: 4, title: "Stainless Steel Mixing Bowls", asin: "B08TLNQKFV", sku: "ACH-SMB-004", price: "$42.00", status: "active", qty: 56 },
  { id: 5, title: "Bamboo Dish Rack", asin: "B09KLP2MNQ", sku: "ACH-BDR-011", price: "$31.99", status: "inactive", qty: 0 },
  { id: 6, title: "Copper Moscow Mule Mugs (Set of 4)", asin: "B08YRTPQLN", sku: "ACH-CMM-006", price: "$38.00", status: "active", qty: 203 },
  { id: 7, title: "Herb Garden Window Kit", asin: "B09XTVMNKP", sku: "ACH-HGW-009", price: "$22.95", status: "incomplete", qty: 0 },
  { id: 8, title: "Linen Dish Towels (6-Pack)", asin: "B07RQPLNMK", sku: "ACH-LDT-002", price: "$19.99", status: "active", qty: 7 },
  { id: 9, title: "Wooden Salad Bowl Set", asin: "B08KNTQLPV", sku: "ACH-WSB-015", price: "$54.00", status: "active", qty: 29 },
  { id: 10, title: "Glass Meal Prep Containers (10-Set)", asin: "B09MNPKLQT", sku: "ACH-GMP-008", price: "$36.50", status: "inactive", qty: 0 },
  { id: 11, title: "Magnetic Knife Strip 16-inch", asin: "B08RQPLNKM", sku: "ACH-MKS-013", price: "$27.99", status: "active", qty: 61 },
  { id: 12, title: "Ceramic Spice Jars Set (24 pcs)", asin: "B09YZPMLQK", sku: "ACH-CSJ-001", price: "$44.95", status: "incomplete", qty: 0 },
];

export default function ManageListings() {
  const [, setLocation] = useLocation();

  const columns: DataTableColumn<Product>[] = [
    {
      key: "image",
      header: "Image",
      sortable: false,
      render: () => (
        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
          <Package className="w-5 h-5 text-gray-400" />
        </div>
      ),
    },
    {
      key: "title",
      header: "Product Title",
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-sm max-w-xs truncate">{row.title}</div>
          <div className="text-xs text-muted-foreground">{row.asin}</div>
        </div>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      sortable: false,
      render: (row) => <span className="text-xs font-mono">{row.sku}</span>,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (row) => <span className="font-medium">{row.price}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: false,
      render: (row) => {
        const statusMap = {
          active: { status: "active" as const, label: "Active" },
          inactive: { status: "inactive" as const, label: "Inactive" },
          incomplete: { status: "warning" as const, label: "Incomplete" },
        };
        const { status, label } = statusMap[row.status];
        return <StatusBadge status={status} label={label} />;
      },
    },
    {
      key: "qty",
      header: "Qty",
      sortable: true,
      render: (row) => (
        <span className={row.qty < 10 ? "font-bold text-red-600" : ""}>
          {row.qty}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Manage All Listings"
        breadcrumbs={[
          { label: "Catalog", href: "/catalog" },
          { label: "Manage All Listings" },
        ]}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/catalog/add-product")}
            data-testid="button-add-product"
          >
            Add a Product
          </Button>
        }
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Manage All Listings"
          description="This page shows every product listing tied to your seller account — active, inactive, and incomplete. You can edit listing details, fix suppressed listings, change prices, and update inventory quantities from here."
          whyItMatters="Keeping all your listings in 'Active' status is essential — suppressed or incomplete listings won't appear in Amazon search results, meaning zero sales for those products."
        />

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, SKU, or ASIN"
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48" data-testid="select-status-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
