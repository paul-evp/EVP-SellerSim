import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orders, OrderStatus } from "@/data/orders";
import { CheckCircle, ArrowLeft, Package, MapPin, Truck } from "lucide-react";

const statusMap: Record<OrderStatus, { status: "pending" | "info" | "active" | "inactive"; label: string }> = {
  Pending:   { status: "pending",  label: "Pending" },
  Shipped:   { status: "info",     label: "Shipped" },
  Delivered: { status: "active",   label: "Delivered" },
  Cancelled: { status: "inactive", label: "Cancelled" },
};

export default function OrderDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [carrier, setCarrier] = useState("ups");
  const [tracking, setTracking] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const order = orders.find((o) => o.id === decodeURIComponent(params.id ?? ""));

  if (!order) {
    return (
      <div className="bg-[#F3F3F3] min-h-screen p-6">
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Order not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/orders/manage")}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const s = statusMap[order.status];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title={`Order ${order.id}`}
        breadcrumbs={[
          { label: "Orders" },
          { label: "Manage Orders", href: "/orders/manage" },
          { label: order.id },
        ]}
        actions={
          <Button
            variant="outline"
            onClick={() => navigate("/orders/manage")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Order Details & Shipment Confirmation"
          description="For FBM orders, you must confirm shipment — enter the carrier and tracking number after you've physically shipped the package. Amazon shares this with the buyer so they can track their package. For FBA orders, Amazon confirms shipment automatically; you won't see this form for FBA."
          whyItMatters="Confirming shipment on time is legally required under Amazon's Seller Agreement. Late confirmation (even if you shipped on time) contributes to your Late Shipment Rate and can trigger buyer A-to-Z claims."
        />

        {/* Status banner */}
        <div className="flex items-center gap-3 bg-white rounded-lg border px-5 py-3">
          <StatusBadge status={s.status} label={s.label} />
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm">Ship by: <strong className="text-amber-700">{order.shipBy}</strong></span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm">
            Fulfillment:&nbsp;
            <span className={`font-semibold ${order.fulfillment === "FBA" ? "text-[#146EB4]" : "text-gray-700"}`}>
              {order.fulfillment}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Order & Buyer info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Buyer info */}
            <div className="bg-white rounded-lg border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-semibold">Shipping Address</h2>
              </div>
              <div className="text-sm space-y-0.5">
                <div className="font-medium">{order.buyerName}</div>
                <div className="text-muted-foreground">{order.buyerAddress}</div>
                <div className="text-muted-foreground">{order.buyerCity}, {order.buyerState} {order.buyerZip}</div>
                <div className="text-muted-foreground">United States</div>
              </div>
              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded p-2">
                Buyer contact information is anonymized by Amazon. You communicate through Amazon's messaging system only.
              </div>
            </div>

            {/* Item details */}
            <div className="bg-white rounded-lg border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-semibold">Order Items</h2>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{order.product}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5">ASIN: {order.asin}</div>
                  <div className="text-xs text-muted-foreground font-mono">SKU: {order.sku}</div>
                  <div className="mt-2 flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Qty: </span>
                      <span className="font-medium">{order.qty}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unit Price: </span>
                      <span className="font-medium">${order.price.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-semibold">${(order.price * order.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Item Subtotal</div>
                  <div className="font-medium">${(order.price * order.qty).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Amazon Fees (est.)</div>
                  <div className="font-medium text-red-600">−${(order.price * order.qty * 0.15).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Est. Proceeds</div>
                  <div className="font-semibold text-green-700">${(order.price * order.qty * 0.85).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Confirm Shipment */}
          <div>
            <div className="bg-white rounded-lg border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-semibold">Confirm Shipment</h2>
              </div>

              {order.fulfillment === "FBA" ? (
                <div className="text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded p-3">
                  This is an <strong>FBA order</strong>. Amazon fulfills and ships it on your behalf — no action needed from you.
                </div>
              ) : order.status === "Cancelled" ? (
                <div className="text-sm text-muted-foreground bg-gray-50 border border-gray-200 rounded p-3">
                  This order has been cancelled. No shipment confirmation is required.
                </div>
              ) : confirmed || order.status === "Shipped" || order.status === "Delivered" ? (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                  <div className="font-semibold text-green-700">Shipment Confirmed</div>
                  {(order.carrier || carrier) && (
                    <div className="text-xs text-muted-foreground">
                      {order.carrier ?? carrier.toUpperCase()} · {(order.trackingNumber ?? tracking) || "—"}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="carrier">Carrier</Label>
                    <Select value={carrier} onValueChange={setCarrier}>
                      <SelectTrigger id="carrier" data-testid="select-carrier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ups">UPS</SelectItem>
                        <SelectItem value="usps">USPS</SelectItem>
                        <SelectItem value="fedex">FedEx</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tracking">Tracking Number</Label>
                    <Input
                      id="tracking"
                      placeholder="Enter tracking number"
                      value={tracking}
                      onChange={(e) => setTracking(e.target.value)}
                      data-testid="input-tracking-number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ship-date">Ship Date</Label>
                    <Input
                      id="ship-date"
                      type="date"
                      defaultValue="2026-08-01"
                      data-testid="input-ship-date"
                    />
                  </div>

                  <Button
                    className="w-full bg-[#146EB4] hover:bg-[#0F5A92]"
                    disabled={!tracking}
                    onClick={() => setConfirmed(true)}
                    data-testid="button-confirm-shipment"
                  >
                    Confirm Shipment
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Buyer will be notified and receive tracking details automatically.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
