import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { News, Publication, ContactSubmission } from "@shared/schema";
import NewsList from "@/components/admin/news-list";
import PublicationsList from "@/components/admin/publications-list";
import AdminLayout from "@/components/admin/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper, 
  FileText, 
  MessageSquare,
  UsersRound,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Determine active section from URL
  const getActiveSection = () => {
    if (location.includes("/admin/news")) return "news";
    if (location.includes("/admin/publications")) return "publications";
    if (location.includes("/admin/settings")) return "settings";
    return "overview";
  };

  // Update active tab based on URL when component mounts
  useState(() => {
    setActiveTab(getActiveSection());
  });

  // Fetch data for dashboard
  const { data: news = [] } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  const { data: publications = [] } = useQuery<Publication[]>({
    queryKey: ['/api/publications'],
  });

  const { data: contacts = [] } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contacts'],
    // API may not exist yet, so we'll provide a default empty array
    enabled: false,
  });

  // Stats cards data
  const statsCards = [
    {
      title: "Total Berita",
      value: news.length,
      description: "Berita yang dipublikasikan",
      icon: <Newspaper className="h-5 w-5 text-primary" />,
    },
    {
      title: "Total Publikasi",
      value: publications.length,
      description: "Dokumen yang tersedia",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "Pesan Masuk",
      value: contacts.length,
      description: "Dari formulir kontak",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
    },
    {
      title: "Pengunjung",
      value: "1,024",
      description: "Dalam 7 hari terakhir",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
    },
  ];
  
  return (
    <AdminLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b px-4 py-2">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="news">Berita</TabsTrigger>
            <TabsTrigger value="publications">Publikasi</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>
          
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statsCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className="bg-primary/10 p-2 rounded-full">
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Recent Content */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Berita Terbaru</CardTitle>
                <CardDescription>
                  {news.length > 0 
                    ? `${news.length} berita telah dipublikasikan` 
                    : "Belum ada berita yang dipublikasikan"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {news.length > 0 ? (
                  <ul className="space-y-4">
                    {news.slice(0, 5).map((item: News) => (
                      <li key={item.id} className="border-b pb-2 last:border-0">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{item.category}</span>
                          <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    Belum ada berita
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publikasi Terbaru</CardTitle>
                <CardDescription>
                  {publications.length > 0 
                    ? `${publications.length} publikasi tersedia` 
                    : "Belum ada publikasi yang tersedia"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {publications.length > 0 ? (
                  <ul className="space-y-4">
                    {publications.slice(0, 5).map((item: Publication) => (
                      <li key={item.id} className="border-b pb-2 last:border-0">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{item.fileType}</span>
                          <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    Belum ada publikasi
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="news">
          <NewsList />
        </TabsContent>
        
        <TabsContent value="publications">
          <PublicationsList />
        </TabsContent>
        
        <TabsContent value="settings" className="p-6">
          <h2 className="text-2xl font-bold mb-6">Pengaturan</h2>
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Situs</CardTitle>
              <CardDescription>
                Fitur pengaturan sedang dalam pengembangan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Fitur ini akan tersedia dalam waktu dekat
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}