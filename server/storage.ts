import { 
  type User, 
  type InsertUser, 
  type ContactSubmission,
  type InsertContact, 
  type News,
  type InsertNews,
  type Publication,
  type InsertPublication
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form submission methods
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  getNewsByCategory(category: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  
  // Publications methods
  getPublications(): Promise<Publication[]>;
  getPublication(id: number): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsItems: Map<number, News>;
  private publicationItems: Map<number, Publication>;
  
  private currentUserId: number;
  private currentContactId: number;
  private currentNewsId: number;
  private currentPublicationId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.newsItems = new Map();
    this.publicationItems = new Map();
    
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentNewsId = 1;
    this.currentPublicationId = 1;
    
    // Initialize with some data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form submission methods
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const createdAt = new Date();
    const submission: ContactSubmission = { ...contact, id, createdAt };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.newsItems.values()).find(
      (news) => news.slug === slug,
    );
  }
  
  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .filter((news) => news.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createNews(news: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const createdAt = new Date();
    const newsItem: News = { ...news, id, createdAt };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }
  
  // Publications methods
  async getPublications(): Promise<Publication[]> {
    return Array.from(this.publicationItems.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getPublication(id: number): Promise<Publication | undefined> {
    return this.publicationItems.get(id);
  }
  
  async createPublication(publication: InsertPublication): Promise<Publication> {
    const id = this.currentPublicationId++;
    const createdAt = new Date();
    const publicationItem: Publication = { ...publication, id, createdAt };
    this.publicationItems.set(id, publicationItem);
    return publicationItem;
  }
  
  // Initialize with sample data
  private initializeSampleData() {
    // Add initial news items
    const newsData: InsertNews[] = [
      {
        title: "Rapat Koordinasi Percepatan Transformasi Digital di Provinsi Bali",
        slug: "rapat-koordinasi-percepatan-transformasi-digital",
        content: `<p>Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyelenggarakan rapat koordinasi untuk membahas strategi percepatan transformasi digital di seluruh kabupaten/kota di Bali. Rapat ini dihadiri oleh Kepala Diskominfos kabupaten/kota se-Bali, serta perwakilan dari Kementerian Komunikasi dan Informatika RI.</p>
        <p>Dalam rapat tersebut dibahas mengenai pentingnya sinkronisasi program-program digitalisasi di tingkat provinsi dan kabupaten/kota, serta perlunya penguatan infrastruktur TIK yang merata di seluruh wilayah Bali.</p>
        <p>"Transformasi digital harus menjadi gerakan bersama, dan kita perlu memastikan tidak ada kesenjangan digital antar wilayah di Bali," ujar Kepala Diskominfos Provinsi Bali dalam sambutannya.</p>
        <p>Rapat ini menghasilkan beberapa kesepakatan penting, di antaranya pembentukan tim percepatan transformasi digital tingkat provinsi, rencana pengembangan data center bersama, serta program peningkatan kapasitas aparatur dalam bidang TIK.</p>`,
        excerpt: "Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyelenggarakan rapat koordinasi untuk membahas strategi percepatan transformasi digital di seluruh kabupaten/kota di Bali.",
        category: "Kegiatan",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Sosialisasi Aplikasi SAKTI Untuk Perangkat Daerah",
        slug: "sosialisasi-aplikasi-sakti",
        content: `<p>Diskominfos Provinsi Bali akan menyelenggarakan sosialisasi Aplikasi SAKTI untuk seluruh perangkat daerah pada tanggal 10 Agustus 2023. Kegiatan ini bertujuan untuk memperkenalkan dan memberikan pemahaman kepada seluruh OPD mengenai penggunaan Aplikasi SAKTI (Sistem Aplikasi Keuangan Tingkat Instansi) yang merupakan aplikasi terintegrasi untuk pengelolaan keuangan instansi pemerintah.</p>
        <p>Sosialisasi akan dilaksanakan di Ruang Rapat Utama Kantor Gubernur Bali dan akan diikuti oleh perwakilan dari seluruh OPD di lingkungan Pemerintah Provinsi Bali. Narasumber yang akan memberikan materi adalah tim dari Kementerian Keuangan RI dan tim Diskominfos Provinsi Bali.</p>
        <p>"Aplikasi SAKTI ini sangat penting untuk meningkatkan efisiensi, transparansi, dan akuntabilitas dalam pengelolaan keuangan di setiap instansi pemerintah," kata Kabid e-Government Diskominfos Provinsi Bali.</p>
        <p>Para peserta diharapkan membawa laptop dan data-data yang diperlukan untuk praktik langsung penggunaan aplikasi. Informasi lebih lanjut dapat menghubungi Bidang e-Government Diskominfos Provinsi Bali.</p>`,
        excerpt: "Diskominfos Provinsi Bali akan menyelenggarakan sosialisasi Aplikasi SAKTI untuk seluruh perangkat daerah pada tanggal 10 Agustus 2023.",
        category: "Pengumuman",
        imageUrl: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Kunjungan Kerja Kominfo RI ke Diskominfos Bali",
        slug: "kunjungan-kerja-kominfo-ri",
        content: `<p>Kementerian Komunikasi dan Informatika RI melakukan kunjungan kerja ke Diskominfos Provinsi Bali untuk membahas sinkronisasi program nasional dan daerah. Kunjungan ini dipimpin langsung oleh Direktur Jenderal Aplikasi Informatika Kementerian Kominfo RI beserta jajarannya.</p>
        <p>Dalam kunjungan tersebut, dibahas berbagai program strategis nasional di bidang TIK yang perlu disinkronisasikan dengan program-program di tingkat daerah, termasuk Provinsi Bali. Di antaranya adalah program Satu Data Indonesia, Palapa Ring, dan Smart City.</p>
        <p>Kepala Diskominfos Provinsi Bali menyampaikan bahwa Pemerintah Provinsi Bali telah berupaya untuk menyelaraskan program-program digitalnya dengan kebijakan nasional. "Kami telah mengembangkan roadmap transformasi digital Bali yang sejalan dengan arahan pemerintah pusat," ujarnya.</p>
        <p>Dirjen Aptika Kementerian Kominfo mengapresiasi upaya yang telah dilakukan Pemprov Bali dalam mengimplementasikan program-program digital. "Bali bisa menjadi percontohan implementasi Smart Province yang mendukung pariwisata dan ekonomi kreatif," kata Dirjen dalam sambutannya.</p>
        <p>Kunjungan kerja ini juga meliputi peninjauan Data Center Provinsi Bali dan beberapa proyek TIK unggulan yang telah dikembangkan oleh Diskominfos Provinsi Bali.</p>`,
        excerpt: "Kementerian Komunikasi dan Informatika RI melakukan kunjungan kerja ke Diskominfos Provinsi Bali untuk membahas sinkronisasi program nasional dan daerah.",
        category: "Berita",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Jadwal Pemeliharaan Server Data Center Provinsi Bali",
        slug: "jadwal-pemeliharaan-server",
        content: `<p>Diskominfos Provinsi Bali akan melakukan pemeliharaan server data center pada tanggal 5-7 Agustus 2023. Beberapa layanan mungkin akan mengalami gangguan selama periode pemeliharaan. Kegiatan pemeliharaan ini merupakan bagian dari upaya meningkatkan keandalan dan keamanan infrastruktur TIK Pemerintah Provinsi Bali.</p>
        <p>Berikut adalah jadwal dan layanan yang akan terpengaruh:</p>
        <ul>
          <li>5 Agustus 2023 (20.00-24.00 WITA): Pemeliharaan server aplikasi dan basis data. Layanan yang terpengaruh meliputi e-Office, SIPD, dan JDIH.</li>
          <li>6 Agustus 2023 (20.00-24.00 WITA): Pemeliharaan server web dan email. Layanan yang terpengaruh meliputi website OPD dan layanan email resmi pemerintah provinsi.</li>
          <li>7 Agustus 2023 (20.00-24.00 WITA): Pemeliharaan infrastruktur jaringan. Semua layanan online mungkin akan terpengaruh.</li>
        </ul>
        <p>Diskominfos Provinsi Bali memohon maaf atas ketidaknyamanan yang mungkin ditimbulkan. Pemeliharaan ini dilakukan untuk memastikan layanan yang lebih baik dan lebih andal di masa mendatang.</p>
        <p>Untuk informasi lebih lanjut, silakan hubungi Bidang Infrastruktur TIK Diskominfos Provinsi Bali di nomor telepon (0361) 234567 ext. 123.</p>`,
        excerpt: "Diskominfos Provinsi Bali akan melakukan pemeliharaan server data center pada tanggal 5-7 Agustus 2023. Beberapa layanan mungkin akan mengalami gangguan.",
        category: "Informasi",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];
    
    newsData.forEach(newsItem => {
      const id = this.currentNewsId++;
      const createdAt = new Date();
      this.newsItems.set(id, { ...newsItem, id, createdAt });
    });
    
    // Add initial publications
    const publicationData: InsertPublication[] = [
      {
        title: "Laporan Kinerja Instansi Pemerintah (LKIP) Tahun 2022",
        description: "Laporan kinerja tahunan Diskominfos Provinsi Bali untuk tahun anggaran 2022 sesuai dengan ketentuan peraturan perundang-undangan.",
        fileType: "PDF",
        fileSize: "4.5 MB",
        downloadUrl: "/downloads/lkip-2022.pdf"
      },
      {
        title: "Data Statistik Pemanfaatan TIK di Bali Semester I 2023",
        description: "Kumpulan data statistik tentang penggunaan teknologi informasi dan komunikasi di seluruh kabupaten/kota di Bali untuk semester pertama tahun 2023.",
        fileType: "Excel",
        fileSize: "2.1 MB",
        downloadUrl: "/downloads/statistik-tik-sem1-2023.xlsx"
      },
      {
        title: "Rencana Strategis Diskominfos Provinsi Bali 2023-2028",
        description: "Dokumen perencanaan Diskominfos Provinsi Bali untuk periode 5 tahun yang memuat visi, misi, tujuan, sasaran, dan program kerja.",
        fileType: "DOC",
        fileSize: "1.8 MB",
        downloadUrl: "/downloads/renstra-2023-2028.doc"
      }
    ];
    
    publicationData.forEach(publicationItem => {
      const id = this.currentPublicationId++;
      const createdAt = new Date();
      this.publicationItems.set(id, { ...publicationItem, id, createdAt });
    });
  }
}

export const storage = new MemStorage();
