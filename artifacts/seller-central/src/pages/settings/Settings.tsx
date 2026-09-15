import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LearnRibbon } from "@/components/LearnRibbon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { User, Bell, Users, CheckCircle, Shield, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "account" | "notifications" | "permissions";

const tabConfig: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "account",       label: "Account Info",             icon: <User  className="w-4 h-4" /> },
  { id: "notifications", label: "Notification Preferences", icon: <Bell  className="w-4 h-4" /> },
  { id: "permissions",   label: "User Permissions",         icon: <Users className="w-4 h-4" /> },
];

interface Permission {
  id: string;
  name: string;
  email: string;
  role: string;
  access: string[];
}

const userPermissions: Permission[] = [
  {
    id: "perm-1",
    name: "Store Admin (You)",
    email: "seller@acmehomegoods.com",
    role: "Primary Account Holder",
    access: ["Inventory", "Orders", "Pricing", "Advertising", "Payments", "Reports", "Account Health"],
  },
  {
    id: "perm-2",
    name: "VA — Inventory Manager",
    email: "va-inventory@example.com",
    role: "Seller-defined",
    access: ["Inventory", "Orders"],
  },
  {
    id: "perm-3",
    name: "Agency — Ad Manager",
    email: "ads@marketingagency.com",
    role: "Seller-defined",
    access: ["Advertising"],
  },
];

const notificationGroups = [
  {
    group: "Orders & Fulfillment",
    items: [
      { id: "n1",  label: "New orders received",               email: true,  sms: false },
      { id: "n2",  label: "Order cancellation requests",        email: true,  sms: true  },
      { id: "n3",  label: "Late shipment warnings",             email: true,  sms: true  },
      { id: "n4",  label: "Return requests",                    email: true,  sms: false },
    ],
  },
  {
    group: "Account Health",
    items: [
      { id: "n5",  label: "Account health alerts",              email: true,  sms: true  },
      { id: "n6",  label: "A-to-Z Guarantee claim filed",       email: true,  sms: true  },
      { id: "n7",  label: "Policy violation warnings",          email: true,  sms: false },
    ],
  },
  {
    group: "Payments",
    items: [
      { id: "n8",  label: "Disbursement sent to bank",          email: true,  sms: false },
      { id: "n9",  label: "Payment holds or reserves added",    email: true,  sms: true  },
    ],
  },
  {
    group: "Inventory & Listings",
    items: [
      { id: "n10", label: "Listing suppressed or deactivated",  email: true,  sms: false },
      { id: "n11", label: "FBA shipment received",              email: true,  sms: false },
      { id: "n12", label: "Low stock alerts",                   email: false, sms: false },
    ],
  },
];

function AccountTab({ saved, setSaved }: { saved: boolean; setSaved: (v: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border shadow-sm p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "business-name", label: "Business Name",       defaultValue: "EVP Sarisari Store LLC" },
            { id: "display-name",  label: "Seller Display Name", defaultValue: "EVP Sarisari Store" },
            { id: "email",         label: "Primary Email",       defaultValue: "seller@acmehomegoods.com" },
            { id: "phone",         label: "Business Phone",      defaultValue: "+1 (512) 555-0142" },
          ].map((f) => (
            <div key={f.id}>
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input id={f.id} defaultValue={f.defaultValue} data-testid={`input-${f.id}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Legal & Tax Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "entity-type",  label: "Business Entity Type", defaultValue: "LLC" },
            { id: "tax-id",       label: "Tax ID (EIN)",          defaultValue: "**-*******" },
            { id: "address-1",    label: "Business Address",      defaultValue: "482 Commerce Drive, Suite 100" },
            { id: "city-state",   label: "City, State, ZIP",      defaultValue: "Austin, TX 78701" },
          ].map((f) => (
            <div key={f.id}>
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input id={f.id} defaultValue={f.defaultValue} data-testid={`input-${f.id}`} />
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
          Tax information is verified by Amazon. Changes to your Tax ID or entity type require re-verification and may temporarily pause disbursements.
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-5">
        <h3 className="font-semibold mb-4">Deposit Method</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">BNK</div>
          <div>
            <div className="font-medium">Chase Business Checking</div>
            <div className="text-muted-foreground">Account ending in ****4892</div>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">Change Bank Account</Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-[#146EB4] hover:bg-[#0F5A92]"
          onClick={() => setSaved(true)}
          data-testid="button-save-account"
        >
          {saved ? <><CheckCircle className="w-4 h-4 mr-2" />Saved</> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [settings, setSettings] = useState<Record<string, { email: boolean; sms: boolean }>>(
    Object.fromEntries(
      notificationGroups.flatMap(g => g.items).map(item => [item.id, { email: item.email, sms: item.sms }])
    )
  );
  const [saved, setSaved] = useState(false);

  const toggle = (id: string, channel: "email" | "sms") => {
    setSaved(false);
    setSettings(prev => ({ ...prev, [id]: { ...prev[id], [channel]: !prev[id][channel] } }));
  };

  return (
    <div className="space-y-5">
      {notificationGroups.map((group) => (
        <div key={group.group} className="bg-white rounded-lg border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            {group.group === "Orders & Fulfillment" && <Mail  className="w-4 h-4 text-muted-foreground" />}
            {group.group === "Account Health"       && <Shield className="w-4 h-4 text-muted-foreground" />}
            {group.group === "Payments"             && <Mail  className="w-4 h-4 text-muted-foreground" />}
            {group.group === "Inventory & Listings" && <Bell  className="w-4 h-4 text-muted-foreground" />}
            {group.group}
          </h3>
          <div className="space-y-1">
            <div className="grid grid-cols-[1fr_80px_80px] text-xs text-muted-foreground font-medium pb-2 border-b">
              <span>Notification</span>
              <span className="text-center flex items-center justify-center gap-1"><Mail className="w-3 h-3" /> Email</span>
              <span className="text-center flex items-center justify-center gap-1"><Phone className="w-3 h-3" /> SMS</span>
            </div>
            {group.items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_80px_80px] items-center py-2 border-b last:border-0">
                <span className="text-sm">{item.label}</span>
                <div className="flex justify-center">
                  <Switch
                    checked={settings[item.id]?.email ?? false}
                    onCheckedChange={() => toggle(item.id, "email")}
                    data-testid={`switch-email-${item.id}`}
                  />
                </div>
                <div className="flex justify-center">
                  <Switch
                    checked={settings[item.id]?.sms ?? false}
                    onCheckedChange={() => toggle(item.id, "sms")}
                    data-testid={`switch-sms-${item.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button
          className="bg-[#146EB4] hover:bg-[#0F5A92]"
          onClick={() => setSaved(true)}
          data-testid="button-save-notifications"
        >
          {saved ? <><CheckCircle className="w-4 h-4 mr-2" />Saved</> : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}

function PermissionsTab() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-lg border shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> User Permissions</h3>
          <Button size="sm" className="bg-[#146EB4] hover:bg-[#0F5A92]" data-testid="button-invite-user">
            Invite User
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          You can give other users (virtual assistants, agencies, employees) access to specific parts of Seller Central. Users can only see and act on the permissions you grant — they cannot change your account settings or banking information.
        </p>
        <div className="space-y-4">
          {userPermissions.map((user) => (
            <div key={user.id} className="border rounded-lg p-4" data-testid={`user-card-${user.id}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Role: {user.role}</div>
                </div>
                {user.id !== "perm-1" && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Access</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {user.access.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-5">
        <h3 className="font-semibold mb-3 text-sm">Permission Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          {[
            ["Inventory",       "View and manage FBA/FBM inventory, shipments, restock."],
            ["Orders",          "View, confirm, and manage orders and returns."],
            ["Pricing",         "Edit prices, set repricer rules, manage promotions."],
            ["Advertising",     "Create and manage ad campaigns (Campaign Manager)."],
            ["Payments",        "View transaction ledger and disbursement schedule."],
            ["Reports",         "Request and download business and inventory reports."],
            ["Account Health",  "View performance metrics and policy compliance."],
          ].map(([label, desc]) => (
            <div key={label} className="flex gap-2 py-1 border-b last:border-0">
              <span className="font-semibold text-foreground w-28 flex-shrink-0">{label}</span>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [accountSaved, setAccountSaved] = useState(false);

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Settings" }]}
      />
      <div className="p-6 space-y-6">
        <LearnRibbon
          title="Account Settings"
          description="Settings covers your business information, notification preferences, and who has access to your Seller Central account. It's best practice to use User Permissions to give virtual assistants or agency partners limited access — never share your primary login credentials. Each user gets their own login with only the access they need."
          whyItMatters="Sharing your main account password is a security risk and violates Amazon's policies. A compromised seller account can result in unauthorized listings, price changes, or funds transfers. User Permissions lets you delegate work safely."
        />

        {/* Tab bar */}
        <div className="flex gap-1 bg-white rounded-lg border p-1 w-fit shadow-sm">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-[#146EB4] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
              )}
              data-testid={`tab-${tab.id}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "account"       && <AccountTab saved={accountSaved} setSaved={setAccountSaved} />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "permissions"   && <PermissionsTab />}
      </div>
    </div>
  );
}
