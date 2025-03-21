import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Publication } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/lib/date-utils";
import { FilePlus, Download, Pencil, Trash2, Search, Loader2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PublicationsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const queryClient = useQueryClient();

  // Fetch publications data
  const { data: publications = [], isLoading } = useQuery<Publication[]>({
    queryKey: ['/api/publications'],
  });

  // Delete publication mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // Simulasi delete untuk development
      console.log("Deleting publication:", id);
      return id;
    },
    onSuccess: () => {
      toast({
        title: "Publikasi dihapus",
        description: "Publikasi berhasil dihapus",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/publications'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus publikasi",
        variant: "destructive",
      });
    },
  });

  // Handle edit button click
  const handleEditClick = (item: Publication) => {
    navigate(`/admin/publications/edit/${item.id}`);
  };

  // Handle delete button click
  const handleDeleteClick = (item: Publication) => {
    deleteMutation.mutate(item.id);
  };

  // Get file type badge
  const getFileTypeBadge = (fileType: string) => {
    const fileTypeColor = {
      "PDF": "bg-red-100 text-red-800",
      "DOC": "bg-blue-100 text-blue-800",
      "DOCX": "bg-blue-100 text-blue-800",
      "XLS": "bg-green-100 text-green-800",
      "XLSX": "bg-green-100 text-green-800",
      "PPT": "bg-orange-100 text-orange-800",
      "PPTX": "bg-orange-100 text-orange-800",
    }[fileType.toUpperCase()] || "bg-gray-100 text-gray-800";

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${fileTypeColor}`}>
        {fileType.toUpperCase()}
      </span>
    );
  };

  // Filter publications by search term
  const filteredPublications = publications.filter((item: Publication) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Daftar Publikasi</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Cari publikasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-md w-full"
            />
          </div>
          
          <Button onClick={() => navigate("/admin/publications/add")} className="whitespace-nowrap">
            <FilePlus className="h-4 w-4 mr-2" />
            Tambah Publikasi
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredPublications.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">
            {searchTerm ? "Tidak ada publikasi yang sesuai dengan pencarian" : "Belum ada publikasi"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead className="w-[100px]">Tipe</TableHead>
                  <TableHead className="w-[100px]">Ukuran</TableHead>
                  <TableHead className="w-[120px]">Tanggal</TableHead>
                  <TableHead className="w-[150px] text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((item: Publication, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {item.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getFileTypeBadge(item.fileType)}
                    </TableCell>
                    <TableCell>{item.fileSize}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(item.downloadUrl, '_blank')}
                          title="Unduh"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(item)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              title="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus publikasi "{item.title}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteClick(item)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deleteMutation.isPending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menghapus...
                                  </>
                                ) : (
                                  "Hapus"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}