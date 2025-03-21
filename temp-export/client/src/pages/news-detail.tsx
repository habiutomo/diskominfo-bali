import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { News } from "@shared/schema";
import { formatDate } from "@/lib/date-utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const NewsDetail = () => {
  const { slug } = useParams();
  
  const { data: newsItem, isLoading, error } = useQuery<News>({
    queryKey: [`/api/news/${slug}`],
  });

  if (isLoading) {
    return <NewsDetailSkeleton />;
  }

  if (error || !newsItem) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center py-10">
          <h1 className="text-2xl font-bold text-primary mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Maaf, berita yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <Link href="/news">
            <Button className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Berita
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-2">
          <Link href="/news" className="text-primary hover:text-secondary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Berita
          </Link>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4">{newsItem.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatDate(newsItem.createdAt)}</span>
            </div>
            
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
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
          
          <Separator className="mb-6" />
        </div>
        
        {newsItem.imageUrl && (
          <div className="mb-6">
            <img 
              src={newsItem.imageUrl} 
              alt={newsItem.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        
        <Separator className="mb-6" />
        
        <div className="flex justify-between items-center">
          <Link href="/news" className="text-primary hover:text-secondary inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Berita Lainnya
          </Link>
          
          <div className="flex space-x-2">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(newsItem.title)}`} target="_blank" rel="noopener noreferrer" className="bg-[#1DA1F2] text-white p-2 rounded hover:bg-opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-[#4267B2] text-white p-2 rounded hover:bg-opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(newsItem.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-2 rounded hover:bg-opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.87 0-3.688-.583-5.19-1.676l-.372-.223-3.854 1.011.032-.059 1.03-3.763-.247-.387A10.875 10.875 0 0 1 2 12.21c0-6.015 4.91-10.897 10.955-10.897 2.927 0 5.676 1.141 7.746 3.204a10.875 10.875 0 0 1 3.209 7.75c0 6.015-4.91 10.897-10.954 10.897 0 0 .003 0 0 0zM6.022 17.5l3.92-1.026.41.24a9.083 9.083 0 0 0 5.207 1.61h.003c5.031 0 9.122-4.067 9.122-9.065 0-2.422-.945-4.698-2.662-6.412a9.071 9.071 0 0 0-6.453-2.67c-5.031 0-9.121 4.067-9.121 9.065 0 1.707.504 3.369 1.46 4.785l.255.374-1.05 3.837.907.266z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="max-w-3xl mx-auto">
      <div className="mb-2">
        <Skeleton className="h-6 w-32" />
      </div>
      
      <div className="mb-6">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        <Skeleton className="h-1 w-full mb-6" />
      </div>
      
      <Skeleton className="w-full h-96 rounded-lg mb-6" />
      
      <div className="space-y-4 mb-8">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </div>
  </div>
);

export default NewsDetail;
