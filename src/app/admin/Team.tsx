import { Plus, Search, Edit2, Trash2, Linkedin, Github, Instagram, UploadCloud, AlertTriangle } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const [members, setMembers] = useState([
    { id: 1, name: "Ahmet Kaya", role: "Başkan", email: "ahmet@comu.edu.tr", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" },
    { id: 2, name: "Büşra Yılmaz", role: "Başkan Yrd.", email: "busra@comu.edu.tr", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
    { id: 3, name: "Mert Çelik", role: "Genel Sekreter", email: "mert@comu.edu.tr", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" },
  ]);

  const handleDelete = (id: number) => {
    setConfirmDelete(id);
  };

  const confirmDeleteMember = () => {
    if (confirmDelete !== null) {
      setMembers(members.filter(m => m.id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Ekip Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleAdd}>
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
                      <button className="text-muted hover:text-[#0A66C2] transition-colors cursor-pointer" title="LinkedIn">
                        <Linkedin className="w-4 h-4 pointer-events-none" />
                      </button>
                      <button className="text-muted hover:text-[#E1306C] transition-colors cursor-pointer" title="Instagram">
                        <Instagram className="w-4 h-4 pointer-events-none" />
                      </button>
                      <button className="text-muted hover:text-primary transition-colors cursor-pointer" title="GitHub">
                        <Github className="w-4 h-4 pointer-events-none" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(member)} className="p-2 text-muted hover:text-[var(--brand-primary)] bg-surface hover:bg-page border border-default rounded-lg transition-colors cursor-pointer" title="Düzenle">
                      <Edit2 className="w-4 h-4 pointer-events-none" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 text-muted hover:text-red-500 bg-surface hover:bg-red-500/10 border border-default hover:border-red-500/20 rounded-lg transition-colors cursor-pointer" title="Sil">
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Team Member Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedMember ? "Üyeyi Düzenle" : "Yeni Ekip Üyesi Ekle"}
      >
        <form className="space-y-5" onSubmit={(e) => { 
          e.preventDefault(); 
          if (selectedMember) {
            setMembers(members.map(m => m.id === selectedMember.id ? { ...m, name: selectedMember.name } : m));
          }
          setIsModalOpen(false); 
        }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Ad Soyad</label>
              <input type="text" defaultValue={selectedMember?.name} placeholder="Örn: Ahmet Kaya" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Rol</label>
              <input type="text" defaultValue={selectedMember?.role} placeholder="Örn: Başkan" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>


          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Profil Fotoğrafı</label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors">
              <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full gap-2">
                {selectedMember?.image ? (
                  <img src={selectedMember.image} alt="Mevcut fotoğraf" className="w-16 h-16 rounded-full object-cover mb-1 border-2 border-[var(--brand-primary)]/30" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center border-2 border-dashed border-default mb-1">
                    <UploadCloud className="w-7 h-7 text-muted" />
                  </div>
                )}
                <span className="text-sm font-bold text-primary">Fotoğraf Seç veya Değiştir</span>
                <span className="text-xs font-medium text-muted">PNG, JPG veya WEBP (Max 2MB)</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">LinkedIn</label>
              <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Instagram</label>
              <input type="url" placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">GitHub</label>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Üyeyi Sil"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary">Emin misiniz?</h3>
            <p className="text-muted">Bu ekip üyesini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Button variant="ghost" onClick={() => setConfirmDelete(null)} className="flex-1">İptal</Button>
            <Button variant="primary" onClick={confirmDeleteMember} className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">Sil</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
