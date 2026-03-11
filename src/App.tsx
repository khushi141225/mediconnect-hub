import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { I18nProvider } from "@/lib/i18n";
import AppLayout from "@/components/layout/AppLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import EmergencyPage from "@/pages/EmergencyPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SharingPage from "@/pages/SharingPage";
import EquipmentPage from "@/pages/EquipmentPage";
import DoctorsPage from "@/pages/DoctorsPage";
import MapPage from "@/pages/MapPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import PatientDashboard from "@/pages/PatientDashboard";
import ProfilePage from "@/pages/ProfilePage";
import PatientRecordsPage from "@/pages/PatientRecordsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={user?.role === 'patient' ? <PatientDashboard /> : <DashboardPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/sharing" element={<SharingPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/patient-records" element={<PatientRecordsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
