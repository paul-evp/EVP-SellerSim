import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Zap, Tag, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

interface PastPromotion {
  id: number;
  product: string;
  type: string;
  discount: string;
  period: string;
  result: string;
}

const pastPromotions: PastPromotion[] = [
  { id: 1, product: "Copper Moscow Mule Mugs (Set of 4)", type: "Lightning Deal", discount: "25% off", period: "Jul 4, 2026", result: "87 units sold" },
  { id: 2, product: "Cast Iron Skillet 12-inch", type: "Coupon", discount: "10% off", period: "Jun 1–30, 2026", result: "43 units sold" },
  { id: 3, product: "Wooden Salad Bowl Set", type: "Percentage Off", discount: "20% off", period: "May 15–31, 2026", result: "29 units sold" },
];

export default function Promotions() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const pastPromoColumns: DataTableColumn<PastPromotion>[] = [
    { key: "product", header: "Product", sortable: false },
    { key: "type", header: "Type", sortable: false },
    { key: "discount", header: "Discount", sortable: false },
    { key: "period", header: "Period", sortable: false },
    { key: "result", header: "Result", sortable: false },
  ];

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Promotions"
        breadcrumbs={[{ label: "Pricing" }, { label: "Promotions" }]}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#146EB4] hover:bg-[#0F5A92] text-white"
                data-testid="button-create-promotion"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create a Promotion
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-create-promotion">
              <DialogHeader>
                <DialogTitle>Create a Promotion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Choose Promotion Type</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      onClick={() => setSelectedType("lightning")}
                      className={cn(
                        "rounded-lg border-2 p-4 cursor-pointer hover:border-[#146EB4] transition-colors",
                        selectedType === "lightning" ? "border-[#146EB4] bg-blue-50" : "border-gray-200"
                      )}
                      data-testid="option-lightning-deal"
                    >
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">Lightning Deal</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Time-limited deal featured on Amazon's Deals page. Great for high-velocity products.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedType("coupon")}
                      className={cn(
                        "rounded-lg border-2 p-4 cursor-pointer hover:border-[#146EB4] transition-colors",
                        selectedType === "coupon" ? "border-[#146EB4] bg-blue-50" : "border-gray-200"
                      )}
                      data-testid="option-coupon"
                    >
                      <div className="flex items-start gap-3">
                        <Tag className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">Coupon</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Add a clippable coupon badge to your listing. Visible in search results.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedType("percentage")}
                      className={cn(
                        "rounded-lg border-2 p-4 cursor-pointer hover:border-[#146EB4] transition-colors",
                        selectedType === "percentage" ? "border-[#146EB4] bg-blue-50" : "border-gray-200"
                      )}
                      data-testid="option-percentage-off"
                    >
                      <div className="flex items-start gap-3">
                        <Percent className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">Percentage Off Promotion</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Offer a percentage discount. Can be shared via social media or email.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
                  This is a workspace simulation. Each promotion type has eligibility requirements, fees, and a multi-step setup wizard.
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setSelectedType(null);
                    }}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    className="bg-[#146EB4] hover:bg-[#0F5A92]"
                    disabled={!selectedType}
                    data-testid="button-continue"
                  >
                    Continue (Simulation Only)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Promotions"
          description="Promotions let you offer discounts to shoppers in specific ways — Lightning Deals show a time-limited offer on the Deals page, Coupons clip a discount badge onto your listing, and percentage-off promotions can be shared via social media or email. Each type has different eligibility requirements and fees."
          whyItMatters="A well-timed Lightning Deal during Prime Day or the holiday season can generate a week's worth of sales in a few hours. Coupons increase click-through rates by making your listing visually stand out with a green 'coupon' badge."
        />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Promotions</h2>
          <StatusBadge status="active" label="2 Running" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lightning Deal Card */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden" data-testid="promo-card-lightning">
            <div className="bg-orange-500 px-5 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Lightning Deal</span>
              <span className="ml-auto bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="font-semibold text-sm">Bamboo Cutting Board Set (3-Pack)</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Discount</div>
                  <div>30% off ($34.99 → $24.49)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Deal Window</div>
                  <div>Jul 31, 2026 · 2pm–6pm PDT</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Units Available</div>
                  <div>50 units</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Claimed</div>
                  <div>31 units (62%)</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>62%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 rounded-full h-2" style={{ width: "62%" }}></div>
                </div>
              </div>
              <div className="border-t pt-3 flex gap-2">
                <Button variant="outline" size="sm" data-testid="button-view-analytics-lightning">
                  View Analytics
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  data-testid="button-end-lightning"
                >
                  End Deal
                </Button>
              </div>
            </div>
          </div>

          {/* Coupon Card */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden" data-testid="promo-card-coupon">
            <div className="bg-green-600 px-5 py-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Coupon</span>
              <span className="ml-auto bg-white text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="font-semibold text-sm">Silicone Kitchen Utensil Set</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Discount</div>
                  <div>15% off ($28.49 → $24.22)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Valid Through</div>
                  <div>Aug 15, 2026</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Budget</div>
                  <div>$50.00 remaining</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Redemptions</div>
                  <div>27 coupons clipped</div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-2 text-xs text-green-800">
                Coupon badge is visible on your listing. Shoppers see 'Save 15%' in search results.
              </div>
              <div className="border-t pt-3 flex gap-2">
                <Button variant="outline" size="sm" data-testid="button-edit-coupon">
                  Edit Coupon
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  data-testid="button-end-coupon"
                >
                  End Coupon
                </Button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-4">Past Promotions</h2>
        <DataTable columns={pastPromoColumns} data={pastPromotions} />
      </div>
    </div>
  );
}
