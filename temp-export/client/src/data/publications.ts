export interface Publication {
  id: number;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  date: string;
}

// This is just for UI rendering
// Actual publication data will be fetched from the API
export const publications: Publication[] = [
  {
    id: 1,
    title: "Laporan Kinerja Instansi Pemerintah (LKIP) Tahun 2022",
    description: "Laporan kinerja tahunan Diskominfos Provinsi Bali untuk tahun anggaran 2022 sesuai dengan ketentuan peraturan perundang-undangan.",
    fileType: "PDF",
    fileSize: "4.5 MB",
    downloadUrl: "/downloads/lkip-2022.pdf",
    date: "20 Juli 2023"
  },
  {
    id: 2,
    title: "Data Statistik Pemanfaatan TIK di Bali Semester I 2023",
    description: "Kumpulan data statistik tentang penggunaan teknologi informasi dan komunikasi di seluruh kabupaten/kota di Bali untuk semester pertama tahun 2023.",
    fileType: "Excel",
    fileSize: "2.1 MB",
    downloadUrl: "/downloads/statistik-tik-sem1-2023.xlsx",
    date: "15 Juli 2023"
  },
  {
    id: 3,
    title: "Rencana Strategis Diskominfos Provinsi Bali 2023-2028",
    description: "Dokumen perencanaan Diskominfos Provinsi Bali untuk periode 5 tahun yang memuat visi, misi, tujuan, sasaran, dan program kerja.",
    fileType: "DOC",
    fileSize: "1.8 MB",
    downloadUrl: "/downloads/renstra-2023-2028.doc",
    date: "10 Juli 2023"
  }
];
