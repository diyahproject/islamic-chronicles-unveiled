import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

const ColorSettings = () => {
  const {
    lightBgColor,
    darkBgColor,
    setLightBgColor,
    setDarkBgColor,
    applyColorChanges,
  } = useAdmin();
  const { toast } = useToast();

  const handleColorUpdate = () => {
    applyColorChanges();
    toast({
      title: "Warna Background Diperbarui",
      description: "Perubahan telah diterapkan ke website",
    });
  };

  const handleReset = () => {
    setLightBgColor('#fcfaf8');
    setDarkBgColor('#1a1511');
    setTimeout(() => {
      applyColorChanges();
      toast({
        title: "Warna Direset",
        description: "Warna background dikembalikan ke default",
      });
    }, 100);
  };

  return (
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
          <Button variant="outline" onClick={handleReset}>
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
  );
};

export default ColorSettings;