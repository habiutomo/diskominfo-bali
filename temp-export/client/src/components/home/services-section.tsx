import { Link } from "wouter";
import { services } from "@/data/services";

const ServicesSection = () => {
  // Get icon component based on name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "server":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case "bar-chart":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case "globe":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        );
      case "headphones":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14 relative z-10">
          <span className="text-[#F7941D] font-semibold text-sm md:text-base uppercase tracking-wider mb-2 inline-block">Solusi Digital Terintegrasi</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 relative inline-block">
            Layanan Kami
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F7941D] rounded-full"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-base md:text-lg">
            Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyediakan berbagai layanan untuk mendukung transformasi digital di Bali.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:border-primary/20 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-[#F7941D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="p-8">
                <div className="w-16 h-16 mb-6 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 transform">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <Link 
                  href={service.url} 
                  className="text-primary font-semibold inline-flex items-center group-hover:text-[#F7941D] transition-all duration-300"
                >
                  <span className="border-b border-transparent group-hover:border-[#F7941D]">Selengkapnya</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:ml-2 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services" 
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 shadow hover:shadow-lg"
          >
            Lihat Semua Layanan
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

export default ServicesSection;
