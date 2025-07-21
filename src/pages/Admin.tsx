import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Palette, Settings, Database, FileText, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminProvider } from '@/contexts/AdminContext';
import ColorSettings from '@/components/admin/ColorSettings';
import EventsManagement from '@/components/admin/EventsManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';
import GeneralSettings from '@/components/admin/GeneralSettings';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === 'admin123') {
      onLogin();
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
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {

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
            <Button variant="outline" onClick={onLogout}>
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
              <ColorSettings />
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <EventsManagement />
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <CategoriesManagement />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <GeneralSettings />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AdminProvider>
      {isAuthenticated ? (
        <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <AdminLogin onLogin={() => setIsAuthenticated(true)} />
      )}
    </AdminProvider>
  );
};

export default Admin;