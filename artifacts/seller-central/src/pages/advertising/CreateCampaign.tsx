import { useState } from "react";
import { useLocation } from "wouter";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
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
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingBag, Star, Monitor, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignType = "Sponsored Products" | "Sponsored Brands" | "Sponsored Display" | null;
type TargetingType = "Auto" | "Manual" | null;
type MatchType = "Broad" | "Phrase" | "Exact";

interface Keyword {
  text: string;
  matchType: MatchType;
}

const STEP_LABELS = ["Campaign Type", "Budget & Schedule", "Targeting & Keywords", "Review"];

const defaultKeywords: Keyword[] = [
  { text: "bamboo cutting board", matchType: "Broad" },
  { text: "bamboo cutting board set", matchType: "Phrase" },
  { text: "bamboo cutting board 3 pack", matchType: "Exact" },
  { text: "wooden cutting board kitchen", matchType: "Broad" },
  { text: "cutting board with juice groove", matchType: "Phrase" },
];

const matchTypeColors: Record<MatchType, string> = {
  Broad:  "bg-blue-100 text-blue-800 border-blue-200",
  Phrase: "bg-purple-100 text-purple-800 border-purple-200",
  Exact:  "bg-green-100 text-green-800 border-green-200",
};

const campaignTypes: { type: CampaignType; icon: React.ReactNode; title: string; description: string; badge?: string }[] = [
  {
    type: "Sponsored Products",
    icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
    title: "Sponsored Products",
    description: "Promote individual listings in search results and product pages. Best for driving sales on specific ASINs. The most common ad type for new sellers.",
    badge: "Most Popular",
  },
  {
    type: "Sponsored Brands",
    icon: <Star className="w-6 h-6 text-purple-600" />,
    title: "Sponsored Brands",
    description: "Feature your brand logo, a custom headline, and up to 3 products in a banner above search results. Requires Brand Registry.",
    badge: "Brand Registry Required",
  },
  {
    type: "Sponsored Display",
    icon: <Monitor className="w-6 h-6 text-teal-600" />,
    title: "Sponsored Display",
    description: "Retarget shoppers who viewed your products (or similar ones) — on Amazon and off. Great for awareness and retargeting.",
  },
];

export default function CreateCampaign() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [campaignType, setCampaignType] = useState<CampaignType>(null);
  const [dailyBudget, setDailyBudget] = useState("25.00");
  const [startDate, setStartDate] = useState("2026-08-05");
  const [noEndDate, setNoEndDate] = useState(true);
  const [campaignName, setCampaignName] = useState("");
  const [targeting, setTargeting] = useState<TargetingType>(null);
  const [bidStrategy, setBidStrategy] = useState("dynamic-down");
  const [keywords, setKeywords] = useState<Keyword[]>(defaultKeywords);
  const [newKw, setNewKw] = useState("");
  const [newKwMatch, setNewKwMatch] = useState<MatchType>("Broad");
  const [submitted, setSubmitted] = useState(false);

  const canNext = [
    campaignType !== null,
    dailyBudget !== "" && campaignName !== "",
    targeting === "Auto" || (targeting === "Manual" && keywords.length > 0),
    true,
  ];

  const removeKeyword = (idx: number) => setKeywords(kws => kws.filter((_, i) => i !== idx));
  const addKeyword = () => {
    if (newKw.trim()) {
      setKeywords(kws => [...kws, { text: newKw.trim(), matchType: newKwMatch }]);
      setNewKw("");
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#F3F3F3] min-h-screen">
        <PageHeader
          title="Create a Campaign"
          breadcrumbs={[{ label: "Advertising" }, { label: "Campaign Manager", href: "/advertising/campaigns" }, { label: "Create Campaign" }]}
        />
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-xl border shadow-sm p-10 max-w-md w-full text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h2 className="text-xl font-bold">Campaign Created!</h2>
            <p className="text-muted-foreground text-sm">
              <strong>{campaignName}</strong> ({campaignType}) has been submitted for review. Campaigns typically go live within 1 hour after approval.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800 text-left">
              This is a workspace simulation — no real campaign was created on Amazon.
            </div>
            <Button
              className="w-full bg-[#146EB4] hover:bg-[#0F5A92]"
              onClick={() => navigate("/advertising/campaigns")}
            >
              Back to Campaign Manager
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Create a Campaign"
        breadcrumbs={[{ label: "Advertising" }, { label: "Campaign Manager", href: "/advertising/campaigns" }, { label: "Create Campaign" }]}
        actions={
          <Button variant="outline" onClick={() => navigate("/advertising/campaigns")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        }
      />
      <div className="p-6 space-y-6">
        {step < 2 ? (
          <LearnRibbon
            title="Automatic vs. Manual Targeting"
            description="Automatic targeting lets Amazon decide which search terms to show your ad on, based on your product listing. Manual targeting means you choose specific keywords yourself. Auto is great when you're starting out — it gathers data on what terms convert. Manual lets you be precise once you know what works."
            whyItMatters="Most experienced sellers run both: an Auto campaign to discover new keywords, and a Manual Exact campaign to pour budget into their best-converting terms. Starting with Auto-only for the first 2 weeks before launching manual is a common best practice."
          />
        ) : null}

        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  i < step  ? "bg-[#146EB4] border-[#146EB4] text-white" :
                  i === step ? "bg-white border-[#146EB4] text-[#146EB4]" :
                               "bg-white border-gray-300 text-gray-400"
                )}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <div className={cn(
                  "text-xs mt-1 whitespace-nowrap",
                  i === step ? "text-[#146EB4] font-medium" : "text-muted-foreground"
                )}>
                  {label}
                </div>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mb-5 mx-1 transition-colors",
                  i < step ? "bg-[#146EB4]" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          {/* ── Step 0: Campaign Type ── */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Choose a Campaign Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaignTypes.map(({ type, icon, title, description, badge }) => (
                  <div
                    key={type}
                    onClick={() => setCampaignType(type)}
                    className={cn(
                      "rounded-lg border-2 p-5 cursor-pointer hover:border-[#146EB4] transition-colors relative",
                      campaignType === type ? "border-[#146EB4] bg-blue-50" : "border-gray-200"
                    )}
                    data-testid={`option-${type?.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {badge && (
                      <div className="absolute top-3 right-3 text-xs bg-[#146EB4] text-white rounded-full px-2 py-0.5">
                        {badge}
                      </div>
                    )}
                    <div className="mb-3">{icon}</div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Budget & Schedule ── */}
          {step === 1 && (
            <div className="space-y-5 max-w-lg">
              <h2 className="font-semibold text-lg">Budget & Schedule</h2>

              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g. Bamboo Cutting Board — Auto"
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
                  data-testid="input-campaign-name"
                />
              </div>

              <div>
                <Label htmlFor="daily-budget">Daily Budget</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">$</span>
                  <Input
                    id="daily-budget"
                    type="number"
                    min="1"
                    step="0.01"
                    value={dailyBudget}
                    onChange={e => setDailyBudget(e.target.value)}
                    className="w-32"
                    data-testid="input-daily-budget"
                  />
                  <span className="text-sm text-muted-foreground">/ day</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Minimum $1.00/day. Amazon may spend up to 25% over your daily budget on high-traffic days.</p>
              </div>

              <div>
                <Label htmlFor="bid-strategy">Bidding Strategy</Label>
                <Select value={bidStrategy} onValueChange={setBidStrategy}>
                  <SelectTrigger id="bid-strategy" data-testid="select-bid-strategy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dynamic-down">Dynamic bids — down only</SelectItem>
                    <SelectItem value="dynamic-up-down">Dynamic bids — up and down</SelectItem>
                    <SelectItem value="fixed">Fixed bids</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  "Down only" reduces your bid when a click is less likely to convert. Recommended for new campaigns.
                </p>
              </div>

              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-48"
                  data-testid="input-start-date"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="no-end-date"
                  checked={noEndDate}
                  onChange={e => setNoEndDate(e.target.checked)}
                  className="w-4 h-4 accent-[#146EB4]"
                />
                <Label htmlFor="no-end-date" className="cursor-pointer">No end date (run indefinitely)</Label>
              </div>
            </div>
          )}

          {/* ── Step 2: Targeting & Keywords ── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-lg">Targeting & Keywords</h2>

              <div>
                <div className="text-sm font-medium mb-3">Targeting Type</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  {(["Auto", "Manual"] as TargetingType[]).map(t => (
                    <div
                      key={t}
                      onClick={() => setTargeting(t)}
                      className={cn(
                        "rounded-lg border-2 p-4 cursor-pointer hover:border-[#146EB4] transition-colors",
                        targeting === t ? "border-[#146EB4] bg-blue-50" : "border-gray-200"
                      )}
                      data-testid={`option-targeting-${t?.toLowerCase()}`}
                    >
                      <h3 className="font-semibold text-sm mb-1">{t} Targeting</h3>
                      <p className="text-xs text-muted-foreground">
                        {t === "Auto"
                          ? "Amazon picks search terms automatically based on your listing. Great for discovery and data gathering."
                          : "You choose your own keywords and match types. More control, but requires research."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {targeting === "Manual" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Keywords
                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                      Broad = widest reach · Phrase = contains the phrase · Exact = matches precisely
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-lg border bg-gray-50">
                    {keywords.map((kw, i) => (
                      <span
                        key={i}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border",
                          matchTypeColors[kw.matchType]
                        )}
                        data-testid={`keyword-tag-${i}`}
                      >
                        <span className="opacity-60 text-[10px] uppercase font-bold">{kw.matchType[0]}</span>
                        {kw.text}
                        <button onClick={() => removeKeyword(i)} className="opacity-60 hover:opacity-100">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Add Keyword</Label>
                      <Input
                        placeholder="e.g. bamboo cutting board"
                        value={newKw}
                        onChange={e => setNewKw(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addKeyword()}
                        data-testid="input-new-keyword"
                      />
                    </div>
                    <div className="w-32">
                      <Label>Match Type</Label>
                      <Select value={newKwMatch} onValueChange={v => setNewKwMatch(v as MatchType)}>
                        <SelectTrigger data-testid="select-match-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Broad">Broad</SelectItem>
                          <SelectItem value="Phrase">Phrase</SelectItem>
                          <SelectItem value="Exact">Exact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" onClick={addKeyword} data-testid="button-add-keyword">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex gap-3 text-xs">
                    {(["Broad", "Phrase", "Exact"] as MatchType[]).map(m => (
                      <span key={m} className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 border text-xs", matchTypeColors[m])}>
                        {m}
                      </span>
                    ))}
                    <span className="text-muted-foreground">— color coded by match type</span>
                  </div>
                </div>
              )}

              {targeting === "Auto" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 max-w-xl">
                  <strong>Auto targeting selected.</strong> Amazon will match your ad to relevant search terms based on your product title, bullet points, and category. You can review search term data after 1–2 weeks and harvest high-converting terms into a Manual campaign.
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (
            <div className="space-y-5 max-w-lg">
              <h2 className="font-semibold text-lg">Review & Launch</h2>
              <div className="space-y-3">
                {[
                  { label: "Campaign Name",    value: campaignName || "—" },
                  { label: "Type",             value: campaignType ?? "—" },
                  { label: "Daily Budget",     value: `$${parseFloat(dailyBudget || "0").toFixed(2)}` },
                  { label: "Bidding Strategy", value: bidStrategy === "dynamic-down" ? "Dynamic — down only" : bidStrategy === "dynamic-up-down" ? "Dynamic — up and down" : "Fixed bids" },
                  { label: "Start Date",       value: startDate },
                  { label: "End Date",         value: noEndDate ? "None (runs indefinitely)" : "—" },
                  { label: "Targeting",        value: targeting ?? "—" },
                  { label: "Keywords",         value: targeting === "Auto" ? "Amazon auto-selects" : `${keywords.length} keywords` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
                This is a workspace simulation. No real campaign will be created on Amazon.
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/advertising/campaigns")}
            data-testid="button-back-step"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          {step < STEP_LABELS.length - 1 ? (
            <Button
              className="bg-[#146EB4] hover:bg-[#0F5A92]"
              disabled={!canNext[step]}
              onClick={() => setStep(s => s + 1)}
              data-testid="button-next-step"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-[#146EB4] hover:bg-[#0F5A92]"
              onClick={() => setSubmitted(true)}
              data-testid="button-launch-campaign"
            >
              Launch Campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
