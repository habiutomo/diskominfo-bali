import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { News } from "@shared/schema";
import { formatSimpleDate } from "@/lib/date-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const NewsPage = () => {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Parse the search parameters manually
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [location]);

  const { data: allNews, isLoading, error } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setLocation("/news");
    } else {
      setLocation(`/news?category=${value}`);
    }
  };

  const filterNewsByCategory = (news: News[] | undefined, category: string) => {
    if (!news) return [];
    if (category === "all") return news;
    return news.filter(item => item.category === category);
  };

  const filteredNews = filterNewsByCategory(allNews, activeTab);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Berita & Pengumuman</h1>
        <Separator className="mb-6" />
        <p className="text-gray-600">
          Informasi terkini seputar kegiatan, pengumuman, dan berita dari Dinas Komunikasi, Informatika dan Statistik Provinsi Bali.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-10">
        <TabsList className="mb-6 space-x-2">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="Berita">Berita</TabsTrigger>
          <TabsTrigger value="Pengumuman">Pengumuman</TabsTrigger>
          <TabsTrigger value="Kegiatan">Kegiatan</TabsTrigger>
          <TabsTrigger value="Informasi">Informasi</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <NewsLoadingSkeleton />
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">Terjadi kesalahan saat memuat berita.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Coba Lagi
              </button>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada berita dalam kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((newsItem) => (
                <div key={newsItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="relative h-48">
                    <img 
                      src={newsItem.imageUrl || "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                      alt={newsItem.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        newsItem.category === 'Pengumuman' 
                          ? 'bg-[#F7941D]/10 text-[#F7941D]' 
                          : newsItem.category === 'Berita' 
                            ? 'bg-primary/10 text-primary' 
                            : newsItem.category === 'Kegiatan'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-700'
                      }`}>
                        {newsItem.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-500 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatSimpleDate(newsItem.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{newsItem.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{newsItem.excerpt}</p>
                    <Link href={`/news/${newsItem.slug}`} className="text-primary hover:text-secondary font-semibold text-sm inline-flex items-center">
                      Baca Selengkapnya 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NewsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="p-5">
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-6 w-36" />
        </div>
      </div>
    ))}
  </div>
);

export default NewsPage;
