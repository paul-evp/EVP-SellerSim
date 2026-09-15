import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import ManageListings from '@/pages/catalog/ManageListings';
import AddProduct from '@/pages/catalog/AddProduct';
import ManageInventory from '@/pages/inventory/ManageInventory';
import FbaShipments from '@/pages/inventory/FbaShipments';
import RestockRecommendations from '@/pages/inventory/RestockRecommendations';
import ManagePricing from '@/pages/pricing/ManagePricing';
import AutomatePricing from '@/pages/pricing/AutomatePricing';
import Promotions from '@/pages/pricing/Promotions';
import CampaignManager from '@/pages/advertising/CampaignManager';
import CreateCampaign from '@/pages/advertising/CreateCampaign';
import BrandAnalytics from '@/pages/advertising/BrandAnalytics';
import ManageOrders from '@/pages/orders/ManageOrders';
import OrderDetail from '@/pages/orders/OrderDetail';
import Returns from '@/pages/orders/Returns';
import AtoZClaims from '@/pages/orders/AtoZClaims';
import BusinessReports from '@/pages/reports/BusinessReports';
import InventoryReports from '@/pages/reports/InventoryReports';
import Payments from '@/pages/payments/Payments';
import AccountHealth from '@/pages/performance/AccountHealth';
import Growth from '@/pages/growth/Growth';
import Brands from '@/pages/brands/Brands';
import Settings from '@/pages/settings/Settings';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';

const queryClient = new QueryClient();

function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/catalog/listings" component={ManageListings} />
        <Route path="/catalog/add-product" component={AddProduct} />
        <Route path="/inventory/manage" component={ManageInventory} />
        <Route path="/inventory/fba-shipments" component={FbaShipments} />
        <Route path="/inventory/restock" component={RestockRecommendations} />
        <Route path="/pricing/manage" component={ManagePricing} />
        <Route path="/pricing/automate" component={AutomatePricing} />
        <Route path="/pricing/promotions" component={Promotions} />
        <Route path="/advertising/campaigns" component={CampaignManager} />
        <Route path="/advertising/create" component={CreateCampaign} />
        <Route path="/advertising/brand-analytics" component={BrandAnalytics} />
        <Route path="/orders/manage" component={ManageOrders} />
        <Route path="/orders/returns" component={Returns} />
        <Route path="/orders/atoz" component={AtoZClaims} />
        <Route path="/orders/:id" component={OrderDetail} />
        <Route path="/reports/business" component={BusinessReports} />
        <Route path="/reports/inventory" component={InventoryReports} />
        <Route path="/payments" component={Payments} />
        <Route path="/performance" component={AccountHealth} />
        <Route path="/growth" component={Growth} />
        <Route path="/brands" component={Brands} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
