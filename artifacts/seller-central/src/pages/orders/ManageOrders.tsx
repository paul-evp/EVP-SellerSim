import { useState } from "react";
import { useLocation } from "wouter";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders, Order, OrderStatus } from "@/data/orders";

const statusMap: Record<OrderStatus, { status: "pending" | "info" | "active" | "inactive"; label: string }> = {
  Pending:   { status: "pending",  label: "Pending" },
  Shipped:   { status: "info",     label: "Shipped" },
  Delivered: { status: "active",   label: "Delivered" },
  Cancelled: { status: "inactive", label: "Cancelled" },
};

export default function ManageOrders() {
  const [, navigate] = useLocation();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const pending   = orders.filter(o => o.status === "Pending").length;
  const shipped   = orders.filter(o => o.status === "Shipped").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;

  const columns: DataTableColumn<Order>[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: false,
      render: (row) => (
        <span className="font-mono text-xs text-[#146EB4]">{row.id}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: false,
      render: (row) => <span className="text-sm">{row.date}</span>,
    },
    {
      key: "buyerName",
      header: "Buyer",
      sortable: false,
      render: (row) => (
        <div>
          <div className="text-sm font-medium">{row.buyerName}</div>
          <div className="text-xs text-muted-foreground">{row.buyerCity}, {row.buyerState}</div>
        </div>
      ),
    },
    {
      key: "product",
      header: "Product",
      sortable: false,
      render: (row) => (
        <div>
          <div className="text-sm font-medium max-w-[200px] truncate">{row.product}</div>
          <div className="text-xs text-muted-foreground">Qty: {row.qty} · {row.fulfillment}</div>
        </div>
      ),
    },
    {
      key: "shipBy",
      header: "Ship By",
      sortable: false,
      render: (row) => {
        const isLate = row.status === "Pending";
        return (
          <span className={isLate ? "text-sm font-semibold text-amber-700" : "text-sm"}>
            {row.shipBy}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: false,
      render: (row) => {
        const s = statusMap[row.status];
        return <StatusBadge status={s.status} label={s.label} />;
      },
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/orders/${encodeURIComponent(row.id)}`)}
          data-testid={`button-view-order-${row.id}`}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Manage Orders"
        breadcrumbs={[{ label: "Orders" }, { label: "Manage Orders" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Manage Orders"
          description="This page shows all of your incoming and recent orders. For FBM (Fulfilled by Merchant) orders, you are responsible for picking, packing, and shipping within the required ship-by window — usually 1–2 business days. For FBA (Fulfilled by Amazon) orders, Amazon handles all of that automatically from their warehouse."
          whyItMatters="Missing a ship-by deadline hurts your Late Shipment Rate, which is a key Account Health metric. If it rises above 4%, Amazon can restrict or suspend your selling privileges. FBA orders have no ship-by risk for you — but FBM orders require daily attention."
        />

        {/* Summary chips */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: `${pending} Pending`, color: "bg-purple-100 text-purple-800 border-purple-200", filter: "Pending" },
            { label: `${shipped} Shipped`, color: "bg-blue-100 text-blue-800 border-blue-200", filter: "Shipped" },
            { label: `${delivered} Delivered`, color: "bg-green-100 text-green-800 border-green-200", filter: "Delivered" },
            { label: `${cancelled} Cancelled`, color: "bg-gray-100 text-gray-700 border-gray-200", filter: "Cancelled" },
          ].map((chip) => (
            <button
              key={chip.filter}
              onClick={() => setStatusFilter(statusFilter === chip.filter ? "all" : chip.filter)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-all
                ${chip.color}
                ${statusFilter === chip.filter ? "ring-2 ring-offset-1 ring-[#146EB4]" : ""}
              `}
              data-testid={`chip-${chip.filter.toLowerCase()}`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Filter by status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44" data-testid="select-status-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground ml-auto">
            Showing {filtered.length} of {orders.length} orders
          </span>
        </div>

        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}
