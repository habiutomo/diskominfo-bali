import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { format } from 'date-fns';
import MobileMenu from "./mobile-menu";

const Header = () => {
  const [location] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(currentTime, "EEEE, dd MMMM yyyy");
  const formattedTime = format(currentTime, "HH:mm") + " WITA";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <span className="text-sm mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formattedDate}
              </span>
              <span className="text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {formattedTime}
              </span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-secondary transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Pencarian
              </a>
              <Link href="/contact" className="text-sm hover:text-secondary transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Kontak
              </Link>
              <a href="#" className="text-sm hover:text-secondary transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo and Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 60"
                  className="h-16"
                  fill="#046CB4"
                >
                  <path d="M20 10h60v40H20z" opacity="0.1" />
                  <path d="M25 15h50v30H25z" opacity="0.2" />
                  <path d="M30 20h40v20H30z" opacity="0.3" />
                  <path d="M10 25a5 5 0 0 1 5-5h70a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V25z" opacity="0.4" />
                </svg>
              </Link>
              <div className="ml-4">
                <h1 className="font-bold text-xl text-primary">DINAS KOMUNIKASI, INFORMATIKA DAN STATISTIK</h1>
                <p className="text-sm text-gray-600">PEMERINTAH PROVINSI BALI</p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                aria-label="Toggle mobile menu"
                onClick={toggleMobileMenu} 
                className="text-primary focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-1">
                <li className="group relative">
                  <Link 
                    href="/" 
                    className={`block px-4 py-2 font-semibold ${isActive('/') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Beranda
                  </Link>
                </li>
                
                <li className="group relative">
                  <Link 
                    href="/profile" 
                    className={`block px-4 py-2 font-semibold ${isActive('/profile') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Profil
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <ul className="dropdown-menu hidden absolute z-10 bg-white shadow-lg rounded w-48 group-hover:block">
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Sejarah</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Visi & Misi</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Struktur Organisasi</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Tupoksi</a></li>
                  </ul>
                </li>
                
                <li className="group relative">
                  <Link 
                    href="/news" 
                    className={`block px-4 py-2 font-semibold ${isActive('/news') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Berita
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <ul className="dropdown-menu hidden absolute z-10 bg-white shadow-lg rounded w-48 group-hover:block">
                    <li><a href="/news?category=Berita" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Berita Terkini</a></li>
                    <li><a href="/news?category=Pengumuman" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Pengumuman</a></li>
                    <li><a href="/news?category=Agenda" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Agenda</a></li>
                  </ul>
                </li>
                
                <li className="group relative">
                  <Link 
                    href="/services" 
                    className={`block px-4 py-2 font-semibold ${isActive('/services') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Layanan
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <ul className="dropdown-menu hidden absolute z-10 bg-white shadow-lg rounded w-48 group-hover:block">
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">E-Government</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Pengaduan</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Statistik</a></li>
                  </ul>
                </li>
                
                <li className="group relative">
                  <Link 
                    href="/publications"
                    className={`block px-4 py-2 font-semibold ${isActive('/publications') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Publikasi
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <ul className="dropdown-menu hidden absolute z-10 bg-white shadow-lg rounded w-48 group-hover:block">
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Dokumen</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Infografis</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm hover:bg-neutral hover:text-primary">Galeri</a></li>
                  </ul>
                </li>
                
                <li className="group relative">
                  <Link 
                    href="/contact" 
                    className={`block px-4 py-2 font-semibold ${isActive('/contact') 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'} transition duration-300`}
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
