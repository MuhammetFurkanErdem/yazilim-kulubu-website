import { Plus, Search, Edit2, Trash2, Calendar as CalendarIcon, MapPin, UploadCloud, AlertTriangle, Loader2, Link as LinkIcon, Users } from "lucide-react";
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useState, useEffect } from "react";
import { eventService } from "@/api/services/events";
import { storageService } from "@/api/services/storage";
import { useAuth } from "@/contexts/AuthContext";

export function Events() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'upcoming' as 'featured' | 'upcoming' | 'past',
    capacity: '',
    registration_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Etkinlikler çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeleteEvent = async () => {
    if (confirmDelete !== null) {
      try {
        await eventService.deleteEvent(confirmDelete);
        setEvents(events.filter(e => e.id !== confirmDelete));
      } catch (error) {
        console.error("Silinirken hata oluştu:", error);
      } finally {
        setConfirmDelete(null);
      }
    }
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);

    const eventDate = new Date(event.date);
    const dateStr = eventDate.toISOString().split('T')[0];
    const timeStr = eventDate.toTimeString().substring(0, 5);

    setFormData({
      title: event.title,
      date: dateStr,
      time: timeStr,
      location: event.location || '',
      description: event.description || '',
      type: event.type || 'upcoming',
      capacity: event.capacity ? event.capacity.toString() : '',
      registration_url: event.registration_url || ''
    });
    setImageFile(null);
    setGalleryFiles([]);
    setExistingGalleryUrls(event.gallery_urls || []);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'upcoming',
      capacity: '',
      registration_url: ''
    });
    setImageFile(null);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      let imageUrl = selectedEvent?.image_url || null;

      if (imageFile) {
        imageUrl = await storageService.uploadImage('event-covers', imageFile);
      }

      // Galeri resimlerini yükle (sadece Geçmiş etkinlikler için)
      let finalGalleryUrls = [...existingGalleryUrls];
      if (formData.type === 'past' && galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(file => storageService.uploadImage('event-covers', file, 'gallery'));
        const newGalleryUrls = await Promise.all(uploadPromises);
        finalGalleryUrls = [...finalGalleryUrls, ...newGalleryUrls];
      }

      const combinedDate = new Date(`${formData.date}T${formData.time}:00`).toISOString();

      const eventPayload = {
        title: formData.title,
        date: combinedDate,
        location: formData.location,
        description: formData.description,
        image_url: imageUrl,
        type: formData.type,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        registration_url: formData.type !== 'past' ? formData.registration_url : null,
        gallery_urls: formData.type === 'past' ? finalGalleryUrls : [],
        created_by: user.id
      };

      if (selectedEvent) {
        await eventService.updateEvent(selectedEvent.id, eventPayload);
      } else {
        await eventService.createEvent(eventPayload);
      }

      await fetchEvents();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Kaydedilirken hata oluştu:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'featured': return 'Geniş (Öne Çıkan)';
      case 'past': return 'Geçmiş';
      default: return 'Planlanan (Yaklaşan)';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'featured': return 'bg-purple-500/10 text-purple-500 border border-purple-500/20';
      case 'past': return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><span className="text-[var(--brand-primary)]">&gt;_</span> Etkinlik Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2 font-mono" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> ./yeni-etkinlik.sh
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden relative">
        <div className="w-full h-8 bg-surface border-b border-default flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-muted ml-4 font-mono">root@ygk-server:~/admin/events</span>
        </div>

        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="> Etkinlik ara..."
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
              <p>Etkinlikler yükleniyor...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <CalendarIcon className="w-12 h-12 opacity-20" />
              <p>Henüz etkinlik eklenmemiş.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-default">
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Etkinlik Adı</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tür</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tarih</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Konum</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {events.map((event) => {
                  const displayDate = new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

                  return (
                    <tr key={event.id} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-sm text-primary">
                        <div className="flex items-center gap-3">
                          {event.image_url ? (
                            <img src={event.image_url} alt={event.title} className="w-10 h-10 rounded-lg object-cover border border-default" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-surface border border-default flex items-center justify-center">
                              <CalendarIcon className="w-4 h-4 text-muted" />
                            </div>
                          )}
                          {event.title}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getTypeColor(event.type)}`}>
                          {getTypeLabel(event.type)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" /> {displayDate}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {event.location || '-'}
                        </div>
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(event)} className="p-2 text-muted hover:text-[var(--brand-primary)] bg-surface hover:bg-page border border-default rounded-lg transition-colors cursor-pointer" title="Düzenle">
                          <Edit2 className="w-4 h-4 pointer-events-none" />
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="p-2 text-muted hover:text-red-500 bg-surface hover:bg-red-500/10 border border-default hover:border-red-500/20 rounded-lg transition-colors cursor-pointer" title="Sil">
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent ? ">_ Etkinliği Düzenle" : ">_ Yeni Etkinlik Ekle"}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-sm font-bold text-primary">Etkinlik Türü</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
              >
                <option value="featured">Geniş (Öne Çıkan / Hero)</option>
                <option value="upcoming">Planlanan (Yaklaşan)</option>
                <option value="past">Geçmiş Etkinlik</option>
              </select>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-sm font-bold text-primary">
                {formData.type === 'past' ? 'Katılımcı Sayısı' : 'Kontenjan (Kişi)'}
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="number" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} placeholder="Örn: 60" className="w-full pl-9 pr-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Etkinlik Adı</label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Örn: Yapay Zeka Zirvesi" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Tarih</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Saat</label>
              <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Konum</label>
            <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Örn: Troia Kültür Merkezi" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          {formData.type !== 'past' && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Kayıt Linki (Google Forms vb.)</label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="url" value={formData.registration_url} onChange={e => setFormData({ ...formData, registration_url: e.target.value })} placeholder="https://forms.gle/..." className="w-full pl-9 pr-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Kapak Görseli</label>
            {imageFile || selectedEvent?.image_url ? (
              <div className="w-full relative h-40 border-2 border-default rounded-xl overflow-hidden bg-surface group">
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : selectedEvent?.image_url}
                  alt="Kapak"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    if (selectedEvent) selectedEvent.image_url = null;
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Görseli Kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors">
                <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full gap-2">
                  <UploadCloud className="w-8 h-8 text-[var(--brand-primary)] opacity-80" />
                  <span className="text-sm font-bold text-primary">Görsel Seç</span>
                  <span className="text-xs font-medium text-muted">PNG, JPG veya WEBP (Max 5MB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Detaylı Açıklama</label>
            <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Etkinlik hakkında detaylı bilgi..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
          </div>

          {formData.type === 'past' && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Etkinlik Galerisi (Çoklu Fotoğraf)</label>
              <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors p-4">

                {/* Existing Gallery Preview */}
                {(existingGalleryUrls.length > 0 || galleryFiles.length > 0) && (
                  <div className="flex gap-2 flex-wrap mb-4">
                    {existingGalleryUrls.map((url, i) => (
                      <div key={'ext-' + i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                        <img src={url} alt="Galeri" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setExistingGalleryUrls(existingGalleryUrls.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                    {galleryFiles.map((f, i) => (
                      <div key={'new-' + i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                        <img src={URL.createObjectURL(f)} alt="Yeni" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="flex flex-col items-center justify-center py-4 cursor-pointer w-full gap-2">
                  <UploadCloud className="w-6 h-6 text-muted" />
                  <span className="text-xs font-bold text-primary">Galeriye Fotoğraf Ekle</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={e => {
                    if (e.target.files) {
                      setGalleryFiles([...galleryFiles, ...Array.from(e.target.files)]);
                    }
                  }} />
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Etkinliği Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Etkinliği Sil"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary">Emin misiniz?</h3>
            <p className="text-muted">Bu etkinliği silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Button variant="ghost" onClick={() => setConfirmDelete(null)} className="flex-1">İptal</Button>
            <Button variant="primary" onClick={confirmDeleteEvent} className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">Sil</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
