import { Plus, Search, Edit2, Trash2, CalendarDays, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { calendarEntryService } from "@/api/services/calendarEntries";
import { calendarEntryTypeConfig, calendarEntryTypeOptions, CalendarEntryType } from "@/utils/calendarEntryTypes";

export function AcademicCalendar() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    type: 'diger' as CalendarEntryType,
    description: ''
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const data = await calendarEntryService.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error("Takvim kayıtları çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => setConfirmDelete(id);

  const confirmDeleteEntry = async () => {
    if (confirmDelete !== null) {
      try {
        await calendarEntryService.deleteEntry(confirmDelete);
        setEntries(entries.filter(e => e.id !== confirmDelete));
      } catch (error) {
        console.error("Silinirken hata oluştu:", error);
      } finally {
        setConfirmDelete(null);
      }
    }
  };

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      start_date: entry.start_date,
      end_date: entry.end_date || '',
      type: entry.type || 'diger',
      description: entry.description || ''
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedEntry(null);
    setFormData({ title: '', start_date: '', end_date: '', type: 'diger', description: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        type: formData.type,
        description: formData.description || null,
        created_by: user.id
      };

      if (selectedEntry) {
        await calendarEntryService.updateEntry(selectedEntry.id, payload);
      } else {
        await calendarEntryService.createEntry(payload);
      }

      await fetchEntries();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Kaydedilirken hata oluştu:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEntries = entries.filter(entry =>
    (entry.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><span className="text-[var(--brand-primary)]">&gt;_</span> Akademik Takvim Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2 font-mono" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> ./yeni-kayit.sh
        </Button>
      </div>

      <p className="text-sm text-muted -mt-2">
        Milli bayramlar, resmi tatiller ve vize/final haftaları burada yönetilir. Bu kayıtlar Etkinlikler sayfasındaki takvimde otomatik olarak görünür.
      </p>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden relative">
        <div className="w-full h-8 bg-surface border-b border-default flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-muted ml-4 font-mono">root@ygk-server:~/admin/calendar</span>
        </div>

        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="> Takvim kaydı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
              <p>Takvim kayıtları yükleniyor...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <CalendarDays className="w-12 h-12 opacity-20" />
              <p>Henüz takvim kaydı eklenmemiş.</p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <Search className="w-12 h-12 opacity-20" />
              <p>Aranan kriterlere uygun kayıt bulunamadı.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-default">
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Başlık</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tür</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tarih Aralığı</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {filteredEntries.map((entry) => {
                  const typeConf = calendarEntryTypeConfig[entry.type as CalendarEntryType] || calendarEntryTypeConfig.diger;
                  const start = new Date(entry.start_date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                  const end = entry.end_date ? new Date(entry.end_date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

                  return (
                    <tr key={entry.id} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-bold text-sm text-primary">{entry.title}</td>
                      <td className="p-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold border"
                          style={{ color: typeConf.color, borderColor: `${typeConf.color}40`, backgroundColor: `${typeConf.color}15` }}
                        >
                          {typeConf.label}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" /> {start}{end ? ` – ${end}` : ''}
                        </div>
                      </td>
                      <td className="p-4 flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(entry)} className="p-2 text-muted hover:text-[var(--brand-primary)] bg-surface hover:bg-page border border-default rounded-lg transition-colors cursor-pointer" title="Düzenle">
                          <Edit2 className="w-4 h-4 pointer-events-none" />
                        </button>
                        <button onClick={() => handleDelete(entry.id)} className="p-2 text-muted hover:text-red-500 bg-surface hover:bg-red-500/10 border border-default hover:border-red-500/20 rounded-lg transition-colors cursor-pointer" title="Sil">
                          <Trash2 className="w-4 h-4 pointer-events-none" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEntry ? ">_ Takvim Kaydını Düzenle" : ">_ Yeni Takvim Kaydı Ekle"}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Tür</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as CalendarEntryType })}
              className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
            >
              {calendarEntryTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Başlık</label>
            <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Örn: Final Haftası (Güz Dönemi)" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Başlangıç Tarihi</label>
              <input type="date" value={formData.start_date} onChange={e => setFormData({ ...formData, start_date: e.target.value })} className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Bitiş Tarihi (opsiyonel)</label>
              <input type="date" value={formData.end_date} onChange={e => setFormData({ ...formData, end_date: e.target.value })} min={formData.start_date || undefined} className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Açıklama (opsiyonel)</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Kayıt hakkında ek bilgi..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none"></textarea>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Takvim Kaydını Sil"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary">Emin misiniz?</h3>
            <p className="text-muted">Bu takvim kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Button variant="ghost" onClick={() => setConfirmDelete(null)} className="flex-1">İptal</Button>
            <Button variant="primary" onClick={confirmDeleteEntry} className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">Sil</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
