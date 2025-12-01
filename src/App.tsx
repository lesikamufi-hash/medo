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
import AdminLogin from "./pages/admin/Login";
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOwners from "./pages/admin/Owners";
import AdminDrivers from "./pages/admin/Drivers";
import AdminVehicles from "./pages/admin/Vehicles";
import AdminPlanning from "./pages/admin/Planning";
import AdminFinance from "./pages/admin/Finance";
import AdminNotifications from "./pages/admin/Notifications";
import AdminManagement from "./pages/admin/AdminManagement"; // Import the new AdminManagement page
import NotFound from "./pages/NotFound";
import { SessionContextProvider, useSession } from "./components/SessionContextProvider";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const queryClient = new QueryClient();

// ProtectedRoute component for owner/Supabase roles
const ProtectedRoute: React.FC<{ children: React.ReactNode, requiredRole?: string }> = ({ children, requiredRole }) => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <div>Chargement de l'authentification...</div>; // Or a spinner component
  }

  if (!user) {
    return <Navigate to="/owner/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If user is logged in but doesn't have the required role, redirect them
    if (user.role === 'owner') {
      return <Navigate to="/owner/dashboard" replace />;
    }
    // Default redirect for other unauthorized roles or no specific role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> {/* Added v7_relativeSplatPath flag here */}
        <SessionContextProvider>
          <Routes>
            {/* Public Pages with Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} /> 
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Owner Authentication */}
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/register" element={<OwnerRegister />} />

            {/* Owner Dashboard Routes (Protected by Supabase role) */}
            <Route path="/owner/dashboard" element={<ProtectedRoute requiredRole="owner"><OwnerDashboardLayout /></ProtectedRoute>}>
              <Route index element={<OwnerDashboard />} />
              <Route path="vehicles" element={<OwnerVehicles />} />
              <Route path="maintenance" element={<OwnerMaintenance />} />
              <Route path="planning" element={<OwnerPlanning />} />
              <Route path="reports" element={<OwnerReports />} />
              {/* Add other owner dashboard routes here */}
            </Route>

            {/* Admin Back-Office Routes (Protected by custom admin login) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboardLayout /></AdminProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminManagement />} /> {/* New Admin Management route */}
              <Route path="owners" element={<AdminOwners />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="planning" element={<AdminPlanning />} />
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