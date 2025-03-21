import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { News } from "@shared/schema";
import { formatSimpleDate } from "@/lib/date-utils";
import { Skeleton } from "@/components/ui/skeleton";

const NewsSection = () => {
  const { data: news, isLoading, error } = useQuery<News[]>({
    queryKey: ['/api/news'],
  });

  if (error) {
    return (
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Berita Terkini</h2>
            <p className="text-red-500">Gagal memuat berita. Silakan coba lagi nanti.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-20 left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="text-[#F7941D] font-semibold text-sm md:text-base uppercase tracking-wider mb-2 inline-block">Update Terkini</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative">
              Berita & Pengumuman
              <div className="absolute -bottom-3 left-0 w-20 h-1 bg-[#F7941D] rounded-full hidden md:block"></div>
            </h2>
          </div>
          <Link 
            href="/news" 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
          >
            Lihat Semua Berita
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
        
        {isLoading ? (
          <NewsLoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured News */}
            {news && news.length > 0 && (
              <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="md:flex h-full">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img 
                      src={news[0].imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                      alt={news[0].title} 
                      className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <div className="inline-block bg-[#F7941D] text-white text-xs px-3 py-1 rounded-full font-medium mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                        {news[0].category}
                      </div>
                      <div className="text-sm opacity-90 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatSimpleDate(news[0].createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="font-bold text-2xl mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {news[0].title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{news[0].excerpt}</p>
                    <Link 
                      href={`/news/${news[0].slug}`} 
                      className="mt-auto text-primary group-hover:text-[#F7941D] font-semibold inline-flex items-center transition-all duration-300"
                    >
                      <span className="border-b border-transparent group-hover:border-[#F7941D]">Baca Selengkapnya</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:ml-2 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* News List */}
            <div className="col-span-1 space-y-8">
              {news && news.slice(1, 4).map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`${
                        item.category === 'Pengumuman' 
                          ? 'bg-[#F7941D]/10 text-[#F7941D]' 
                          : item.category === 'Berita' 
                            ? 'bg-primary/10 text-primary' 
                            : item.category === 'Kegiatan'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-700'
                      } text-xs px-3 py-1 rounded-full font-medium inline-block`}>
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-xs flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatSimpleDate(item.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                    <Link 
                      href={`/news/${item.slug}`} 
                      className="text-primary group-hover:text-[#F7941D] font-semibold text-sm inline-flex items-center transition-all duration-300"
                    >
                      <span className="border-b border-transparent group-hover:border-[#F7941D]">Baca Selengkapnya</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:ml-2 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const NewsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Featured News Skeleton */}
    <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <Skeleton className="w-full h-64 md:h-full" />
        </div>
        <div className="md:w-1/2 p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-8 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-6 w-36" />
        </div>
      </div>
    </div>
    
    {/* News List Skeleton */}
    <div className="col-span-1 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <Skeleton className="h-6 w-36" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NewsSection;
