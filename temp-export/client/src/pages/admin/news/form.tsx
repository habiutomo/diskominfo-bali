import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { News } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/admin/layout";
import { ChevronLeft, Loader2 } from "lucide-react";

// Define validation schema for news form
const newsFormSchema = z.object({
  title: z.string().min(5, { message: "Judul minimal 5 karakter" }),
  slug: z.string().min(3, { message: "Slug minimal 3 karakter" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  excerpt: z.string().min(10, { message: "Ringkasan minimal 10 karakter" }),
  content: z.string().min(20, { message: "Konten minimal 20 karakter" }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid" }).optional().nullable(),
});

type NewsFormValues = z.infer<typeof newsFormSchema>;

interface NewsFormProps {
  id?: number;
  isEdit?: boolean;
}

export default function NewsForm({ id, isEdit = false }: NewsFormProps) {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(isEdit);

  // Initialize form
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      imageUrl: "",
    },
  });

  // Categories options
  const categories = ["Berita", "Pengumuman", "Kegiatan", "Artikel"];

  // Fetch news data if in edit mode
  const { data: newsData } = useQuery({
    queryKey: ['/api/news', id],
    enabled: isEdit && !!id,
    select: (data: News[]) => data.find(item => item.id === id),
    onSuccess: (data) => {
      if (data) {
        form.reset({
          title: data.title,
          slug: data.slug,
          category: data.category,
          excerpt: data.excerpt,
          content: data.content,
          imageUrl: data.imageUrl,
        });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal memuat data berita",
        variant: "destructive",
      });
      navigate("/admin/news");
    },
  });

  // Generate slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
    form.setValue("slug", slug);
  };

  // Save news mutation
  const saveMutation = useMutation({
    mutationFn: async (data: NewsFormValues) => {
      if (isEdit && id) {
        // Simulasi update untuk development
        console.log("Updating news:", { id, ...data });
        return { id, ...data };
      } else {
        // Simulasi create untuk development
        console.log("Creating news:", data);
        return { id: Date.now(), ...data, createdAt: new Date() };
      }
    },
    onSuccess: () => {
      toast({
        title: isEdit ? "Berita diperbarui" : "Berita ditambahkan",
        description: isEdit 
          ? "Berita berhasil diperbarui" 
          : "Berita baru berhasil ditambahkan",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsFormValues) => {
    saveMutation.mutate(data);
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin/dashboard")}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Berita" : "Tambah Berita Baru"}
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
                      <FormLabel>Judul Berita</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Masukkan judul berita" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            if (!isEdit) {
                              generateSlug(e.target.value);
                            }
                          }}
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="slug-url-berita" 
                          {...field}
                          className="rounded-md" 
                          disabled={isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-md">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ringkasan</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ringkasan singkat berita" 
                          {...field}
                          className="rounded-md resize-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konten Berita</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Konten lengkap berita" 
                          {...field}
                          className="rounded-md min-h-[200px] resize-none"
                          rows={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Gambar</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field}
                          className="rounded-md" 
                          value={field.value || ""}
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
                    onClick={() => navigate("/admin/dashboard")}
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
                      isEdit ? "Perbarui Berita" : "Simpan Berita"
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