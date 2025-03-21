import { useQuery } from "@tanstack/react-query";
import { Publication } from "@shared/schema";
import { Separator } from "@/components/ui/separator";
import { formatSimpleDate } from "@/lib/date-utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PublicationsPage = () => {
  const { data: publications, isLoading, error } = useQuery<Publication[]>({
    queryKey: ['/api/publications'],
  });

  // Function to get file icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M9 15v-4"></path>
            <path d="M9 15h6"></path>
          </svg>
        );
      case 'excel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="8" y1="16" x2="16" y2="16"></line>
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Publikasi & Dokumen</h1>
        <Separator className="mb-6" />
        <p className="text-gray-600 mb-6">
          Akses dokumen resmi, laporan, statistik, dan publikasi lainnya dari Dinas Komunikasi, Informatika dan Statistik Provinsi Bali.
        </p>
      </div>

      <Tabs defaultValue="dokumen" className="mb-10">
        <TabsList className="mb-6 space-x-2">
          <TabsTrigger value="dokumen" id="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="infografis" id="infografis">Infografis</TabsTrigger>
          <TabsTrigger value="galeri" id="galeri">Galeri</TabsTrigger>
        </TabsList>

        <TabsContent value="dokumen">
          {isLoading ? (
            <PublicationsLoadingSkeleton />
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">Terjadi kesalahan saat memuat dokumen.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Coba Lagi
              </button>
            </div>
          ) : publications && publications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications.map((pub) => (
                <div key={pub.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${
                        pub.fileType.toLowerCase() === 'pdf' 
                          ? 'bg-red-100' 
                          : pub.fileType.toLowerCase() === 'excel' 
                            ? 'bg-green-100' 
                            : 'bg-blue-100'
                      } rounded-lg p-3`}>
                        {getFileIcon(pub.fileType)}
                      </div>
                      <span className="text-xs text-gray-500">{formatSimpleDate(pub.createdAt)}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{pub.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pub.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{pub.fileType} • {pub.fileSize}</span>
                      <a 
                        href={pub.downloadUrl} 
                        className="bg-primary hover:bg-primary/90 text-white text-sm px-3 py-1 rounded flex items-center transition duration-300"
                        download
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada dokumen yang tersedia saat ini.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="infografis">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Infografis</h2>
            <p className="text-gray-600 mb-6">
              Visualisasi data dan informasi dalam bentuk infografis yang menarik dan informatif untuk memudahkan pemahaman masyarakat.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-100 p-4 aspect-[4/3] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                    <circle cx="8" cy="8" r="2"></circle>
                    <path d="M18 14l-2-2-4 4-2-2-3 3"></path>
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Perkembangan Pengguna Internet di Bali 2023</h3>
                  <p className="text-gray-600 text-sm">Infografis mengenai statistik pengguna internet di Provinsi Bali per Kabupaten/Kota pada tahun 2023.</p>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-100 p-4 aspect-[4/3] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"></path>
                    <path d="M18 17V9"></path>
                    <path d="M13 17V5"></path>
                    <path d="M8 17v-3"></path>
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Alur Layanan Perizinan Online 2023</h3>
                  <p className="text-gray-600 text-sm">Infografis mengenai alur proses perizinan online melalui portal layanan terpadu Provinsi Bali.</p>
                </div>
              </div>
            </div>
            
            <p className="text-center mt-6 text-sm text-gray-500">
              Infografis lainnya akan segera ditambahkan. Mohon kunjungi kembali halaman ini nanti.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="galeri">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Galeri</h2>
            <p className="text-gray-600 mb-6">
              Dokumentasi kegiatan Dinas Komunikasi, Informatika dan Statistik Provinsi Bali dalam bentuk foto dan video.
            </p>
            
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p className="text-gray-500">
                Konten galeri sedang dalam proses pengembangan. <br />
                Silakan kunjungi kembali halaman ini nanti.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PublicationsLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
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

export default PublicationsPage;
