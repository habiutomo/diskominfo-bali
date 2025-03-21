import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Settings, 
  User,
  Menu,
  X,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Berita",
      href: "/admin/news",
      icon: <Newspaper className="h-5 w-5" />,
      children: [
        { title: "Semua Berita", href: "/admin/news" },
        { title: "Tambah Berita", href: "/admin/news/add" },
      ]
    },
    {
      title: "Publikasi",
      href: "/admin/publications",
      icon: <FileText className="h-5 w-5" />,
      children: [
        { title: "Semua Publikasi", href: "/admin/publications" },
        { title: "Tambah Publikasi", href: "/admin/publications/add" },
      ]
    },
    {
      title: "Pengaturan",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (href: string) => {
    return location === href || location.startsWith(href + "/");
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform bg-white border-r transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-1 rounded">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold">Admin Panel</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto py-4">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              item.children ? (
                <Accordion type="single" collapsible key={item.href}>
                  <AccordionItem value={item.title} className="border-none">
                    <AccordionTrigger className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                      isActive(item.href) && "bg-gray-100 text-primary",
                      "no-underline hover:no-underline"
                    )}>
                      <div className="flex items-center">
                        <span className="mr-3">
                          {item.icon}
                        </span>
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-10 space-y-1">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} 
                            className={cn(
                              "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                              isActive(child.href) && "bg-gray-100 text-primary"
                            )}>
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link key={item.href} href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                    isActive(item.href) && "bg-gray-100 text-primary"
                  )}>
                  <span className="mr-3">
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              )
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 mt-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={() => window.location.href = "/"}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16">
          <div className="px-4 flex justify-between items-center h-full">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Page title - hide on mobile */}
            <h1 className="text-xl font-semibold hidden md:block">
              {navItems.find(item => isActive(item.href))?.title || "Dashboard"}
            </h1>
            
            {/* User dropdown */}
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline-block">Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Pengaturan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}