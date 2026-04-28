import { Plus, Search, Edit2, Trash2, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const members = [
    { id: 1, name: "Ahmet Kaya", role: "Başkan", email: "ahmet@comu.edu.tr", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" },
    { id: 2, name: "Büşra Yılmaz", role: "Başkan Yrd.", email: "busra@comu.edu.tr", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
    { id: 3, name: "Mert Çelik", role: "Genel Sekreter", email: "mert@comu.edu.tr", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Ekip Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Yeni Üye Ekle
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="İsim veya rol ara..." 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-default">
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Üye Bilgisi</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Rol</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">İletişim</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-default" />
                    <div>
                      <div className="font-bold text-sm text-primary">{member.name}</div>
                      <div className="text-xs text-muted">{member.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="text-muted hover:text-[var(--brand-primary)] transition-colors" title="Mail">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-muted hover:text-[#0A66C2] transition-colors" title="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-muted hover:text-primary transition-colors" title="GitHub">
                        <Github className="w-4 h-4" />
                      </button>
                    </div>
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

      {/* Add Team Member Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Yeni Ekip Üyesi Ekle"
      >
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Ad Soyad</label>
              <input type="text" placeholder="Örn: Ahmet Kaya" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Rol</label>
              <input type="text" placeholder="Örn: Başkan" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">E-posta Adresi</label>
            <input type="email" placeholder="ornek@comu.edu.tr" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Profil Fotoğrafı URL</label>
            <input type="url" placeholder="https://..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Bölüm</label>
              <input type="text" placeholder="Örn: Bilgisayar Müh." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Sınıf / Dönem</label>
              <input type="text" placeholder="Örn: 3. Sınıf" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Kısa Biyografi</label>
            <textarea rows={3} placeholder="Üye hakkında kısa bilgi..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Eğlenceli Bilgi (Fun Fact)</label>
            <input type="text" placeholder="Örn: Günde 5 kupa kahve içerim..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">LinkedIn Linki (İsteğe bağlı)</label>
              <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">GitHub Linki (İsteğe bağlı)</label>
              <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit">
              Üyeyi Kaydet
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
