import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import OwnerLogin from "./pages/owner/Login";
import OwnerRegister from "./pages/owner/Register";
import OwnerDashboardLayout from "./pages/owner/DashboardLayout";
import OwnerDashboard from "./pages/owner/Dashboard";
import OwnerVehicles from "./pages/owner/Vehicles";
import OwnerMaintenance from "./pages/owner/Maintenance";
import OwnerPlanning from "./pages/owner/Planning";
import OwnerReports from "./pages/owner/Reports";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOwners from "./pages/admin/Owners";
import AdminDrivers from "./pages/admin/Drivers";
import AdminVehicles from "./pages/admin/Vehicles";
import AdminPlanning from "./pages/admin/Planning";
import AdminFinance from "./pages/admin/Finance";
import AdminNotifications from "./pages/admin/Notifications";
import NotFound from "./pages/NotFound";
import { SessionContextProvider, useSession } from "./components/SessionContextProvider";

const queryClient = new QueryClient();

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: string[] }> = ({ children, roles }) => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <div>Chargement de l'authentification...</div>; // Or a spinner component
  }

  if (!user) {
    return <Navigate to="/owner/login" replace />;
  }

  // Basic role check (can be expanded with actual role management from profiles table)
  // For now, we'll assume any authenticated user can access owner dashboard
  // and we'll need more logic for admin roles later.
  if (roles && roles.includes('admin') && user.email !== 'admin@example.com') { // Placeholder for admin check
    return <Navigate to="/owner/dashboard" replace />; // Redirect non-admins
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider> {/* Enveloppe toutes les routes avec SessionContextProvider */}
          <Routes>
            {/* Public Pages with Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} /> 
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Owner Authentication */}
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/register" element={<OwnerRegister />} />

            {/* Owner Dashboard Routes (Protected) */}
            <Route path="/owner/dashboard" element={<ProtectedRoute><OwnerDashboardLayout /></ProtectedRoute>}>
              <Route index element={<OwnerDashboard />} />
              <Route path="vehicles" element={<OwnerVehicles />} />
              <Route path="maintenance" element={<OwnerMaintenance />} />
              <Route path="planning" element={<OwnerPlanning />} />
              <Route path="reports" element={<OwnerReports />} />
              {/* Add other owner dashboard routes here */}
            </Route>

            {/* Admin Back-Office Routes (Protected - Placeholder for admin role check) */}
            <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboardLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="owners" element={<AdminOwners />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="planning" element="<AdminPlanning />" /> {/* Correction: doit être un composant */}
              <Route path="finance" element={<AdminFinance />} />
              <Route path="notifications" element={<AdminNotifications />} />
              {/* Add other admin dashboard routes here */}
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;