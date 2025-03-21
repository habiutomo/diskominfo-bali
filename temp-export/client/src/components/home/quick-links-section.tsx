import { quickLinks } from "@/data/quick-links";

const QuickLinksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#F7941D]/10 rounded-full blur-3xl"></div>
      
      {/* Sparkles elements */}
      <div className="absolute top-10 right-20 w-4 h-4 bg-white/20 rounded-full"></div>
      <div className="absolute top-40 left-1/4 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-white/20 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
            <span className="text-white/90 font-medium text-sm">Situs Terkait</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 drop-shadow-sm">Tautan Penting</h2>
          <p className="text-white/80 text-lg">
            Akses cepat ke layanan dan situs resmi pemerintah Provinsi Bali.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
          {quickLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center border border-white/10 hover:border-white/30 transform hover:-translate-y-1"
            >
              <div className="bg-white/10 group-hover:bg-white/20 rounded-full p-3 mb-4 transition-all duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 60"
                  className="w-10 h-10 object-contain"
                  fill="white"
                >
                  <path d="M20 10h60v40H20z" opacity="0.2" />
                  <path d="M25 15h50v30H25z" opacity="0.3" />
                  <path d="M30 20h40v20H30z" opacity="0.4" />
                  <path d="M10 25a5 5 0 0 1 5-5h70a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V25z" opacity="0.5" />
                </svg>
              </div>
              <span className="text-white font-semibold text-sm group-hover:text-white/95 transition-colors duration-300">{link.title}</span>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://www.baliprov.go.id/web/category/situs-terkait" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            Lihat Semua Tautan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
