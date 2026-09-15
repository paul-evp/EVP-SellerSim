import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function AutomatePricing() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Automate Pricing"
        breadcrumbs={[{ label: "Pricing" }, { label: "Automate Pricing" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Automate Pricing"
          description="Automated pricing (also called a repricer) adjusts your prices automatically to help you win or stay competitive for the Buy Box. You set rules — like 'always be $0.10 below the lowest competitor' within a min/max price range — and Amazon adjusts your prices continuously."
          whyItMatters="Manual pricing means you are always reacting. A repricer acts 24/7, so you stay competitive even while you sleep. Setting a minimum price prevents the repricer from ever selling below your break-even."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Active Rules */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Active Rules</h2>

            <div className="bg-white rounded-lg border p-5 shadow-sm" data-testid="rule-card-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">Competitive Buy Box Rule</h3>
                <StatusBadge status="active" label="Active" />
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                Applied to: All FBA listings (12 SKUs)
              </div>

              <div className="border-t my-4"></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Min Price</div>
                  <div className="font-medium">$18.00</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Max Price</div>
                  <div className="font-medium">$65.00</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Strategy</div>
                  <div className="font-medium">Beat lowest competitor</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Adjustment</div>
                  <div className="font-medium">$0.10 below</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last updated: Jul 28, 2026</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" data-testid="button-edit-rule">
                    Edit Rule
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    data-testid="button-disable-rule"
                  >
                    Disable
                  </Button>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-dashed"
              data-testid="button-create-rule"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Rule
            </Button>
          </div>

          {/* Right column - Rule Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Rule Settings</h2>

            <div className="bg-white rounded-lg border p-5 shadow-sm">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apply-to">Apply to</Label>
                  <Select defaultValue="all-fba">
                    <SelectTrigger id="apply-to" data-testid="select-apply-to">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-fba">All FBA Listings</SelectItem>
                      <SelectItem value="all-fbm">All FBM Listings</SelectItem>
                      <SelectItem value="specific">Specific SKUs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="min-price">Minimum Price</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="min-price"
                      placeholder="0.00"
                      className="w-28"
                      data-testid="input-min-price"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="max-price">Maximum Price</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <Input
                      id="max-price"
                      placeholder="0.00"
                      className="w-28"
                      data-testid="input-max-price"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="strategy">Pricing Strategy</Label>
                  <Select defaultValue="beat-lowest">
                    <SelectTrigger id="strategy" data-testid="select-strategy">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beat-lowest">Beat Lowest Competitor Price</SelectItem>
                      <SelectItem value="match-buybox">Match Buy Box Price</SelectItem>
                      <SelectItem value="beat-buybox">Beat Buy Box Price</SelectItem>
                      <SelectItem value="below-featured">Stay Below Featured Merchant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="adjustment-direction">Price Adjustment</Label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="below">
                      <SelectTrigger id="adjustment-direction" className="w-24" data-testid="select-adjustment-direction">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below">below</SelectItem>
                        <SelectItem value="above">above</SelectItem>
                        <SelectItem value="match">match</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="0.10"
                      className="w-20"
                      data-testid="input-adjustment-amount"
                    />
                    <span className="text-sm">USD</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="competitor-tracking">Enable Competitor Tracking</Label>
                    <Switch
                      id="competitor-tracking"
                      defaultChecked={true}
                      onCheckedChange={() => {}}
                      data-testid="switch-competitor-tracking"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Monitor competitor prices every 15 minutes
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full bg-[#146EB4] hover:bg-[#0F5A92] mt-2"
                  data-testid="button-save-rule"
                >
                  Save Rule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
