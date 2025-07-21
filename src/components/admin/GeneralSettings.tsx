import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GeneralSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteTitle: 'Sejarah Islam',
    siteDescription: 'Jelajahi perjalanan peradaban Islam dari masa ke masa',
    enableNotifications: true,
    enableSearch: true,
    enableDarkMode: true,
    adminEmail: 'admin@sejarahislam.com',
    maintenanceMode: false,
    welcomeMessage: 'Selamat datang di portal sejarah Islam',
    footerText: '© 2024 Sejarah Islam. Semua hak dilindungi.',
  });

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('admin-general-settings', JSON.stringify(settings));
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan umum berhasil disimpan",
    });
  };

  const handleReset = () => {
    setSettings({
      siteTitle: 'Sejarah Islam',
      siteDescription: 'Jelajahi perjalanan peradaban Islam dari masa ke masa',
      enableNotifications: true,
      enableSearch: true,
      enableDarkMode: true,
      adminEmail: 'admin@sejarahislam.com',
      maintenanceMode: false,
      welcomeMessage: 'Selamat datang di portal sejarah Islam',
      footerText: '© 2024 Sejarah Islam. Semua hak dilindungi.',
    });
    localStorage.removeItem('admin-general-settings');
    toast({
      title: "Pengaturan Direset",
      description: "Pengaturan dikembalikan ke default",
    });
  };

  // Load settings from localStorage on component mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('admin-general-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Pengaturan Umum Website
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteTitle">Judul Website</Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                placeholder="Sejarah Islam"
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Email Admin</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                placeholder="admin@sejarahislam.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="siteDescription">Deskripsi Website</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              placeholder="Deskripsi website..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="welcomeMessage">Pesan Selamat Datang</Label>
            <Input
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => setSettings({...settings, welcomeMessage: e.target.value})}
              placeholder="Selamat datang di portal sejarah Islam"
            />
          </div>

          <div>
            <Label htmlFor="footerText">Teks Footer</Label>
            <Input
              id="footerText"
              value={settings.footerText}
              onChange={(e) => setSettings({...settings, footerText: e.target.value})}
              placeholder="© 2024 Sejarah Islam. Semua hak dilindungi."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fitur Website</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSearch">Aktifkan Pencarian</Label>
                <p className="text-sm text-muted-foreground">Mengizinkan pengguna mencari konten</p>
              </div>
              <Switch
                id="enableSearch"
                checked={settings.enableSearch}
                onCheckedChange={(checked) => setSettings({...settings, enableSearch: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableDarkMode">Mode Gelap</Label>
                <p className="text-sm text-muted-foreground">Aktifkan toggle mode gelap</p>
              </div>
              <Switch
                id="enableDarkMode"
                checked={settings.enableDarkMode}
                onCheckedChange={(checked) => setSettings({...settings, enableDarkMode: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableNotifications">Notifikasi</Label>
                <p className="text-sm text-muted-foreground">Tampilkan notifikasi kepada pengguna</p>
              </div>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Mode Maintenance</Label>
                <p className="text-sm text-muted-foreground">Aktifkan untuk maintenance website</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Simpan Pengaturan
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Default
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Catatan:</strong> Perubahan pengaturan akan disimpan secara lokal dan diterapkan segera. 
              Mode maintenance akan menampilkan halaman khusus untuk pengunjung.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;