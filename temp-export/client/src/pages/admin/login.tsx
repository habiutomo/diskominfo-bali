import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";

// Skema validasi login
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username harus diisi" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  
  // State untuk track loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Inisialisasi form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Mutation untuk login
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      setIsLoading(true);
      
      // Simulasi proses login
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          // Kredensial admin (untuk demo saja)
          if (data.username === "admin" && data.password === "admin123") {
            resolve(true);
          } else {
            resolve(false);
          }
          setIsLoading(false);
        }, 1000);
      });
    },
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Login berhasil",
          description: "Selamat datang di panel admin",
        });
        
        // Simpan session ke localStorage (demo saja)
        localStorage.setItem("admin_logged_in", "true");
        
        // Redirect ke dashboard
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login gagal",
          description: "Username atau password salah",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Login gagal",
        description: "Terjadi kesalahan saat mencoba login",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white p-3 rounded-full">
                <LogIn className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Masuk ke panel admin untuk mengelola konten website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Masukkan username Anda"
                          {...field} 
                          disabled={isLoading}
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Masukkan password Anda"
                          {...field} 
                          disabled={isLoading}
                          className="rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sedang Login...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                
                {/* Keterangan login untuk demo */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md text-sm text-yellow-700">
                  <p className="font-medium">Demo Login:</p>
                  <p>Username: admin</p>
                  <p>Password: admin123</p>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"}
              disabled={isLoading}
            >
              Kembali ke Website
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Bagian ilustrasi login */}
      <div className="hidden lg:block lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-3xl font-bold mb-6">Diskominfos Bali</h1>
          <p className="text-xl max-w-md text-center mb-8">
            Panel admin untuk mengelola konten website resmi Dinas Komunikasi dan Informatika Provinsi Bali
          </p>
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-md">
            <p className="text-sm">
              "Mewujudkan Bali yang Maju, Aman, dan Sejahtera melalui tata kelola pemerintahan yang baik dengan dukungan teknologi informasi dan komunikasi."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}