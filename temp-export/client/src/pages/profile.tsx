import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary mb-4">Profil Dinas</h1>
        <Separator className="mb-6" />
        <p className="text-gray-600 mb-4">
          Dinas Komunikasi, Informatika dan Statistik Provinsi Bali merupakan unsur pelaksana urusan pemerintahan bidang komunikasi dan informatika, statistik dan persandian yang menjadi kewenangan daerah provinsi.
        </p>
      </div>

      <Tabs defaultValue="sejarah" className="mb-10">
        <TabsList className="mb-6 space-x-2">
          <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
          <TabsTrigger value="visi-misi">Visi & Misi</TabsTrigger>
          <TabsTrigger value="struktur">Struktur Organisasi</TabsTrigger>
          <TabsTrigger value="tupoksi">Tupoksi</TabsTrigger>
        </TabsList>

        <TabsContent value="sejarah" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Sejarah Singkat</h2>
            <div className="prose max-w-none">
              <p>
                Dinas Komunikasi, Informatika dan Statistik Provinsi Bali terbentuk berdasarkan Peraturan Daerah Provinsi Bali Nomor 10 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah dengan menggabungkan beberapa fungsi dan urusan pemerintahan yang sebelumnya tersebar di beberapa Organisasi Perangkat Daerah.
              </p>
              <p>
                Sebelum terbentuknya Diskominfos, urusan komunikasi dan informatika diselenggarakan oleh Dinas Perhubungan Informasi dan Komunikasi Provinsi Bali, urusan statistik oleh Biro Organisasi, dan urusan persandian oleh Biro Umum Setda Provinsi Bali.
              </p>
              <p>
                Penggabungan ini merupakan bagian dari upaya Pemerintah Provinsi Bali untuk melaksanakan reformasi birokrasi dan meningkatkan efektivitas pelayanan publik di bidang komunikasi, informatika, statistik, dan persandian.
              </p>
              <p>
                Diskominfos Provinsi Bali bertanggung jawab atas penyelenggaraan e-government, diseminasi informasi, pengelolaan data statistik sektoral, dan penyelenggaraan persandian untuk pengamanan informasi di lingkungan Pemerintah Provinsi Bali.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="visi-misi" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Visi & Misi</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-2">Visi</h3>
              <p>
                "Terwujudnya Bali yang maju, damai dan sejahtera melalui tata kelola pemerintahan yang efektif, transparan dan akuntabel berbasis teknologi informasi dan komunikasi."
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Misi</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Membangun tata kelola pemerintahan yang baik dengan memanfaatkan teknologi informasi dan komunikasi.</li>
                <li>Mengembangkan dan mengelola infrastruktur TIK yang terintegrasi, andal dan aman.</li>
                <li>Meningkatkan kapasitas SDM di bidang komunikasi, informatika, statistik dan persandian.</li>
                <li>Mengembangkan dan mengelola data dan informasi yang akurat, aktual dan terpercaya.</li>
                <li>Mewujudkan masyarakat Bali yang informatif melalui diseminasi informasi yang efektif.</li>
                <li>Meningkatkan keamanan informasi pemerintah melalui penyelenggaraan persandian.</li>
              </ol>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="struktur" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Struktur Organisasi</h2>
            <div className="prose max-w-none">
              <p>Berdasarkan Peraturan Gubernur Bali Nomor 128 Tahun 2016, struktur organisasi Dinas Komunikasi, Informatika dan Statistik Provinsi Bali terdiri dari:</p>
              
              <ul className="list-disc pl-6 space-y-1">
                <li>Kepala Dinas</li>
                <li>Sekretariat, terdiri dari:
                  <ul className="list-disc pl-6">
                    <li>Sub Bagian Umum</li>
                    <li>Sub Bagian Keuangan</li>
                    <li>Sub Bagian Program</li>
                  </ul>
                </li>
                <li>Bidang Informasi dan Komunikasi Publik, terdiri dari:
                  <ul className="list-disc pl-6">
                    <li>Seksi Pengelolaan Informasi Publik</li>
                    <li>Seksi Komunikasi Publik</li>
                    <li>Seksi Kemitraan Komunikasi Publik</li>
                  </ul>
                </li>
                <li>Bidang Teknologi Informasi dan Komunikasi, terdiri dari:
                  <ul className="list-disc pl-6">
                    <li>Seksi Infrastruktur dan Teknologi</li>
                    <li>Seksi Pengembangan Aplikasi</li>
                    <li>Seksi Keamanan Informasi dan Persandian</li>
                  </ul>
                </li>
                <li>Bidang E-Government, terdiri dari:
                  <ul className="list-disc pl-6">
                    <li>Seksi Tata Kelola E-Government</li>
                    <li>Seksi Pengembangan Ekosistem E-Government</li>
                    <li>Seksi Integrasi Sistem dan Aplikasi</li>
                  </ul>
                </li>
                <li>Bidang Statistik, terdiri dari:
                  <ul className="list-disc pl-6">
                    <li>Seksi Pendataan</li>
                    <li>Seksi Pengolahan dan Analisis Data</li>
                    <li>Seksi Diseminasi Data dan Layanan Statistik</li>
                  </ul>
                </li>
                <li>Unit Pelaksana Teknis Dinas (UPTD)</li>
                <li>Kelompok Jabatan Fungsional</li>
              </ul>
              
              <div className="my-6 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="700"
                  height="400"
                  viewBox="0 0 700 400"
                  className="border border-gray-200 rounded-md p-4"
                >
                  <rect x="250" y="10" width="200" height="50" rx="5" fill="#046CB4" />
                  <text x="350" y="40" textAnchor="middle" fill="white" fontWeight="bold">Kepala Dinas</text>
                  
                  <line x1="350" y1="60" x2="350" y2="80" stroke="#333" strokeWidth="2" />
                  
                  <rect x="250" y="80" width="200" height="50" rx="5" fill="#046CB4" opacity="0.9" />
                  <text x="350" y="110" textAnchor="middle" fill="white" fontWeight="bold">Sekretariat</text>
                  
                  <line x1="350" y1="130" x2="350" y2="150" stroke="#333" strokeWidth="2" />
                  <line x1="150" y1="150" x2="550" y2="150" stroke="#333" strokeWidth="2" />
                  
                  <line x1="150" y1="150" x2="150" y2="170" stroke="#333" strokeWidth="2" />
                  <line x1="250" y1="150" x2="250" y2="170" stroke="#333" strokeWidth="2" />
                  <line x1="350" y1="150" x2="350" y2="170" stroke="#333" strokeWidth="2" />
                  <line x1="450" y1="150" x2="450" y2="170" stroke="#333" strokeWidth="2" />
                  <line x1="550" y1="150" x2="550" y2="170" stroke="#333" strokeWidth="2" />
                  
                  <rect x="75" y="170" width="150" height="50" rx="5" fill="#046CB4" opacity="0.8" />
                  <text x="150" y="195" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Bidang Informasi dan</text>
                  <text x="150" y="210" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Komunikasi Publik</text>
                  
                  <rect x="175" y="170" width="150" height="50" rx="5" fill="#046CB4" opacity="0.8" />
                  <text x="250" y="195" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Bidang Teknologi</text>
                  <text x="250" y="210" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Informasi dan Komunikasi</text>
                  
                  <rect x="275" y="170" width="150" height="50" rx="5" fill="#046CB4" opacity="0.8" />
                  <text x="350" y="195" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Bidang</text>
                  <text x="350" y="210" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">E-Government</text>
                  
                  <rect x="375" y="170" width="150" height="50" rx="5" fill="#046CB4" opacity="0.8" />
                  <text x="450" y="195" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Bidang</text>
                  <text x="450" y="210" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Statistik</text>
                  
                  <rect x="475" y="170" width="150" height="50" rx="5" fill="#046CB4" opacity="0.8" />
                  <text x="550" y="195" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Unit Pelaksana</text>
                  <text x="550" y="210" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">Teknis Dinas</text>
                </svg>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tupoksi" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Tugas Pokok dan Fungsi</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-2">Tugas Pokok</h3>
              <p>
                Dinas Komunikasi, Informatika dan Statistik mempunyai tugas membantu Gubernur melaksanakan urusan pemerintahan di bidang komunikasi dan informatika, statistik dan persandian yang menjadi kewenangan daerah, serta melaksanakan tugas dekonsentrasi.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Fungsi</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Perumusan kebijakan teknis di bidang komunikasi dan informatika, statistik dan persandian;</li>
                <li>Pelaksanaan kebijakan di bidang komunikasi dan informatika, statistik dan persandian;</li>
                <li>Penyelenggaraan administrasi dinas di bidang komunikasi dan informatika, statistik dan persandian;</li>
                <li>Penyelenggaraan evaluasi dan pelaporan dinas;</li>
                <li>Penyelenggaraan fungsi lain yang diberikan oleh Gubernur terkait dengan tugas dan fungsinya.</li>
              </ol>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Rincian Tugas Masing-Masing Bidang</h3>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">Bidang Informasi dan Komunikasi Publik</h4>
              <p>
                Melaksanakan pengelolaan opini publik, pengelolaan informasi publik, penyediaan konten lintas sektoral, penguatan kapasitas sumber daya komunikasi publik serta pelayanan informasi publik.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">Bidang Teknologi Informasi dan Komunikasi</h4>
              <p>
                Melaksanakan layanan infrastruktur dasar data center, disaster recovery center, dan TIK, layanan pengembangan intranet dan penggunaan akses internet, layanan keamanan informasi, layanan sistem komunikasi intra pemerintah daerah.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">Bidang E-Government</h4>
              <p>
                Melaksanakan layanan manajemen e-government, pengembangan aplikasi, integrasi layanan publik dan kepemerintahan, tata kelola e-government, serta pengelolaan dan pengembangan ekosistem e-government.
              </p>
              
              <h4 className="text-lg font-semibold mt-4 mb-2">Bidang Statistik</h4>
              <p>
                Melaksanakan pengumpulan, pengolahan, analisa, dan penyajian data dan statistik sektoral, serta koordinasi dan sinkronisasi pengumpulan, pengolahan, analisa, dan penyajian data dan statistik sektoral.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
