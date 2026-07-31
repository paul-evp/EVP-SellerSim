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
