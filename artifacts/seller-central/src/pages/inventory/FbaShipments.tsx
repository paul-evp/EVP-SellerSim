import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Shipment {
  name: string;
  id: string;
  status: "active" | "info" | "warning" | "pending";
  statusLabel: string;
  fc: string;
  units: number;
  created: string;
  progress: number;
}

const shipments: Shipment[] = [
  { name: "Shipment FBA-ACH-001", id: "FBA15XK2NP", status: "active", statusLabel: "Delivered", fc: "PHX3 - Phoenix, AZ", units: 48, created: "Jun 12, 2026", progress: 100 },
  { name: "Shipment FBA-ACH-002", id: "FBA15XK3QR", status: "info", statusLabel: "In Transit", fc: "LAS1 - Las Vegas, NV", units: 120, created: "Jul 8, 2026", progress: 65 },
  { name: "Shipment FBA-ACH-003", id: "FBA15XK4ST", status: "warning", statusLabel: "Shipped", fc: "ONT8 - Ontario, CA", units: 72, created: "Jul 18, 2026", progress: 30 },
  { name: "Shipment FBA-ACH-004", id: "FBA15XK5UV", status: "pending", statusLabel: "Working", fc: "DEN2 - Denver, CO", units: 200, created: "Jul 28, 2026", progress: 10 },
];

export default function FbaShipments() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="FBA Shipments"
        breadcrumbs={[{ label: "Inventory" }, { label: "FBA Shipments" }]}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#146EB4] hover:bg-[#0F5A92]"
                data-testid="button-create-shipment"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Shipment
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-create-shipment">
              <DialogHeader>
                <DialogTitle>Create Inbound Shipment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-bold">1. Set Quantity</span> — Enter the
                    products and quantities you plan to send to Amazon.
                  </div>
                  <div>
                    <span className="font-bold">2. Prepare Products</span> — Apply
                    FNSKU labels to each unit per Amazon's requirements.
                  </div>
                  <div>
                    <span className="font-bold">3. Prepare Shipment</span> — Choose
                    your shipping method (small parcel or LTL freight) and carrier.
                  </div>
                  <div>
                    <span className="font-bold">4. Review & Print Labels</span> —
                    Download and print box labels for each carton in your shipment.
                  </div>
                  <div>
                    <span className="font-bold">5. Ship & Track</span> — Drop off with
                    your carrier and track the shipment as Amazon receives it.
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
                  This is a training simulation. In real Seller Central, this process
                  takes 20–45 minutes and requires a printer for FNSKU and box labels.
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    data-testid="button-close-dialog"
                  >
                    Close
                  </Button>
                  <Button disabled data-testid="button-start-shipment">
                    Start Shipment (Simulation Only)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="FBA Shipments"
          description="When you sell with FBA (Fulfilled by Amazon), you ship your products in bulk to Amazon's fulfillment centers. This page tracks each inbound shipment — from packing your boxes at home, to Amazon receiving and stocking them in their warehouse."
          whyItMatters="FBA shipments must follow Amazon's strict packaging and labeling requirements. A rejected or lost shipment delays your inventory going live and can result in extra fees."
        />

        <div className="grid gap-4">
          {shipments.map((shipment, idx) => (
            <div
              key={shipment.id}
              className="bg-card rounded-lg border p-4 shadow-sm"
              data-testid={`shipment-card-${idx}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">{shipment.name}</h3>
                <StatusBadge status={shipment.status} label={shipment.statusLabel} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs">Shipment ID</div>
                  <div className="font-medium">{shipment.id}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Destination FC</div>
                  <div className="font-medium">{shipment.fc}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Units</div>
                  <div className="font-medium">{shipment.units}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Created</div>
                  <div className="font-medium">{shipment.created}</div>
                </div>
              </div>

              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#146EB4] h-full rounded-full transition-all"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
