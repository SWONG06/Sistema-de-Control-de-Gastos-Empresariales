import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { MobileNav } from "./components/ui/mobile-nav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TransactionsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </TransactionsProvider>
  </QueryClientProvider>
);

export default App;
