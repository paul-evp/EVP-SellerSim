import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, Store, FileText, Palette, LayoutGrid,
  CheckCircle, ExternalLink, Image, Type, AlignLeft,
} from "lucide-react";

const brandBenefits = [
  { label: "A+ Content",                  active: true,  description: "Enhanced product descriptions with images, comparison charts, and branded storytelling." },
  { label: "Brand Analytics",             active: true,  description: "Search term performance, market basket data, and repeat purchase behavior." },
  { label: "Sponsored Brands Ads",        active: true,  description: "Banner ads at the top of search results with your logo and custom headline." },
  { label: "Amazon Stores",               active: true,  description: "A free multi-page storefront on Amazon for your brand." },
  { label: "Manage Experiments",          active: true,  description: "A/B test titles, images, and A+ content to increase conversion." },
  { label: "Customer Engagement Emails",  active: true,  description: "Email campaigns to your brand followers and past customers." },
  { label: "Virtual Bundles",             active: false, description: "Bundle complementary products into a single listing without physical bundling." },
  { label: "Amazon Posts",                active: true,  description: "Shoppable social-style posts on your brand's feed on Amazon." },
];

interface StoreSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: "hero" | "products" | "text" | "image";
}

const storeSections: StoreSection[] = [
  { id: "s1", label: "Hero Banner",        icon: <Image      className="w-4 h-4" />, type: "hero"     },
  { id: "s2", label: "Featured Products",  icon: <LayoutGrid className="w-4 h-4" />, type: "products" },
  { id: "s3", label: "Brand Story",        icon: <AlignLeft  className="w-4 h-4" />, type: "text"     },
  { id: "s4", label: "Category Grid",      icon: <LayoutGrid className="w-4 h-4" />, type: "products" },
];

export default function Brands() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Brand Registry & Stores"
        breadcrumbs={[{ label: "Brands" }, { label: "Brand Registry & Stores" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Amazon Brand Registry"
          description="Brand Registry enrolls your registered trademark into Amazon's brand protection program. It gives you access to powerful selling tools unavailable to standard sellers: A+ Content, Sponsored Brands ads, Amazon Stores, Brand Analytics, and more. It also lets you proactively remove counterfeit listings and unauthorized resellers."
          whyItMatters="Sellers with Brand Registry typically see 20–30% higher conversion rates thanks to A+ Content alone. The combination of enhanced listings, brand protection, and analytics tools creates a compounding advantage over non-registered sellers in the same category."
        />

        {/* Brand Registry Status */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <h2 className="font-semibold">Brand Registry Status</h2>
            </div>
            <StatusBadge status="active" label="Enrolled" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-5">
            {[
              { label: "Brand Name",        value: "EVP Sarisari Store" },
              { label: "Trademark #",       value: "US-88472910" },
              { label: "Enrolled Since",    value: "March 14, 2025" },
              { label: "Marketplace",       value: "Amazon.com (US)" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                <div className="font-medium">{value}</div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="text-sm font-medium mb-3">Brand Registry Benefits</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {brandBenefits.map((b) => (
                <div key={b.label} className="flex items-start gap-2">
                  {b.active
                    ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    : <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <div className={`text-xs font-medium ${b.active ? "" : "text-muted-foreground"}`}>{b.label}</div>
                    <div className="text-xs text-muted-foreground">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stores Builder Preview */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <Store className="w-5 h-5 text-[#146EB4]" />
              <h2 className="font-semibold">Amazon Storefront</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-preview-store">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Preview Store
              </Button>
              <Button size="sm" className="bg-[#146EB4] hover:bg-[#0F5A92]" data-testid="button-edit-store">
                <Palette className="w-3.5 h-3.5 mr-1.5" />
                Edit in Store Builder
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
             amazon.com/stores/EVPSarisariStore · Last published: Jul 15, 2026
          </p>

          {/* Storefront layout preview */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
            {/* Fake browser chrome */}
            <div className="bg-gray-100 border-b px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded text-xs text-muted-foreground px-3 py-1 text-center">
                 amazon.com/stores/EVPSarisariStore
              </div>
            </div>

            {/* Storefront mock */}
            <div className="bg-white">
              {/* Store header */}
              <div className="bg-[#131921] px-6 py-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF9900] flex items-center justify-center text-white font-bold text-sm">AH</div>
                <div>
                  <div className="text-white font-semibold text-sm">EVP Sarisari Store</div>
                  <div className="text-white/60 text-xs">Kitchen & Dining · 12 products</div>
                </div>
              </div>

              {/* Sections */}
              <div className="p-4 space-y-3">
                {storeSections.map((section) => (
                  <div key={section.id} className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-muted-foreground">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{section.label}</div>
                      <div className="text-xs text-muted-foreground capitalize">{section.type} section</div>
                    </div>
                    {section.type === "hero" && (
                      <div className="w-24 h-14 rounded bg-gradient-to-br from-[#146EB4] to-[#0F5A92] flex items-center justify-center">
                        <Type className="w-4 h-4 text-white/60" />
                      </div>
                    )}
                    {section.type === "products" && (
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded bg-gray-100 border flex items-center justify-center">
                            <Image className="w-4 h-4 text-gray-300" />
                          </div>
                        ))}
                      </div>
                    )}
                    {section.type === "text" && (
                      <div className="space-y-1">
                        <div className="w-24 h-2 bg-gray-200 rounded" />
                        <div className="w-20 h-2 bg-gray-100 rounded" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-sm border-t pt-4">
            {[
              { label: "Store Visitors (30d)", value: "2,841" },
              { label: "Page Views (30d)",      value: "6,320" },
              { label: "Sales from Store",      value: "$1,240.50" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* A+ Content */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#146EB4]" />
            <h2 className="font-semibold">A+ Content Manager</h2>
            <StatusBadge status="info" label="4 Published" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            A+ Content replaces your plain product description with rich media: brand story modules, comparison charts, lifestyle images, and text/image combinations. Studies show A+ Content increases conversion by 3–10%.
          </p>
          <div className="space-y-2">
            {[
              { product: "Bamboo Cutting Board Set (3-Pack)",    status: "Published", updated: "Jun 20, 2026" },
              { product: "Cast Iron Skillet 12-inch",            status: "Published", updated: "Jun 18, 2026" },
              { product: "Silicone Kitchen Utensil Set",         status: "Published", updated: "May 30, 2026" },
              { product: "Stainless Steel Mixing Bowls",         status: "Draft",     updated: "Jul 29, 2026" },
            ].map((item) => (
              <div key={item.product} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                <span className="font-medium">{item.product}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{item.updated}</span>
                  <StatusBadge
                    status={item.status === "Published" ? "active" : "pending"}
                    label={item.status}
                  />
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
