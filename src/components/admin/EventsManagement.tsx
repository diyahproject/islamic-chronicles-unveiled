import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Database, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

const EventsManagement = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    year: '',
    hijriYear: '',
    title: '',
    subtitle: '',
    category: '',
    location: '',
    backgroundImage: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      year: '',
      hijriYear: '',
      title: '',
      subtitle: '',
      category: '',
      location: '',
      backgroundImage: '',
      description: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateEvent(editingId, formData);
      toast({
        title: "Event Diperbarui",
        description: "Peristiwa berhasil diperbarui",
      });
    } else {
      addEvent(formData);
      toast({
        title: "Event Ditambahkan",
        description: "Peristiwa baru berhasil ditambahkan",
      });
    }
    
    resetForm();
  };

  const handleEdit = (event: any) => {
    setFormData({
      year: event.year,
      hijriYear: event.hijriYear,
      title: event.title,
      subtitle: event.subtitle,
      category: event.category,
      location: event.location,
      backgroundImage: event.backgroundImage,
      description: event.description,
    });
    setEditingId(event.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    toast({
      title: "Event Dihapus",
      description: "Peristiwa berhasil dihapus",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {isEditing ? 'Edit Peristiwa' : 'Tambah Peristiwa Baru'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Tahun Masehi</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  placeholder="610"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hijriYear">Tahun Hijriyah</Label>
                <Input
                  id="hijriYear"
                  value={formData.hijriYear}
                  onChange={(e) => setFormData({...formData, hijriYear: e.target.value})}
                  placeholder="1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Wahyu Pertama"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subjudul</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  placeholder="Turunnya wahyu pertama di Gua Hira"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  placeholder="Wahyu"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Makkah"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="backgroundImage">URL Gambar</Label>
              <Input
                id="backgroundImage"
                value={formData.backgroundImage}
                onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Deskripsi peristiwa..."
                rows={4}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                {isEditing ? 'Perbarui' : 'Tambah'} Peristiwa
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Peristiwa ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Belum ada peristiwa yang ditambahkan
              </p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.subtitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.year} M / {event.hijriYear} H - {event.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManagement;