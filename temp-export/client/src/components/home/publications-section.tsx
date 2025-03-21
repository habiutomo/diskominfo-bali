import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Publication } from "@shared/schema";
import { formatSimpleDate } from "@/lib/date-utils";
import { Skeleton } from "@/components/ui/skeleton";

const PublicationsSection = () => {
  const { data: publications, isLoading, error } = useQuery<Publication[]>({
    queryKey: ['/api/publications'],
  });

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Publikasi & Dokumen</h2>
            <p className="text-red-500">Gagal memuat publikasi. Silakan coba lagi nanti.</p>
          </div>
        </div>
      </section>
    );
  }

  // Function to get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M9 15v-4"></path>
            <path d="M9 15h6"></path>
          </svg>
        );
      case 'excel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="8" y1="16" x2="16" y2="16"></line>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        );
    }
  };

  return (
    <section className="py-20 bg-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
      <div className="absolute -top-32 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="text-[#F7941D] font-semibold text-sm md:text-base uppercase tracking-wider mb-2 inline-block">Akses Informasi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative">
              Publikasi & Dokumen
              <div className="absolute -bottom-3 left-0 w-20 h-1 bg-[#F7941D] rounded-full hidden md:block"></div>
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl text-center md:text-right">
            Akses dokumen, publikasi resmi, dan laporan statistik dari Diskominfos Provinsi Bali.
          </p>
        </div>
        
        {isLoading ? (
          <PublicationsLoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications && publications.slice(0, 3).map((pub) => (
              <div key={pub.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div className={`${
                      pub.fileType.toLowerCase() === 'pdf' 
                        ? 'bg-red-50 group-hover:bg-red-100' 
                        : pub.fileType.toLowerCase() === 'excel' 
                          ? 'bg-green-50 group-hover:bg-green-100' 
                          : 'bg-blue-50 group-hover:bg-blue-100'
                    } rounded-xl p-4 transition-colors duration-300`}>
                      {getFileIcon(pub.fileType)}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 py-1 px-2 rounded-full">
                      {formatSimpleDate(pub.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">{pub.title}</h3>
                  <p className="text-gray-600 mb-5 line-clamp-2">{pub.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 py-1 px-3 rounded-full uppercase">
                      {pub.fileType} <span className="font-normal">• {pub.fileSize}</span>
                    </span>
                    <a 
                      href={pub.downloadUrl} 
                      className="group-hover:bg-primary bg-primary/90 text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 shadow-sm hover:shadow-md"
                      download
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/publications" 
            className="inline-flex items-center justify-center bg-white border-2 border-primary hover:bg-primary/5 text-primary font-medium py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-lg"
          >
            Lihat Semua Publikasi
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const PublicationsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-neutral rounded-lg shadow-md overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-14 w-14 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PublicationsSection;
