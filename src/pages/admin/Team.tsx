import { Plus, Search, Edit2, Trash2, Linkedin, Github, Instagram, UploadCloud, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useState, useEffect } from "react";
import { supabase } from "@/api/config";
import { storageService } from "@/api/services/storage";

export function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    department: '',
    linkedin_url: '',
    github_url: '',
    instagram_url: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Üyeler çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeleteMember = async () => {
    if (confirmDelete !== null) {
      try {
        const { error } = await supabase.from('profiles').delete().eq('id', confirmDelete);
        if (error) throw error;
        setMembers(members.filter(m => m.id !== confirmDelete));
      } catch (error) {
        console.error("Silinirken hata oluştu:", error);
      } finally {
        setConfirmDelete(null);
      }
    }
  };

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setFormData({
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      position: member.position || '',
      department: member.department || '',
      linkedin_url: member.linkedin_url || '',
      github_url: member.github_url || '',
      instagram_url: member.instagram_url || '',
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(null);
    setFormData({
      first_name: '',
      last_name: '',
      position: '',
      department: '',
      linkedin_url: '',
      github_url: '',
      instagram_url: '',
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let avatarUrl = selectedMember?.avatar_url || null;

      if (imageFile) {
        avatarUrl = await storageService.uploadImage('project-images', imageFile); // Profil fotoları için aynı bucket'ı kullanabiliriz
      }

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        position: formData.position,
        role: 'member', // Default sistem yetkisi
        department: formData.department,
        linkedin_url: formData.linkedin_url,
        github_url: formData.github_url,
        instagram_url: formData.instagram_url,
        avatar_url: avatarUrl,
      };

      if (selectedMember) {
        const { error } = await supabase.from('profiles').update(payload).eq('id', selectedMember.id);
        if (error) throw error;
      } else {
        // Yeni bir profil manuel eklenirse auth'a bağlı olmadığı için rastgele bir UUID verebiliriz veya auth ile davet edilebilir.
        // Şimdilik sadece profiles tablosuna satır ekliyoruz. (Eğer profil RLS'si buna izin veriyorsa. Vermiyorsa auth'tan eklenmesi gerekir.)
        const { error } = await supabase.from('profiles').insert([{ ...payload, id: crypto.randomUUID() }]);
        if (error) throw error;
      }

      await fetchMembers();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Kaydedilirken hata oluştu:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><span className="text-[var(--brand-primary)]">&gt;_</span> Ekip Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2 font-mono" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> ./yeni-uye.sh
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden relative">
        <div className="w-full h-8 bg-surface border-b border-default flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-muted ml-4 font-mono">root@ygk-server:~/admin/team</span>
        </div>

        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="> İsim veya rol ara..." 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
               <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
               <p>Ekip listesi yükleniyor...</p>
             </div>
          ) : members.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
               <p>Henüz ekip üyesi bulunmuyor.</p>
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-default">
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Üye Bilgisi</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Rol</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Bölüm</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">İletişim</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      {member.avatar_url ? (
                        <img src={member.avatar_url} alt={member.first_name} className="w-10 h-10 rounded-full object-cover border border-default" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-surface border border-default flex items-center justify-center text-muted font-bold">
                          {(member.first_name?.[0] || '') + (member.last_name?.[0] || '')}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm text-primary">{member.first_name} {member.last_name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                        {member.position || 'Üye'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {member.department || '-'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="text-muted hover:text-[#0A66C2] transition-colors cursor-pointer" title="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.instagram_url && (
                          <a href={member.instagram_url} target="_blank" rel="noreferrer" className="text-muted hover:text-[#E1306C] transition-colors cursor-pointer" title="Instagram">
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {member.github_url && (
                          <a href={member.github_url} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors cursor-pointer" title="GitHub">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
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
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedMember ? ">_ Üyeyi Düzenle" : ">_ Yeni Ekip Üyesi Ekle"}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Ad</label>
              <input type="text" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} placeholder="Örn: Ahmet" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Soyad</label>
              <input type="text" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} placeholder="Örn: Kaya" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Rol / Unvan</label>
              <input type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} placeholder="Örn: Başkan" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Bölüm</label>
              <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="Örn: Bilgisayar Mühendisliği" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Profil Fotoğrafı</label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors">
              <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full gap-2">
                {imageFile || selectedMember?.avatar_url ? (
                  <img src={imageFile ? URL.createObjectURL(imageFile) : selectedMember?.avatar_url} alt="Mevcut fotoğraf" className="w-16 h-16 rounded-full object-cover mb-1 border-2 border-[var(--brand-primary)]/30" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center border-2 border-dashed border-default mb-1">
                    <UploadCloud className="w-7 h-7 text-muted" />
                  </div>
                )}
                <span className="text-sm font-bold text-primary">Fotoğraf Seç veya Değiştir</span>
                <span className="text-xs font-medium text-muted">PNG, JPG veya WEBP (Max 2MB)</span>
                <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">LinkedIn</label>
              <input type="url" value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Instagram</label>
              <input type="url" value={formData.instagram_url} onChange={e => setFormData({...formData, instagram_url: e.target.value})} placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">GitHub</label>
              <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Üyeyi Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

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
