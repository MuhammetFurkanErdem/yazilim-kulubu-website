import { Plus, Search, Edit2, Trash2, Calendar as CalendarIcon, MapPin, UploadCloud } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventStatus, setEventStatus] = useState('Yaklaşan');

  const events = [
    { id: 1, title: "Web Geliştirme Eğitimi", date: "15 Ekim 2024", location: "Bilgisayar Müh. Lab 1", status: "Yaklaşan" },
    { id: 2, title: "Yapay Zeka Zirvesi", date: "20 Kasım 2024", location: "Troia Kültür Merkezi", status: "Yaklaşan" },
    { id: 3, title: "Hackathon 2023", date: "10 Mayıs 2023", location: "ÇOMÜ Kütüphane", status: "Geçmiş" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Etkinlik Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Yeni Etkinlik Ekle
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Etkinlik ara..." 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-default">
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Etkinlik Adı</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tarih</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Konum</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Durum</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 font-bold text-sm text-primary">{event.title}</td>
                  <td className="p-4 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> {event.date}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      event.status === 'Yaklaşan' 
                        ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button className="p-2 text-muted hover:text-[var(--brand-primary)] bg-surface hover:bg-page border border-default rounded-lg transition-colors" title="Düzenle">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted hover:text-red-500 bg-surface hover:bg-red-500/10 border border-default hover:border-red-500/20 rounded-lg transition-colors" title="Sil">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Yeni Etkinlik Ekle"
      >
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Etkinlik Adı</label>
            <input type="text" placeholder="Örn: Yapay Zeka Zirvesi" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Tarih</label>
              <input type="date" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Saat</label>
              <input type="time" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Konum</label>
            <input type="text" placeholder="Örn: Troia Kültür Merkezi" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Kontenjan</label>
              <input type="number" placeholder="Örn: 60" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Etkinlik Türü</label>
              <select className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none">
                <option value="workshop">Workshop</option>
                <option value="hackathon">Hackathon</option>
                <option value="talk">Söyleşi (Talk)</option>
                <option value="social">Sosyal Etkinlik</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Durum</label>
            <select 
              value={eventStatus}
              onChange={(e) => setEventStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
            >
              <option value="Yaklaşan">Yaklaşan</option>
              <option value="Geçmiş">Geçmiş</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Kapak Görseli</label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors">
              <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full gap-2">
                <UploadCloud className="w-8 h-8 text-[var(--brand-primary)] opacity-80" />
                <span className="text-sm font-bold text-primary">Görsel Seç</span>
                <span className="text-xs font-medium text-muted">PNG, JPG veya WEBP (Max 5MB)</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Detaylı Açıklama</label>
            <textarea rows={4} placeholder="Etkinlik hakkında detaylı bilgi, geçmişse etkinlikte neler yaşandı..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
          </div>

          {eventStatus === 'Geçmiş' && (
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Galeri Fotoğrafları</label>
              <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors">
                <label className="flex flex-col items-center justify-center p-8 cursor-pointer w-full gap-2">
                  <UploadCloud className="w-10 h-10 text-[var(--brand-primary)] opacity-80" />
                  <span className="text-sm font-bold text-primary">Fotoğrafları Yükle</span>
                  <span className="text-xs font-medium text-muted">Birden fazla fotoğraf seçebilirsiniz</span>
                  <input type="file" accept="image/*" multiple className="hidden" />
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit">
              Etkinliği Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
