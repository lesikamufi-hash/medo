import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import the new Layout component
import Home from "./pages/Home"; // Import the new Home page
import About from "./pages/About"; // Import the new About page
import Services from "./pages/Services"; // Import the new Services page
import Contact from "./pages/Contact"; // Import the new Contact page
import OwnerLogin from "./pages/owner/Login"; // Import Owner Login
import OwnerRegister from "./pages/owner/Register"; // Import Owner Register
import OwnerDashboardLayout from "./pages/owner/DashboardLayout"; // Import Owner Dashboard Layout
import OwnerDashboard from "./pages/owner/Dashboard"; // Import Owner Dashboard
import OwnerVehicles from "./pages/owner/Vehicles"; // Import Owner Vehicles
import OwnerMaintenance from "./pages/owner/Maintenance"; // Import Owner Maintenance
import OwnerPlanning from "./pages/owner/Planning"; // Import Owner Planning
import OwnerReports from "./pages/owner/Reports"; // Import Owner Reports
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout"; // Import Admin Dashboard Layout
import AdminDashboard from "./pages/admin/Dashboard"; // Import Admin Dashboard
import AdminOwners from "./pages/admin/Owners"; // Import Admin Owners
import AdminDrivers from "./pages/admin/Drivers"; // Import Admin Drivers
import AdminVehicles from "./pages/admin/Vehicles"; // Import Admin Vehicles
import AdminPlanning from "./pages/admin/Planning"; // Import Admin Planning
import AdminFinance from "./pages/admin/Finance"; // Import Admin Finance
import AdminNotifications from "./pages/admin/Notifications"; // Import Admin Notifications
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Owner Authentication */}
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/register" element={<OwnerRegister />} />

          {/* Owner Dashboard Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboardLayout />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="vehicles" element={<OwnerVehicles />} />
            <Route path="maintenance" element={<OwnerMaintenance />} />
            <Route path="planning" element={<OwnerPlanning />} />
            <Route path="reports" element={<OwnerReports />} />
            {/* Add other owner dashboard routes here */}
          </Route>

          {/* Admin Back-Office Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;