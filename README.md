# Website & CMS Diskominfos Provinsi Bali

Proyek ini adalah website informasi pemerintah yang terinspirasi dari situs Dinas Komunikasi, Informatika dan Statistik Provinsi Bali. Website ini menyediakan informasi departemen, berita, layanan, dan publikasi pemerintah dengan antarmuka admin (CMS) untuk mengelola konten.

![Tampilan Website](2.png)
![Tampilan Website](3.png)
![Tampilan Website](4.png)
![Tampilan Website](1.png)

## Fitur

### Website Publik
- **Tampilan Modern & Responsif**: Website dirancang dengan tampilan yang menarik dan responsif untuk berbagai perangkat dengan efek visual modern.
- **Hero Slider**: Menampilkan informasi penting dengan animasi dan efek visual menarik, termasuk efek parallax dan transisi.
- **Layanan Utama**: Menampilkan berbagai layanan yang disediakan oleh Diskominfos dalam tata letak yang rapi dengan hover effect.
- **Berita & Pengumuman**: Bagian berita menampilkan artikel terbaru dengan kategori dan fitur pencarian.
- **Publikasi & Dokumen**: Akses mudah untuk dokumen, laporan, dan publikasi resmi dengan tampilan card yang interaktif.
- **Tautan Penting**: Akses cepat ke situs-situs pemerintah terkait dalam layout yang eye-catching.
- **Form Kontak**: Form kontak interaktif dengan validasi dan feedback visual untuk pengguna.

### Content Management System (CMS)
- **Autentikasi**: Sistem login aman untuk administrator.
- **Dashboard Admin**: Tampilan ringkasan statistik dan aktivitas terbaru.
- **Manajemen Berita**: Interface untuk menambah, mengedit, dan menghapus berita.
- **Manajemen Publikasi**: Pengelolaan dokumen dan publikasi resmi.
- **Form Submission**: Monitoring pesan dari form kontak publik.

## Teknologi

Proyek ini dibangun menggunakan:

- **React**: Library JavaScript untuk pengembangan antarmuka pengguna.
- **TypeScript**: Superset JavaScript dengan pengetikan statis.
- **Tailwind CSS**: Framework CSS untuk styling cepat dan responsif.
- **shadcn/ui**: Komponen UI yang dapat digunakan kembali dengan tema yang dapat disesuaikan.
- **Express.js**: Framework server-side untuk backend.
- **Drizzle ORM**: ORM untuk interaksi database dengan validasi.
- **React Query**: Library untuk mengelola state dan fetching data dengan optimized request.
- **wouter**: Library routing ringan untuk React.
- **date-fns**: Manipulasi dan format tanggal.

## Struktur Proyek

```
.
├── client/                  # Kode frontend
│   ├── src/
│   │   ├── components/      # Komponen UI
│   │   │   ├── ui/          # Komponen UI dasar (shadcn)
│   │   │   ├── layout/      # Komponen layout (header, footer)
│   │   │   ├── home/        # Komponen untuk halaman utama
│   │   │   └── admin/       # Komponen untuk area admin
│   │   │
│   │   ├── data/            # Data statis
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilitas
│   │   ├── pages/           # Halaman publik
│   │   │   └── admin/       # Halaman admin
│   │   │       ├── news/    # Pengelolaan berita
│   │   │       └── publications/ # Pengelolaan publikasi
│   │   │
│   │   ├── index.css        # Styling global
│   │   ├── main.tsx         # Entry point aplikasi
│   │   └── App.tsx          # Komponen utama dan router
│
├── server/                  # Kode backend
│   ├── index.ts             # Entry point server
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Logika penyimpanan data
│   └── vite.ts              # Konfigurasi Vite untuk server
│
└── shared/                  # Kode bersama frontend & backend
    └── schema.ts            # Schema database & validasi
```

## Fitur Detail

### Website Publik
#### Halaman Utama
- Hero slider dengan informasi penting dan efek parallax
- Bagian layanan dengan kartu interaktif dan hover effect
- Berita terbaru dan artikel unggulan dengan tampilan timeline
- Publikasi dan dokumen resmi dengan tampilan card
- Tautan penting ke situs terkait dalam grid layout menarik
- Bagian kontak dengan form interaktif

#### Halaman Berita
- Daftar berita terbaru dengan thumbnail dan ringkasan
- Filter berdasarkan kategori (Pengumuman, Kegiatan, Program)
- Halaman detail berita dengan format artikel lengkap

#### Halaman Publikasi
- Daftar publikasi dan dokumen dengan kategori
- Informasi tipe file, ukuran, dan tanggal rilis
- Unduhan dokumen dengan tombol download

#### Halaman Kontak
- Form kontak dengan validasi real-time
- Feedback visual untuk input yang valid/invalid
- Informasi kontak dan lokasi instansi

### Content Management System (CMS)
#### Login Admin
- Form login dengan autentikasi dan validasi
- Keamanan dengan session management

#### Dashboard Admin
- Ringkasan statistik (jumlah berita, publikasi, kontak)
- Aktivitas terbaru dan quick links ke area pengelolaan

#### Pengelolaan Berita
- Daftar berita dengan filter dan pencarian
- Form penambahan berita dengan editor konten lengkap
- Edit dan hapus berita yang ada

#### Pengelolaan Publikasi
- Manajemen dokumen dan publikasi
- Form penambahan publikasi dengan upload file
- Edit dan hapus publikasi yang ada

## Menjalankan Aplikasi

1. Clone repositori
2. Install dependensi dengan menjalankan `npm install`
3. Jalankan aplikasi dengan `npm run dev`
4. Akses halaman utama website melalui `http://localhost:5000`
5. Akses halaman admin (CMS) melalui `http://localhost:5000/admin/login`
   - Username: `admin`
   - Password: `password`

## Fitur API

API endpoints yang tersedia:

- **GET /api/news** - Mendapatkan semua berita
- **GET /api/news/category/:category** - Mendapatkan berita berdasarkan kategori
- **GET /api/news/:slug** - Mendapatkan detail berita berdasarkan slug
- **GET /api/publications** - Mendapatkan semua publikasi
- **GET /api/publications/:id** - Mendapatkan detail publikasi berdasarkan ID
- **POST /api/contact** - Mengirimkan pesan melalui form kontak

## Paket dan File Distribusi

Proyek ini dibundel dalam beberapa file zip untuk memudahkan distribusi:

- **diskominfos-bali-website.zip** - Paket lengkap website termasuk frontend dan backend
- **diskominfos-bali-cms.zip** - Paket khusus untuk CMS (Content Management System)
- **client-files.zip** - Hanya kode frontend
- **server-files.zip** - Hanya kode backend
- **shared-files.zip** - Kode yang digunakan bersama frontend dan backend

## Rencana Pengembangan

- Implementasi sistem pencarian dengan fitur filter lanjutan
- Integrasi dengan database eksternal (PostgreSQL, MySQL) untuk penyimpanan data
- Pengembangan fitur pengelolaan pengguna dengan berbagai level akses
- Integrasi dengan layanan penyimpanan file cloud untuk upload dokumen
- Optimasi performa dan aksesibilitas
- Dukungan multi-bahasa (Indonesia dan Inggris)
- Analitik dan laporan trafik pengunjung website

---

© 2025 Website & CMS Diskominfos Provinsi Bali. Dikembangkan untuk tujuan pendidikan dan demonstrasi.