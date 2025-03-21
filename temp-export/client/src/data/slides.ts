export interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Transformasi Digital Daerah Provinsi Bali",
    description: "Menuju tata kelola pemerintahan yang efektif, efisien, dan transparan melalui pemanfaatan teknologi informasi dan komunikasi",
    imageUrl: "https://images.unsplash.com/photo-1604665378879-569891a662f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    buttonText: "Selengkapnya",
    buttonLink: "/services"
  },
  {
    id: 2,
    title: "Pelayanan Publik Berbasis Digital",
    description: "Memudahkan akses masyarakat terhadap layanan pemerintah melalui inovasi teknologi",
    imageUrl: "https://images.unsplash.com/photo-1599640694376-7dbc3271c053?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    buttonText: "Selengkapnya",
    buttonLink: "/services"
  },
  {
    id: 3,
    title: "Bali Smart Island",
    description: "Mewujudkan ekosistem digital terintegrasi untuk mendukung pariwisata dan kesejahteraan masyarakat Bali",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    buttonText: "Selengkapnya",
    buttonLink: "/services"
  }
];
