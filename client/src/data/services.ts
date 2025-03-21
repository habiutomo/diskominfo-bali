export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  url: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "E-Government",
    description: "Layanan sistem pemerintahan berbasis elektronik untuk meningkatkan kualitas pelayanan publik.",
    icon: "server",
    url: "/services#e-government"
  },
  {
    id: 2,
    title: "Data Statistik",
    description: "Penyediaan data statistik daerah untuk mendukung pembangunan dan pengambilan keputusan.",
    icon: "bar-chart",
    url: "/services#statistik"
  },
  {
    id: 3,
    title: "Diseminasi Informasi",
    description: "Penyebarluasan informasi pemerintah kepada masyarakat melalui berbagai media.",
    icon: "globe",
    url: "/services#diseminasi"
  },
  {
    id: 4,
    title: "Pengaduan",
    description: "Layanan pengaduan masyarakat terkait infrastruktur dan pelayanan publik di Provinsi Bali.",
    icon: "headphones",
    url: "/services#pengaduan"
  }
];
