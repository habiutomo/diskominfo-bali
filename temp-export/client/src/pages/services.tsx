import { Separator } from "@/components/ui/separator";
import { services } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServicesPage = () => {
  // Get icon component based on name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "server":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case "bar-chart":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case "globe":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        );
      case "headphones":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Layanan</h1>
        <Separator className="mb-6" />
        <p className="text-gray-600 mb-6">
          Dinas Komunikasi, Informatika dan Statistik Provinsi Bali menyediakan berbagai layanan untuk mendukung transformasi digital di Bali dan meningkatkan kualitas pelayanan publik.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href={`#${service.icon}`} className="text-primary hover:text-secondary font-semibold inline-flex items-center">
                  Selengkapnya 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="e-government" className="mb-10">
        <TabsList className="mb-6 space-x-2">
          <TabsTrigger value="e-government" id="e-government">E-Government</TabsTrigger>
          <TabsTrigger value="statistik" id="statistik">Data Statistik</TabsTrigger>
          <TabsTrigger value="diseminasi" id="diseminasi">Diseminasi Informasi</TabsTrigger>
          <TabsTrigger value="pengaduan" id="pengaduan">Pengaduan</TabsTrigger>
        </TabsList>

        <TabsContent value="e-government" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              {getIcon("server")}
              <h2 className="text-2xl font-bold text-primary ml-4">E-Government</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Layanan E-Government Diskominfos Provinsi Bali bertujuan untuk meningkatkan kualitas pelayanan publik dan mewujudkan tata kelola pemerintahan yang baik (good governance) melalui pemanfaatan teknologi informasi dan komunikasi.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Jenis Layanan E-Government:</h3>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">1. Pengembangan Aplikasi Pemerintahan</h4>
              <p>
                Layanan pengembangan aplikasi untuk mendukung fungsi-fungsi pemerintahan, seperti sistem manajemen keuangan, sistem manajemen kepegawaian, sistem manajemen aset, dan lain-lain.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">2. Pengembangan Aplikasi Pelayanan Publik</h4>
              <p>
                Layanan pengembangan aplikasi untuk meningkatkan kualitas pelayanan publik, seperti sistem perizinan online, sistem pengaduan masyarakat, portal informasi publik, dan lain-lain.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">3. Integrasi Sistem dan Aplikasi</h4>
              <p>
                Layanan integrasi berbagai sistem dan aplikasi untuk mendukung interoperabilitas dan pertukaran data antar instansi pemerintah.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">4. Peningkatan Kapasitas Aparatur di Bidang TIK</h4>
              <p>
                Layanan pelatihan dan bimbingan teknis untuk meningkatkan kapasitas aparatur pemerintah daerah dalam menggunakan teknologi informasi dan komunikasi.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Manfaat E-Government:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Meningkatkan efisiensi dan efektivitas pelayanan publik</li>
                <li>Meningkatkan transparansi dan akuntabilitas pemerintahan</li>
                <li>Mengurangi birokrasi dan mempercepat proses pelayanan</li>
                <li>Memudahkan akses masyarakat terhadap informasi dan layanan pemerintah</li>
                <li>Mendorong partisipasi masyarakat dalam pembangunan</li>
              </ul>
              
              <p className="mt-6">
                Untuk informasi lebih lanjut tentang layanan E-Government, silakan hubungi Bidang E-Government Diskominfos Provinsi Bali melalui email: e-gov@diskominfos.baliprov.go.id atau telepon: (0361) 234567 ext. 123.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="statistik" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              {getIcon("bar-chart")}
              <h2 className="text-2xl font-bold text-primary ml-4">Data Statistik</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Layanan Data Statistik Diskominfos Provinsi Bali bertujuan untuk menyediakan data dan informasi statistik yang akurat, komprehensif, dan terkini sebagai dasar perencanaan, pelaksanaan, pemantauan, dan evaluasi pembangunan daerah.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Jenis Layanan Data Statistik:</h3>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">1. Pengumpulan Data Statistik Sektoral</h4>
              <p>
                Layanan pengumpulan data statistik dari berbagai sektor dan OPD di lingkungan Pemerintah Provinsi Bali.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">2. Pengolahan dan Analisis Data</h4>
              <p>
                Layanan pengolahan dan analisis data statistik untuk menghasilkan informasi yang bermakna bagi pengambilan keputusan.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">3. Penyajian Data Statistik</h4>
              <p>
                Layanan penyajian data statistik dalam berbagai format, seperti tabel, grafik, infografis, dan lain-lain.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">4. Publikasi Data Statistik</h4>
              <p>
                Layanan publikasi data statistik melalui berbagai media, seperti buku, buletin, portal web, dan lain-lain.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Jenis Data Statistik yang Tersedia:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data Kependudukan</li>
                <li>Data Ketenagakerjaan</li>
                <li>Data Pendidikan</li>
                <li>Data Kesehatan</li>
                <li>Data Ekonomi</li>
                <li>Data Pariwisata</li>
                <li>Data Infrastruktur</li>
                <li>Data Lingkungan Hidup</li>
                <li>Data Sosial Budaya</li>
              </ul>
              
              <p className="mt-6">
                Untuk informasi lebih lanjut tentang layanan Data Statistik, silakan hubungi Bidang Statistik Diskominfos Provinsi Bali melalui email: statistik@diskominfos.baliprov.go.id atau telepon: (0361) 234567 ext. 456.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="diseminasi" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              {getIcon("globe")}
              <h2 className="text-2xl font-bold text-primary ml-4">Diseminasi Informasi</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Layanan Diseminasi Informasi Diskominfos Provinsi Bali bertujuan untuk menyebarluaskan informasi pemerintah kepada masyarakat melalui berbagai media dan saluran komunikasi.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Jenis Layanan Diseminasi Informasi:</h3>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">1. Media Cetak dan Elektronik</h4>
              <p>
                Layanan penyebaran informasi melalui media cetak (seperti koran, majalah, brosur) dan media elektronik (seperti radio, televisi).
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">2. Media Digital dan Sosial Media</h4>
              <p>
                Layanan penyebaran informasi melalui website, portal berita, dan platform media sosial resmi Pemerintah Provinsi Bali.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">3. Komunikasi Publik</h4>
              <p>
                Layanan komunikasi publik melalui kegiatan sosialisasi, dialog publik, seminar, workshop, dan kegiatan serupa.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">4. Produksi Konten Multimedia</h4>
              <p>
                Layanan produksi konten multimedia seperti video, animasi, infografis, dan konten digital lainnya untuk menunjang kegiatan diseminasi informasi.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Tujuan Diseminasi Informasi:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Meningkatkan pemahaman masyarakat tentang kebijakan dan program pemerintah</li>
                <li>Memberikan informasi yang akurat dan terpercaya kepada masyarakat</li>
                <li>Membangun kesadaran masyarakat terhadap isu-isu penting di daerah</li>
                <li>Menangkal berita hoaks dan informasi yang tidak benar</li>
                <li>Membangun komunikasi dua arah antara pemerintah dan masyarakat</li>
              </ul>
              
              <p className="mt-6">
                Untuk informasi lebih lanjut tentang layanan Diseminasi Informasi, silakan hubungi Bidang Informasi dan Komunikasi Publik Diskominfos Provinsi Bali melalui email: infokom@diskominfos.baliprov.go.id atau telepon: (0361) 234567 ext. 789.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pengaduan" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              {getIcon("headphones")}
              <h2 className="text-2xl font-bold text-primary ml-4">Pengaduan</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Layanan Pengaduan Diskominfos Provinsi Bali bertujuan untuk menerima dan menindaklanjuti pengaduan masyarakat terkait infrastruktur dan pelayanan publik di Provinsi Bali.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Jenis Layanan Pengaduan:</h3>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">1. Pengaduan Online</h4>
              <p>
                Layanan pengaduan melalui platform online, seperti website resmi, aplikasi mobile, dan email.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">2. Pengaduan Telepon</h4>
              <p>
                Layanan pengaduan melalui telepon/call center yang beroperasi pada jam kerja.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">3. Pengaduan Tatap Muka</h4>
              <p>
                Layanan pengaduan secara langsung di kantor Diskominfos Provinsi Bali.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">4. Monitoring dan Tindak Lanjut Pengaduan</h4>
              <p>
                Layanan monitoring status pengaduan dan tindak lanjut yang telah dilakukan.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Prosedur Pengaduan:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Masyarakat menyampaikan pengaduan melalui salah satu saluran pengaduan yang tersedia.</li>
                <li>Pengaduan akan diverifikasi dan diklasifikasikan berdasarkan jenis dan tingkat urgensinya.</li>
                <li>Pengaduan diteruskan kepada instansi terkait yang berwenang menangani masalah tersebut.</li>
                <li>Instansi terkait melakukan tindak lanjut terhadap pengaduan.</li>
                <li>Hasil tindak lanjut disampaikan kembali kepada masyarakat yang mengadu.</li>
                <li>Pengaduan ditutup jika masyarakat telah puas dengan tindak lanjut yang dilakukan.</li>
              </ol>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Kontak Layanan Pengaduan:</h3>
              <ul className="list-none pl-0 space-y-2">
                <li><strong>Website:</strong> https://pengaduan.diskominfos.baliprov.go.id</li>
                <li><strong>Email:</strong> pengaduan@diskominfos.baliprov.go.id</li>
                <li><strong>Telepon:</strong> (0361) 234567 ext. 999</li>
                <li><strong>WhatsApp:</strong> 081234567890</li>
                <li><strong>Alamat:</strong> Jl. D.I. Panjaitan No. 1, Renon, Denpasar, Bali 80235</li>
              </ul>
              
              <p className="mt-6">
                Layanan Pengaduan beroperasi pada hari Senin-Jumat, pukul 08.00-16.00 WITA. Setiap pengaduan akan ditindaklanjuti paling lambat 3 hari kerja setelah pengaduan diterima.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServicesPage;
