import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ReportedUsers from "./pages/ReportedUsers";
import AddReportedUser from "./pages/AddReportedUser";
import Profile from "./pages/Profile";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { isAuthenticated } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {isAuthenticated() ? (
              <>
                <AppSidebar />
                <main className="flex-1">
                  <div className="p-4 lg:p-6">
                    <div className="mb-4">
                      <SidebarTrigger />
                    </div>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/reported-users" element={<ReportedUsers />} />
                      <Route path="/add-reported-user" element={<AddReportedUser />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/user/:id" element={<UserDetails />} />
                      <Route path="/manager-dashboard" element={
                        JSON.parse(localStorage.getItem('user') || '{}').isAdmin ? <ManagerDashboard /> : <NotFound />
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </>
            ) : (
              <Routes>
                <Route path="/*" element={<Login />} />
              </Routes>
            )}
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
