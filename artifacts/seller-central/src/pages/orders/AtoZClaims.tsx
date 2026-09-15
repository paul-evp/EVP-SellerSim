import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Clock, DollarSign } from "lucide-react";

interface Claim {
  id: string;
  orderId: string;
  date: string;
  product: string;
  claimAmount: number;
  reason: string;
  buyerStatement: string;
  responseDeadline: string;
  status: 'Action Required' | 'Under Review' | 'Granted' | 'Denied';
  fulfillment: 'FBA' | 'FBM';
}

const claims: Claim[] = [
  {
    id: 'AZ-20260729-8271',
    orderId: '114-8273649-0192837',
    date: 'Jul 29, 2026',
    product: 'Bamboo Cutting Board Set (3-Pack)',
    claimAmount: 34.99,
    reason: 'Item Not Received',
    buyerStatement:
      "I placed this order on Aug 1 and it still hasn't arrived. The tracking hasn't updated in 4 days. I need a refund or a replacement immediately.",
    responseDeadline: 'Aug 5, 2026',
    status: 'Action Required',
    fulfillment: 'FBM',
  },
  {
    id: 'AZ-20260724-3194',
    orderId: '111-7463920-2938471',
    date: 'Jul 24, 2026',
    product: 'Stainless Steel Mixing Bowls',
    claimAmount: 42.00,
    reason: 'Significantly Not as Described',
    buyerStatement:
      "The listing said '5-piece set' but I only received 3 bowls. The product does not match what was advertised.",
    responseDeadline: 'Jul 31, 2026',
    status: 'Under Review',
    fulfillment: 'FBA',
  },
];

const statusBadgeMap: Record<Claim['status'], { status: 'error' | 'warning' | 'pending' | 'active' | 'inactive'; label: string }> = {
  'Action Required': { status: 'error',   label: 'Action Required' },
  'Under Review':    { status: 'pending', label: 'Under Review' },
  'Granted':         { status: 'warning', label: 'Granted' },
  'Denied':          { status: 'inactive', label: 'Denied' },
};

const reasonIcons: Record<string, string> = {
  'Item Not Received':          '📦',
  'Significantly Not as Described': '📋',
  'Item Damaged':               '⚠️',
};

export default function AtoZClaims() {
  const actionRequired = claims.filter(c => c.status === 'Action Required').length;

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="A-to-Z Guarantee Claims"
        breadcrumbs={[{ label: "Orders" }, { label: "A-to-Z Guarantee Claims" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="A-to-Z Guarantee Claims"
          description="Amazon's A-to-Z Guarantee protects buyers when they don't receive their order or when it's significantly different from what was described. If a buyer files a claim, Amazon notifies you and gives you a limited window — typically 3 days — to respond with evidence. If you don't respond, Amazon may grant the claim automatically and issue a refund to the buyer at your expense."
          whyItMatters="A-to-Z claims directly impact your Order Defect Rate (ODR), which must stay below 1%. A claim granted against you counts against your ODR even if you eventually provide a refund. High ODR = suspension risk. FBA orders are generally protected because Amazon controls fulfillment, but FBM sellers bear full responsibility."
        />

        {/* Alert banner if action required */}
        {actionRequired > 0 && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-5 py-3">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-red-800">
                {actionRequired} claim{actionRequired > 1 ? 's' : ''} require{actionRequired === 1 ? 's' : ''} your immediate response
              </div>
              <div className="text-xs text-red-700 mt-0.5">
                Failing to respond within the deadline results in an automatic grant — which counts against your Order Defect Rate.
              </div>
            </div>
          </div>
        )}

        {/* Summary chips */}
        <div className="flex gap-3">
          <div className="bg-white rounded-lg border px-4 py-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">{claims.length} Total Claims</span>
          </div>
          <div className="bg-white rounded-lg border px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{actionRequired} Action Required</span>
          </div>
          <div className="bg-white rounded-lg border px-4 py-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              ${claims.reduce((sum, c) => sum + c.claimAmount, 0).toFixed(2)} at risk
            </span>
          </div>
        </div>

        {/* Claim cards */}
        <div className="space-y-5">
          {claims.map((claim) => {
            const badge = statusBadgeMap[claim.status];
            return (
              <div
                key={claim.id}
                className={`bg-white rounded-lg border shadow-sm overflow-hidden ${
                  claim.status === 'Action Required' ? 'border-red-300' : ''
                }`}
                data-testid={`claim-card-${claim.id}`}
              >
                {/* Header */}
                <div className={`flex items-center justify-between px-5 py-3 border-b ${
                  claim.status === 'Action Required' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <ShieldAlert className={`w-4 h-4 ${claim.status === 'Action Required' ? 'text-red-600' : 'text-muted-foreground'}`} />
                    <span className="text-xs font-mono font-medium">{claim.id}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">Filed {claim.date}</span>
                  </div>
                  <StatusBadge status={badge.status} label={badge.label} />
                </div>

                <div className="px-5 py-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Product</div>
                      <div className="text-sm font-medium">{claim.product}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{claim.orderId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Reason</div>
                      <div className="text-sm font-medium">
                        {reasonIcons[claim.reason] ?? '⚠️'} {claim.reason}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">Via {claim.fulfillment}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Claim Amount</div>
                      <div className="text-lg font-bold text-red-600">${claim.claimAmount.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Buyer statement */}
                  <div className="bg-gray-50 border rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Buyer Statement</div>
                    <p className="text-sm italic text-gray-700">"{claim.buyerStatement}"</p>
                  </div>

                  {/* Deadline + actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-sm">
                        Response deadline:{' '}
                        <strong className={claim.status === 'Action Required' ? 'text-red-700' : 'text-foreground'}>
                          {claim.responseDeadline}
                        </strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {claim.status === 'Action Required' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            data-testid={`button-refund-claim-${claim.id}`}
                          >
                            Issue Refund
                          </Button>
                          <Button
                            className="bg-[#146EB4] hover:bg-[#0F5A92] text-white"
                            size="sm"
                            data-testid={`button-respond-${claim.id}`}
                          >
                            Respond with Evidence
                          </Button>
                        </>
                      )}
                      {claim.status === 'Under Review' && (
                        <Button variant="outline" size="sm" data-testid={`button-view-${claim.id}`}>
                          View Submission
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>EVP Hub Sim note:</strong> In a live marketplace, you can provide tracking proof, photos, or buyer communication as evidence when disputing a claim. The review team evaluates both sides before making a final decision. A denied claim (where you win) does <em>not</em> count against your ODR.
        </div>
      </div>
    </div>
  );
}
