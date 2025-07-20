import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Palette, Settings, Database, FileText, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lightBgColor, setLightBgColor] = useState('#fcfaf8');
  const [darkBgColor, setDarkBgColor] = useState('#1a1511');
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di Panel Admin",
      });
    } else {
      toast({
        title: "Login Gagal",
        description: "Password tidak valid",
        variant: "destructive",
      });
    }
  };

  const handleColorUpdate = () => {
    // Convert hex to HSL and update CSS variables
    const lightHsl = hexToHsl(lightBgColor);
    const darkHsl = hexToHsl(darkBgColor);
    
    document.documentElement.style.setProperty('--background', lightHsl);
    document.documentElement.style.setProperty('--dark-background', darkHsl);
    
    toast({
      title: "Warna Background Diperbarui",
      description: "Perubahan telah diterapkan ke website",
    });
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Panel Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password Admin</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo: gunakan password "admin123"
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
              <p className="text-muted-foreground">Kelola konten dan pengaturan website</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="colors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Warna
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Peristiwa
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Kategori
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Pengaturan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Pengaturan Warna Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="light-bg">Background Light Mode</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-border"
                          style={{ backgroundColor: lightBgColor }}
                        />
                        <Input
                          id="light-bg"
                          type="color"
                          value={lightBgColor}
                          onChange={(e) => setLightBgColor(e.target.value)}
                          className="w-20 h-12 p-1"
                        />
                        <Input
                          value={lightBgColor}
                          onChange={(e) => setLightBgColor(e.target.value)}
                          placeholder="#fcfaf8"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="dark-bg">Background Dark Mode</Label>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-border"
                          style={{ backgroundColor: darkBgColor }}
                        />
                        <Input
                          id="dark-bg"
                          type="color"
                          value={darkBgColor}
                          onChange={(e) => setDarkBgColor(e.target.value)}
                          className="w-20 h-12 p-1"
                        />
                        <Input
                          value={darkBgColor}
                          onChange={(e) => setDarkBgColor(e.target.value)}
                          placeholder="#1a1511"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleColorUpdate} className="flex-1">
                      Terapkan Perubahan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLightBgColor('#fcfaf8');
                        setDarkBgColor('#1a1511');
                      }}
                    >
                      Reset Default
                    </Button>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Preview:</strong> Perubahan warna akan langsung diterapkan ke website. 
                      Gunakan hex color code atau color picker untuk memilih warna yang diinginkan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kelola Peristiwa Sejarah</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fitur pengelolaan peristiwa akan segera tersedia.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kelola Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fitur pengelolaan kategori akan segera tersedia.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Umum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Pengaturan umum website akan segera tersedia.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;