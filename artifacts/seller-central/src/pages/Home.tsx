import { LearnRibbon } from "@/components/LearnRibbon";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Package, DollarSign, ShoppingCart, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Generate fake sales data for last 30 days
const generateSalesData = () => {
  const data = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sales: Math.floor(Math.random() * 3700) + 800,
    });
  }
  return data;
};

const salesData = generateSalesData();

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  return (
    <div className="bg-card border border-card-border rounded-md p-4" data-testid={`kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 text-xs">
              {trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 text-red-600" />}
              {trend === 'neutral' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
              <span className={
                trend === 'up' ? 'text-green-600' :
                trend === 'down' ? 'text-red-600' :
                'text-amber-600'
              }>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface AlertItemProps {
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  subtitle: string;
}

function AlertItem({ type, title, subtitle }: AlertItemProps) {
  const styles = {
    error: { border: 'border-red-500', icon: <AlertTriangle className="w-5 h-5 text-red-600" /> },
    warning: { border: 'border-amber-500', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
    success: { border: 'border-green-500', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
    info: { border: 'border-blue-500', icon: <Activity className="w-5 h-5 text-blue-600" /> },
  };

  return (
    <div className={`bg-card border-l-4 ${styles[type].border} border-y border-r border-card-border p-4 flex items-start gap-3`} data-testid={`alert-${type}`}>
      <div className="flex-shrink-0 mt-0.5">
        {styles[type].icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm text-foreground mb-0.5">{title}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <button className="text-primary text-sm font-medium hover:underline" data-testid="button-view-alert">
        View
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Learn Ribbon */}
        <LearnRibbon
          title="Seller Central Home"
          description="This is your main command center. You can see your sales performance, active listings health, and action items that need attention."
          whyItMatters="Checking your dashboard daily keeps you ahead of listing issues and stockouts before they hurt your rankings."
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Sales Today"
            value="$2,847.50"
            change="+12.3% vs yesterday"
            trend="up"
            icon={<DollarSign className="w-8 h-8" />}
          />
          <KPICard
            title="Units Ordered"
            value="143 units"
            change="+8 vs yesterday"
            trend="up"
            icon={<Package className="w-8 h-8" />}
          />
          <KPICard
            title="Orders Awaiting Shipment"
            value="17 orders"
            change="Action needed"
            trend="neutral"
            icon={<ShoppingCart className="w-8 h-8" />}
          />
          <KPICard
            title="Account Health"
            value="Good"
            change="247 / 300"
            trend="up"
            icon={<Activity className="w-8 h-8" />}
          />
        </div>

        {/* Sales Chart */}
        <div className="bg-card border border-card-border rounded-md p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Sales Performance — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#146EB4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#146EB4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#146EB4"
                strokeWidth={2}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks & Alerts */}
        <div className="bg-card border border-card-border rounded-md overflow-hidden">
          <div className="px-6 py-4 border-b border-card-border">
            <h3 className="text-lg font-bold text-foreground">Tasks & Alerts</h3>
          </div>
          <div className="divide-y divide-card-border">
            <AlertItem
              type="error"
              title="2 listings need attention"
              subtitle="Suppressed due to missing attributes"
            />
            <AlertItem
              type="warning"
              title="IPI score updated"
              subtitle="Your Inventory Performance Index is 487 (Good)"
            />
            <AlertItem
              type="warning"
              title="17 orders awaiting shipment"
              subtitle="Ship by today to meet promised delivery"
            />
            <AlertItem
              type="success"
              title="New Buy Box win"
              subtitle="ACME Bamboo Cutting Board won Buy Box"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
