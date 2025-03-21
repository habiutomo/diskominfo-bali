import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Publication } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/admin/layout";
import { ChevronLeft, Loader2 } from "lucide-react";

// Define validation schema for publication form
const publicationFormSchema = z.object({
  title: z.string().min(5, { message: "Judul minimal 5 karakter" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  fileType: z.string().min(1, { message: "Tipe file harus dipilih" }),
  fileSize: z.string().min(1, { message: "Ukuran file harus diisi" }),
  downloadUrl: z.string().url({ message: "URL unduhan tidak valid" }),
});

type PublicationFormValues = z.infer<typeof publicationFormSchema>;

interface PublicationFormProps {
  id?: number;
  isEdit?: boolean;
}

export default function PublicationForm({ id, isEdit = false }: PublicationFormProps) {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(isEdit);

  // Initialize form
  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationFormSchema),
    defaultValues: {
      title: "",
      description: "",
      fileType: "",
      fileSize: "",
      downloadUrl: "",
    },
  });

  // File types options
  const fileTypes = ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "ZIP", "RAR"];

  // Fetch publication data if in edit mode
  const { data: publicationData } = useQuery<Publication[]>({
    queryKey: ['/api/publications', id],
    enabled: isEdit && !!id,
    onSuccess: (data) => {
      const publication = data.find(item => item.id === id);
      if (publication) {
        form.reset({
          title: publication.title,
          description: publication.description,
          fileType: publication.fileType,
          fileSize: publication.fileSize,
          downloadUrl: publication.downloadUrl,
        });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal memuat data publikasi",
        variant: "destructive",
      });
      navigate("/admin/publications");
    },
  });

  // Calculate file size helper
  const calculateFileSize = (size: string) => {
    const numSize = parseFloat(size);
    if (isNaN(numSize)) return "";
    
    if (numSize < 1024) {
      return `${Math.round(numSize * 100) / 100} KB`;
    } else {
      return `${Math.round(numSize / 1024 * 100) / 100} MB`;
    }
  };

  // Save publication mutation
  const saveMutation = useMutation({
    mutationFn: async (data: PublicationFormValues) => {
      if (isEdit && id) {
        // Simulasi update untuk development
        console.log("Updating publication:", { id, ...data });
        return { id, ...data };
      } else {
        // Simulasi create untuk development
        console.log("Creating publication:", data);
        return { id: Date.now(), ...data, createdAt: new Date() };
      }
    },
    onSuccess: () => {
      toast({
        title: isEdit ? "Publikasi diperbarui" : "Publikasi ditambahkan",
        description: isEdit 
          ? "Publikasi berhasil diperbarui" 
          : "Publikasi baru berhasil ditambahkan",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/publications'] });
      navigate("/admin/publications");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PublicationFormValues) => {
    saveMutation.mutate(data);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin/publications")}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Publikasi" : "Tambah Publikasi Baru"}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Publikasi</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Masukkan judul publikasi" 
                          {...field} 
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Deskripsi singkat tentang publikasi ini" 
                          {...field}
                          className="rounded-md resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fileType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe File</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-md">
                              <SelectValue placeholder="Pilih tipe file" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {fileTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fileSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ukuran File</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Contoh: 1.5 MB atau 500 KB" 
                            {...field}
                            className="rounded-md" 
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, '');
                              
                              if (value) {
                                const sizeText = calculateFileSize(value);
                                if (sizeText) {
                                  field.onChange(sizeText);
                                } else {
                                  field.onChange(value);
                                }
                              } else {
                                field.onChange('');
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="downloadUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Unduhan</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/document.pdf" 
                          {...field}
                          className="rounded-md" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/admin/publications")}
                    disabled={saveMutation.isPending}
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit"
                    disabled={saveMutation.isPending}
                  >
                    {saveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      isEdit ? "Perbarui Publikasi" : "Simpan Publikasi"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}