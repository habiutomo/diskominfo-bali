import { useState } from "react";
import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DropdownItemProps {
  title: string;
  items: { label: string; href: string }[];
}

const MobileDropdownItem = ({ title, items }: DropdownItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div className="mobile-dropdown">
        <button
          onClick={toggleDropdown}
          className="w-full block py-2 text-primary hover:text-secondary font-semibold flex justify-between items-center"
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <ul className={`pl-4 space-y-1 mt-1 ${isOpen ? 'block' : 'hidden'}`}>
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="block py-1 text-sm text-gray-700 hover:text-primary"
                onClick={(e) => {
                  onClose();
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white shadow-md md:hidden">
      <div className="container mx-auto px-4 py-2">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className="block py-2 text-primary hover:text-secondary font-semibold"
              onClick={onClose}
            >
              Beranda
            </Link>
          </li>
          
          <MobileDropdownItem
            title="Profil"
            items={[
              { label: "Sejarah", href: "/profile#sejarah" },
              { label: "Visi & Misi", href: "/profile#visi-misi" },
              { label: "Struktur Organisasi", href: "/profile#struktur" },
              { label: "Tupoksi", href: "/profile#tupoksi" }
            ]}
          />
          
          <MobileDropdownItem
            title="Berita"
            items={[
              { label: "Berita Terkini", href: "/news?category=Berita" },
              { label: "Pengumuman", href: "/news?category=Pengumuman" },
              { label: "Agenda", href: "/news?category=Agenda" }
            ]}
          />
          
          <MobileDropdownItem
            title="Layanan"
            items={[
              { label: "E-Government", href: "/services#e-government" },
              { label: "Pengaduan", href: "/services#pengaduan" },
              { label: "Statistik", href: "/services#statistik" }
            ]}
          />
          
          <MobileDropdownItem
            title="Publikasi"
            items={[
              { label: "Dokumen", href: "/publications#dokumen" },
              { label: "Infografis", href: "/publications#infografis" },
              { label: "Galeri", href: "/publications#galeri" }
            ]}
          />
          
          <li>
            <Link 
              href="/contact" 
              className="block py-2 text-primary hover:text-secondary font-semibold"
              onClick={onClose}
            >
              Kontak
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
