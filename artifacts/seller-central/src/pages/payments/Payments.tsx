import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Calendar, DollarSign, ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react";

type TxnType = "Order Payment" | "Refund" | "FBA Fee" | "Advertising" | "Storage Fee" | "Disbursement";

interface Transaction {
  id: string;
  date: string;
  type: TxnType;
  description: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: "txn-01", date: "Aug 1, 2026",  type: "Order Payment",  description: "Order 114-8273649-0192837 · Bamboo Cutting Board Set",  amount:  29.74 },
  { id: "txn-02", date: "Aug 1, 2026",  type: "FBA Fee",         description: "Fulfillment fee — Cast Iron Skillet 12-inch",           amount: -5.31 },
  { id: "txn-03", date: "Jul 31, 2026", type: "Order Payment",   description: "Order 113-0293847-5610293 · Cast Iron Skillet",          amount:  42.46 },
  { id: "txn-04", date: "Jul 31, 2026", type: "Advertising",     description: "Sponsored Products — Campaign: Kitchen Essentials Auto", amount: -14.22 },
  { id: "txn-05", date: "Jul 30, 2026", type: "Order Payment",   description: "Order 112-3940182-7465019 · Silicone Utensil Set (×2)",   amount:  48.35 },
  { id: "txn-06", date: "Jul 30, 2026", type: "Refund",          description: "Refund issued — Order 113-0293847-5610293 (return)",     amount: -42.46 },
  { id: "txn-07", date: "Jul 29, 2026", type: "Storage Fee",     description: "Monthly FBA storage fee — July 2026",                   amount: -8.74 },
  { id: "txn-08", date: "Jul 28, 2026", type: "Order Payment",   description: "Order 111-7463920-2938471 · Stainless Mixing Bowls",     amount:  35.70 },
  { id: "txn-09", date: "Jul 28, 2026", type: "Advertising",     description: "Sponsored Brands — Campaign: Brand Defense",            amount: -9.88 },
  { id: "txn-10", date: "Jul 22, 2026", type: "Disbursement",    description: "Payment disbursed to bank account ****4892",            amount: -847.33 },
];

const typeIcon: Record<TxnType, React.ReactNode> = {
  "Order Payment": <ArrowDownCircle className="w-4 h-4 text-green-600" />,
  "Refund":        <ArrowUpCircle   className="w-4 h-4 text-red-500" />,
  "FBA Fee":       <ArrowUpCircle   className="w-4 h-4 text-orange-500" />,
  "Advertising":   <ArrowUpCircle   className="w-4 h-4 text-orange-500" />,
  "Storage Fee":   <ArrowUpCircle   className="w-4 h-4 text-orange-500" />,
  "Disbursement":  <ArrowUpCircle   className="w-4 h-4 text-blue-600" />,
};

const columns: DataTableColumn<Transaction>[] = [
  {
    key: "date",
    header: "Date",
    sortable: false,
    render: (row) => <span className="text-sm text-muted-foreground">{row.date}</span>,
  },
  {
    key: "type",
    header: "Type",
    sortable: false,
    render: (row) => (
      <div className="flex items-center gap-2">
        {typeIcon[row.type]}
        <span className="text-sm font-medium">{row.type}</span>
      </div>
    ),
  },
  {
    key: "description",
    header: "Description",
    sortable: false,
    render: (row) => <span className="text-sm text-muted-foreground max-w-xs truncate block">{row.description}</span>,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    render: (row) => (
      <span className={`text-sm font-semibold ${row.amount >= 0 ? "text-green-700" : "text-red-600"}`}>
        {row.amount >= 0 ? "+" : ""}${Math.abs(row.amount).toFixed(2)}
      </span>
    ),
  },
];

export default function Payments() {
  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const credits  = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const debits   = transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Payments"
        breadcrumbs={[{ label: "Payments" }, { label: "Transaction Ledger" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Payments & Disbursements"
          description="Amazon holds your sales proceeds for a settlement period (typically 7–14 days after the order ships) before disbursing funds to your bank account. During this time, fees for FBA fulfillment, referral, storage, advertising, and refunds are deducted. You receive the net amount — usually every 14 days on a rolling schedule."
          whyItMatters="Many new sellers are surprised that their bank deposit is much smaller than their total sales. Understanding the deductions — referral fee (8–15%), FBA fee, ad spend — helps you correctly calculate your true profit per unit before you set a price."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Next Disbursement card */}
          <div className="bg-white rounded-lg border shadow-sm p-5 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#146EB4]" />
              <h2 className="font-semibold text-sm">Next Disbursement</h2>
            </div>
            <div className="text-2xl font-bold text-[#146EB4] mb-1">Aug 8, 2026</div>
            <div className="text-xs text-muted-foreground mb-4">Every 14 days · Bank account ****4892</div>
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated amount</span>
                <span className="font-semibold text-green-700">~$420.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement period</span>
                <span>Aug 1–7, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status="pending" label="Pending" />
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-800">
              <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              Funds held in reserve for active A-to-Z claims are not included in this estimate.
            </div>
          </div>

          {/* Balance summary */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 content-start">
            {[
              { label: "Current Account Balance",  value: `$${balance.toFixed(2)}`,    icon: <DollarSign className="w-4 h-4 text-muted-foreground" />, color: balance >= 0 ? "text-green-700" : "text-red-600" },
              { label: "Credits (this period)",     value: `+$${credits.toFixed(2)}`,   icon: <ArrowDownCircle className="w-4 h-4 text-green-500" />,   color: "text-green-700" },
              { label: "Debits (this period)",      value: `-$${Math.abs(debits).toFixed(2)}`, icon: <ArrowUpCircle className="w-4 h-4 text-red-400" />, color: "text-red-600" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg border px-5 py-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  {s.icon}
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
            <div className="sm:col-span-3 bg-white rounded-lg border shadow-sm px-5 py-4">
              <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Fee Breakdown (this period)</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {[
                  { label: "Referral Fees",   value: "$24.53" },
                  { label: "FBA Fees",         value: "$5.31" },
                  { label: "Ad Spend",         value: "$24.10" },
                  { label: "Storage Fees",     value: "$8.74" },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-xs text-muted-foreground mb-0.5">{f.label}</div>
                    <div className="font-semibold text-red-600">−{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction ledger */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h2 className="font-semibold mb-4">Transaction Ledger</h2>
          <DataTable columns={columns} data={transactions} />
        </div>
      </div>
    </div>
  );
}
