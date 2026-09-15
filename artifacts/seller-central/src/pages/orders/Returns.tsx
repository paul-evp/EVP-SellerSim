import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, RefreshCw } from "lucide-react";

interface ReturnRequest {
  id: string;
  orderId: string;
  date: string;
  product: string;
  qty: number;
  price: number;
  reason: string;
  reasonCode: string;
  fulfillment: 'FBA' | 'FBM';
  status: 'Pending Review' | 'Refund Issued' | 'Replacement Sent';
}

const returns: ReturnRequest[] = [
  {
    id: 'RET-20260730-001',
    orderId: '113-0293847-5610293',
    date: 'Jul 30, 2026',
    product: 'Cast Iron Skillet 12-inch',
    qty: 1,
    price: 49.95,
    reason: 'Item arrived damaged — handle was cracked during shipping.',
    reasonCode: 'DAMAGED_BY_CARRIER',
    fulfillment: 'FBA',
    status: 'Pending Review',
  },
  {
    id: 'RET-20260728-002',
    orderId: '112-8293047-6172839',
    date: 'Jul 28, 2026',
    product: 'Copper Moscow Mule Mugs (Set of 4)',
    qty: 1,
    price: 38.00,
    reason: 'Wrong item received — I ordered the set of 4 but received a single mug.',
    reasonCode: 'WRONG_ITEM',
    fulfillment: 'FBA',
    status: 'Refund Issued',
  },
  {
    id: 'RET-20260727-003',
    orderId: '113-5047382-9182736',
    date: 'Jul 27, 2026',
    product: 'Linen Dish Towels (6-Pack)',
    qty: 3,
    price: 19.99,
    reason: 'Changed mind — found a similar product locally at a better price.',
    reasonCode: 'NO_LONGER_NEEDED',
    fulfillment: 'FBA',
    status: 'Replacement Sent',
  },
];

const reasonCodeLabels: Record<string, string> = {
  DAMAGED_BY_CARRIER: 'Damaged by Carrier',
  WRONG_ITEM: 'Wrong Item Sent',
  NO_LONGER_NEEDED: 'No Longer Needed',
  DEFECTIVE: 'Defective / Not Working',
  NOT_AS_DESCRIBED: 'Not as Described',
};

type ActionChoice = 'refund' | 'replace';

export default function Returns() {
  const [actions, setActions] = useState<Record<string, ActionChoice>>({
    'RET-20260730-001': 'refund',
    'RET-20260728-002': 'refund',
    'RET-20260727-003': 'replace',
  });

  const pending  = returns.filter(r => r.status === 'Pending Review').length;
  const resolved = returns.filter(r => r.status !== 'Pending Review').length;

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Manage Returns"
        breadcrumbs={[{ label: "Orders" }, { label: "Manage Returns" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Manage Returns"
          description="When a buyer requests a return, you can choose to issue a refund or send a replacement. For FBA orders, Amazon handles the physical return and often issues the refund automatically — you may be charged a restocking fee. For FBM orders, you coordinate returns directly and decide whether to refund or replace."
          whyItMatters="Your Return Dissatisfaction Rate (RDR) measures how buyers rate their return experience. A high RDR (above 10%) can trigger an Account Health warning. Responding to returns promptly — within 48 hours — protects your metrics and builds buyer trust."
        />

        {/* Summary */}
        <div className="flex gap-3">
          <div className="bg-white rounded-lg border px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm font-medium">{pending} Pending Review</span>
          </div>
          <div className="bg-white rounded-lg border px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium">{resolved} Resolved</span>
          </div>
        </div>

        {/* Return cards */}
        <div className="space-y-4">
          {returns.map((ret) => {
            const action = actions[ret.id];
            const isResolved = ret.status !== 'Pending Review';

            return (
              <div
                key={ret.id}
                className="bg-white rounded-lg border shadow-sm overflow-hidden"
                data-testid={`return-card-${ret.id}`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-3 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{ret.id}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">Order: {ret.orderId}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{ret.date}</span>
                  </div>
                  <StatusBadge
                    status={
                      ret.status === 'Pending Review'
                        ? 'pending'
                        : ret.status === 'Refund Issued'
                        ? 'active'
                        : 'info'
                    }
                    label={ret.status}
                  />
                </div>

                <div className="px-5 py-4">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Product & reason */}
                    <div className="flex-1 space-y-2">
                      <div className="font-semibold text-sm">{ret.product}</div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">Qty: <strong className="text-foreground">{ret.qty}</strong></span>
                        <span className="text-muted-foreground">Value: <strong className="text-foreground">${(ret.price * ret.qty).toFixed(2)}</strong></span>
                        <span className="text-muted-foreground">Via: <strong className="text-foreground">{ret.fulfillment}</strong></span>
                      </div>
                      <div className="mt-1">
                        <span className="inline-flex items-center rounded-md bg-red-50 border border-red-200 px-2 py-0.5 text-xs font-medium text-red-700 mr-2">
                          {reasonCodeLabels[ret.reasonCode] ?? ret.reasonCode}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{ret.reason}"</p>
                    </div>

                    {/* Action toggle */}
                    <div className="flex-shrink-0 min-w-[180px]">
                      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Resolution</div>
                      <div className="flex rounded-lg border overflow-hidden">
                        <button
                          onClick={() => !isResolved && setActions(prev => ({ ...prev, [ret.id]: 'refund' }))}
                          className={`flex items-center gap-1.5 flex-1 justify-center px-3 py-2 text-sm font-medium transition-colors
                            ${action === 'refund'
                              ? 'bg-[#146EB4] text-white'
                              : 'bg-white text-muted-foreground hover:bg-gray-50'
                            }
                            ${isResolved ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          data-testid={`button-refund-${ret.id}`}
                          disabled={isResolved}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Refund
                        </button>
                        <button
                          onClick={() => !isResolved && setActions(prev => ({ ...prev, [ret.id]: 'replace' }))}
                          className={`flex items-center gap-1.5 flex-1 justify-center px-3 py-2 text-sm font-medium transition-colors border-l
                            ${action === 'replace'
                              ? 'bg-[#146EB4] text-white'
                              : 'bg-white text-muted-foreground hover:bg-gray-50'
                            }
                            ${isResolved ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          data-testid={`button-replace-${ret.id}`}
                          disabled={isResolved}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Replace
                        </button>
                      </div>
                      {!isResolved && (
                        <Button
                          className="w-full mt-2 bg-[#146EB4] hover:bg-[#0F5A92] text-xs h-8"
                          data-testid={`button-submit-${ret.id}`}
                        >
                          Submit {action === 'refund' ? 'Refund' : 'Replacement'} (Simulation)
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>EVP Hub Sim note:</strong> FBA returns are processed automatically in this workspace. You are notified after the fact and can dispute a reimbursement decision within 60 days.
        </div>
      </div>
    </div>
  );
}
