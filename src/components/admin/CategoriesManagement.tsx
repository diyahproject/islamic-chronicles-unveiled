import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

const CategoriesManagement = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    eventCount: 0,
    color: 'from-emerald-500 to-emerald-600',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      eventCount: 0,
      color: 'from-emerald-500 to-emerald-600',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateCategory(editingId, formData);
      toast({
        title: "Kategori Diperbarui",
        description: "Kategori berhasil diperbarui",
      });
    } else {
      addCategory(formData);
      toast({
        title: "Kategori Ditambahkan",
        description: "Kategori baru berhasil ditambahkan",
      });
    }
    
    resetForm();
  };

  const handleEdit = (category: any) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      eventCount: category.eventCount,
      color: category.color,
    });
    setEditingId(category.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    toast({
      title: "Kategori Dihapus",
      description: "Kategori berhasil dihapus",
    });
  };

  const colorOptions = [
    'from-emerald-500 to-emerald-600',
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-green-500 to-emerald-500',
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isEditing ? 'Edit Kategori' : 'Tambah Kategori Baru'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Kategori</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Periode Makkah"
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventCount">Jumlah Peristiwa</Label>
                <Input
                  id="eventCount"
                  type="number"
                  value={formData.eventCount}
                  onChange={(e) => setFormData({...formData, eventCount: parseInt(e.target.value) || 0})}
                  placeholder="25"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Awal dakwah dan pembentukan umat"
                required
              />
            </div>
            <div>
              <Label htmlFor="image">URL Gambar</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
            <div>
              <Label htmlFor="color">Warna Gradient</Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              >
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                {isEditing ? 'Perbarui' : 'Tambah'} Kategori
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
          <CardTitle>Daftar Kategori ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 col-span-2">
                Belum ada kategori yang ditambahkan
              </p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className={`h-32 bg-gradient-to-br ${category.color} relative`}
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} bg-opacity-70`} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {category.eventCount} peristiwa
                        </p>
                      </div>
                      <div className="flex gap-2 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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

export default CategoriesManagement;