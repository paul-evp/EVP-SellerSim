import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Leaf, Tag, TrendingUp, Users, Star, Gift, ShoppingCart, Globe } from "lucide-react";

interface GrowthCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  badge?: { status: "active" | "info" | "pending" | "warning"; label: string };
  description: string;
  detail: string;
  eligible: boolean;
  ctaLabel: string;
}

const growthCards: GrowthCard[] = [
  {
    id: "vine",
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    title: "Amazon Vine",
    badge: { status: "active", label: "Eligible" },
    description: "Enroll up to 30 units per parent ASIN to receive honest reviews from Amazon's Vine Voices — vetted top reviewers.",
    detail: "Vine is free for products with fewer than 30 reviews. A strong review base (4.0+ stars) dramatically improves conversion and organic rank. New listings especially benefit.",
    eligible: true,
    ctaLabel: "Enroll in Vine",
  },
  {
    id: "promotions",
    icon: <Tag className="w-6 h-6 text-blue-600" />,
    title: "Recommended Promotions",
    badge: { status: "info", label: "3 Suggestions" },
    description: "Amazon has identified 3 products in your catalog that could benefit from a promotion to boost velocity and rank.",
    detail: "Products recommended: Bamboo Cutting Board Set, Herb Garden Window Kit, Magnetic Knife Strip. Running a 10–20% Lightning Deal or Coupon can improve BSR (Best Sellers Rank) which compounds into better organic placement.",
    eligible: true,
    ctaLabel: "View Recommendations",
  },
  {
    id: "subscribe-save",
    icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
    title: "Subscribe & Save",
    badge: { status: "pending", label: "Review Eligibility" },
    description: "Offer a recurring discount to shoppers who subscribe to receive your product on a regular schedule.",
    detail: "Subscribe & Save is available for consumable products (food, health, beauty, household). It increases predictable revenue and reduces seasonality. You set a discount of 5–15% off the retail price.",
    eligible: false,
    ctaLabel: "Check Eligibility",
  },
  {
    id: "bxgy",
    icon: <Gift className="w-6 h-6 text-orange-500" />,
    title: "Buy X Get Y Promotion",
    badge: { status: "info", label: "Available" },
    description: "Run a cross-product promotion — e.g. buy the Cast Iron Skillet, get a Silicone Utensil Set at 20% off.",
    detail: "BXGY promotions are shared via a claim code. Effective when paired with Sponsored Display ads targeting buyers of the first product. Drives multi-unit basket size.",
    eligible: true,
    ctaLabel: "Create BXGY",
  },
  {
    id: "global-selling",
    icon: <Globe className="w-6 h-6 text-teal-600" />,
    title: "Global Selling",
    badge: { status: "info", label: "Expand Available" },
    description: "List your products on Amazon's international marketplaces — UK, CA, DE, JP, and more — using your existing catalog.",
    detail: "Amazon's Build International Listings (BIL) tool synchronizes your US listings to other marketplaces automatically, adjusting prices by exchange rate. FBA inventory stays in US warehouses; cross-border shipping is handled by Amazon for CA and MX.",
    eligible: true,
    ctaLabel: "Explore Global Selling",
  },
  {
    id: "manage-experiments",
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    title: "Manage Experiments (A/B Test)",
    badge: { status: "active", label: "Brand Registry" },
    description: "Run split tests on your product titles, main images, or A+ content to scientifically determine what drives more sales.",
    detail: "Manage Experiments randomly splits traffic between two versions of your listing element and tells you which version converts better — with statistical confidence. Available only to Brand Registry sellers.",
    eligible: true,
    ctaLabel: "Start an Experiment",
  },
  {
    id: "customer-engage",
    icon: <Users className="w-6 h-6 text-rose-500" />,
    title: "Customer Engagement (Tailored Audiences)",
    badge: { status: "active", label: "Brand Registry" },
    description: "Send email campaigns to past customers of your brand — announce new launches, share promotions, or encourage repeat purchases.",
    detail: "Amazon manages the email delivery and customer anonymization. You design the email template and set the audience (e.g. repeat buyers, high-spenders). Open rates are typically 20–35% for brand followers.",
    eligible: true,
    ctaLabel: "Create Campaign",
  },
  {
    id: "new-seller-incentives",
    icon: <Star className="w-6 h-6 text-amber-500" />,
    title: "New Seller Incentives",
    badge: { status: "warning", label: "Expiring Soon" },
    description: "Your account qualifies for new seller incentives including FBA fee credits, Vine enrollment credits, and promotional ad credits.",
    detail: "New sellers (< 1 year old) receive: $100 off first FBA shipment, $50 Vine credit, $50 Sponsored Products credit, and 5% bonus on first $1M in branded sales. Most credits expire 1 year from first sale date.",
    eligible: true,
    ctaLabel: "View My Incentives",
  },
];

export default function Growth() {
  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Growth Opportunities"
        breadcrumbs={[{ label: "Growth" }, { label: "Growth Opportunities" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Growth Opportunities"
          description="This section surfaces programs Amazon recommends based on your account activity, catalog, and eligibility. Each program is designed to increase your sales velocity, improve your listing's organic rank, or expand into new channels. Not all programs are available to every seller — some require Brand Registry, specific product categories, or minimum sales history."
          whyItMatters="New sellers often focus only on ads and ignore these growth levers. Amazon Vine (for reviews), Subscribe & Save (for recurring revenue), and A/B testing (Manage Experiments) are frequently higher-ROI than increasing ad spend on an under-optimized listing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {growthCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg border shadow-sm p-5 flex flex-col gap-3"
              data-testid={`growth-card-${card.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{card.title}</h3>
                </div>
                {card.badge && <StatusBadge status={card.badge.status} label={card.badge.label} />}
              </div>

              <p className="text-sm text-muted-foreground">{card.description}</p>

              <div className="bg-gray-50 border rounded p-3 text-xs text-muted-foreground leading-relaxed">
                {card.detail}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={!card.eligible}
                className={card.eligible ? "w-fit" : "w-fit opacity-50 cursor-not-allowed"}
                data-testid={`button-${card.id}`}
              >
                {card.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
