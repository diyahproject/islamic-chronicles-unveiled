import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Type, Volume2, Bell, Info, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, textSize, toggleTheme, setTextSize } = useTheme();

  const textSizeOptions = [
    { value: 'small', label: 'Kecil', preview: 'text-sm' },
    { value: 'medium', label: 'Sedang', preview: 'text-base' },
    { value: 'large', label: 'Besar', preview: 'text-lg' }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 mb-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-golden bg-clip-text text-transparent mb-4">
            Pengaturan
          </h1>
          <p className="text-muted-foreground text-lg">
            Kustomisasi pengalaman belajar sejarah Islam sesuai preferensi Anda
          </p>
        </div>
      </motion.div>

      <div className="px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-soft"
          >
            <div className="flex items-center gap-3 mb-4">
              {theme === 'light' ? (
                <Sun className="text-accent" size={24} />
              ) : (
                <Moon className="text-primary" size={24} />
              )}
              <h2 className="text-xl font-semibold">Tema Tampilan</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Pilih tema terang atau gelap sesuai kenyamanan Anda
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Terang</span>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
                <span className="text-sm text-muted-foreground">Gelap</span>
              </div>
            </div>
          </motion.div>

          {/* Text Size Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-soft"
          >
            <div className="flex items-center gap-3 mb-4">
              <Type className="text-emerald" size={24} />
              <h2 className="text-xl font-semibold">Ukuran Teks</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Sesuaikan ukuran teks untuk kenyamanan membaca
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {textSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTextSize(option.value as any)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    textSize === option.value
                      ? 'border-primary bg-primary/10 shadow-islamic'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className={`font-medium ${option.preview} mb-1`}>
                    {option.label}
                  </div>
                  <div className={`text-muted-foreground ${option.preview}`}>
                    Contoh teks
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-soft"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-accent" size={24} />
              <h2 className="text-xl font-semibold">Notifikasi</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi Harian</p>
                  <p className="text-sm text-muted-foreground">
                    Dapatkan fakta sejarah menarik setiap hari
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Update Konten</p>
                  <p className="text-sm text-muted-foreground">
                    Pemberitahuan ketika ada konten baru
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reminder Belajar</p>
                  <p className="text-sm text-muted-foreground">
                    Pengingat untuk melanjutkan pembelajaran
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>

          {/* Admin Access (Hidden) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 border border-border"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Akses Anggota Eksklusif</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Masuk sebagai anggota untuk akses konten premium
              </p>
              <Button
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => {
                  window.location.href = '/admin';
                }}
              >
                Login Anggota
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;