export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
}

// This is just for UI rendering
// Actual news data will be fetched from the API
export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Rapat Koordinasi Percepatan Transformasi Digital di Provinsi Bali",
    slug: "rapat-koordinasi-percepatan-transformasi-digital",
    excerpt: "Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyelenggarakan rapat koordinasi untuk membahas strategi percepatan transformasi digital di seluruh kabupaten/kota di Bali.",
    content: "Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyelenggarakan rapat koordinasi untuk membahas strategi percepatan transformasi digital di seluruh kabupaten/kota di Bali. Rapat ini dihadiri oleh Kepala Diskominfos kabupaten/kota se-Bali, serta perwakilan dari Kementerian Komunikasi dan Informatika RI...",
    category: "Kegiatan",
    date: "28 Juli 2023",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Sosialisasi Aplikasi SAKTI Untuk Perangkat Daerah",
    slug: "sosialisasi-aplikasi-sakti",
    excerpt: "Diskominfos Provinsi Bali akan menyelenggarakan sosialisasi Aplikasi SAKTI untuk seluruh perangkat daerah pada tanggal 10 Agustus 2023.",
    content: "Diskominfos Provinsi Bali akan menyelenggarakan sosialisasi Aplikasi SAKTI untuk seluruh perangkat daerah pada tanggal 10 Agustus 2023. Kegiatan ini bertujuan untuk memperkenalkan dan memberikan pemahaman kepada seluruh OPD mengenai penggunaan Aplikasi SAKTI (Sistem Aplikasi Keuangan Tingkat Instansi) yang merupakan aplikasi terintegrasi untuk pengelolaan keuangan instansi pemerintah...",
    category: "Pengumuman",
    date: "26 Juli 2023",
    imageUrl: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Kunjungan Kerja Kominfo RI ke Diskominfos Bali",
    slug: "kunjungan-kerja-kominfo-ri",
    excerpt: "Kementerian Komunikasi dan Informatika RI melakukan kunjungan kerja ke Diskominfos Provinsi Bali untuk membahas sinkronisasi program nasional dan daerah.",
    content: "Kementerian Komunikasi dan Informatika RI melakukan kunjungan kerja ke Diskominfos Provinsi Bali untuk membahas sinkronisasi program nasional dan daerah. Kunjungan ini dipimpin langsung oleh Direktur Jenderal Aplikasi Informatika Kementerian Kominfo RI beserta jajarannya...",
    category: "Berita",
    date: "25 Juli 2023",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Jadwal Pemeliharaan Server Data Center Provinsi Bali",
    slug: "jadwal-pemeliharaan-server",
    excerpt: "Diskominfos Provinsi Bali akan melakukan pemeliharaan server data center pada tanggal 5-7 Agustus 2023. Beberapa layanan mungkin akan mengalami gangguan.",
    content: "Diskominfos Provinsi Bali akan melakukan pemeliharaan server data center pada tanggal 5-7 Agustus 2023. Beberapa layanan mungkin akan mengalami gangguan selama periode pemeliharaan. Kegiatan pemeliharaan ini merupakan bagian dari upaya meningkatkan keandalan dan keamanan infrastruktur TIK Pemerintah Provinsi Bali...",
    category: "Informasi",
    date: "22 Juli 2023",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
