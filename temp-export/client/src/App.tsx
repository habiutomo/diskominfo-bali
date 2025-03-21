import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import News from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import Services from "@/pages/services";
import Publications from "@/pages/publications";
import Contact from "@/pages/contact";

// Admin pages
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  // Render admin routes without header and footer
  if (isAdminRoute) {
    return (
      <Switch>
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/news">
          <AdminDashboard />
        </Route>
        <Route path="/admin/publications">
          <AdminDashboard />
        </Route>
        <Route path="/admin/settings">
          <AdminDashboard />
        </Route>
        <Route path="/admin">
          <AdminDashboard />
        </Route>
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Render public routes with header and footer
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsDetail} />
      <Route path="/services" component={Services} />
      <Route path="/publications" component={Publications} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      {isAdminRoute ? (
        // Admin pages layout (no header/footer)
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Router />
          </main>
        </div>
      ) : (
        // Public pages layout (with header/footer)
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToTop} 
      className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition duration-300 z-50"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}

export default App;
