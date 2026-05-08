import { Plus, Search, Edit2, Trash2, ExternalLink, Github, UploadCloud, AlertTriangle } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useState } from "react";

export function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectStatus, setProjectStatus] = useState('Aktif');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const [projects, setProjects] = useState([
    { id: 1, title: "ÇOMÜ Kampüs Haritası", status: "Aktif", demo: "https://demo.com", github: "https://github.com/ygk" },
    { id: 2, title: "Kulüp Web Sitesi", status: "Geliştirmede", demo: null, github: "https://github.com/ygk" },
    { id: 3, title: "Akıllı Otopark", status: "Tamamlandı", demo: "https://demo2.com", github: "https://github.com/ygk" },
  ]);

  const handleDelete = (id: number) => {
    setConfirmDelete(id);
  };

  const confirmDeleteProject = () => {
    if (confirmDelete !== null) {
      setProjects(projects.filter(p => p.id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setProjectStatus(project.status);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setProjectStatus('Aktif');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Projeler Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> Yeni Proje Ekle
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Proje ara..."
              className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-default">
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Proje Adı</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Durum</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Bağlantılar</th>
                <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 font-bold text-sm text-primary">{project.title}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${project.status === 'Aktif'
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : project.status === 'Geliştirmede'
                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                      }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="text-muted hover:text-[var(--brand-primary)]" title="Demo">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-muted hover:text-primary" title="GitHub">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(project)} className="p-2 text-muted hover:text-[var(--brand-primary)] bg-surface hover:bg-page border border-default rounded-lg transition-colors cursor-pointer" title="Düzenle">
                      <Edit2 className="w-4 h-4 pointer-events-none" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-muted hover:text-red-500 bg-surface hover:bg-red-500/10 border border-default hover:border-red-500/20 rounded-lg transition-colors cursor-pointer" title="Sil">
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject ? "Projeyi Düzenle" : "Yeni Proje Ekle"}
      >
        <form className="space-y-5" onSubmit={(e) => { 
          e.preventDefault(); 
          if(selectedProject) {
             setProjects(projects.map(p => p.id === selectedProject.id ? { ...p, status: projectStatus } : p));
          }
          setIsModalOpen(false); 
        }}>
          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Proje Adı</label>
            <input type="text" defaultValue={selectedProject?.title} placeholder="Örn: ÇOMÜ Kampüs Haritası" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Proje Tipi</label>
              <select className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none">
                <option value="club">Kulüp Projesi</option>
                <option value="member">Üye Projesi</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Alt Kol (Kulüp Projesi ise)</label>
              <select className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none">
                <option value="">Seçiniz...</option>
                <option value="web">Web Geliştirme</option>
                <option value="mobile">Mobil Uygulama</option>
                <option value="game">Oyun Geliştirme</option>
                <option value="blockchain">Blockchain</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Geliştirici(ler)</label>
            <input type="text" placeholder="Örn: Ahmet Yılmaz, Ayşe Demir" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            <p className="text-xs text-muted">Üye projesi ise projeyi geliştiren kişileri yazın.</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Durum</label>
            <select 
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
            >
              <option value="Aktif">Aktif</option>
              <option value="Geliştirmede">Geliştirmede</option>
              <option value="Tamamlandı">Tamamlandı</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Demo Linki (İsteğe bağlı)</label>
              <input type="url" placeholder="https://..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">GitHub Linki (İsteğe bağlı)</label>
              <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Etiketler (Virgülle ayırın)</label>
            <input type="text" placeholder="Örn: React, Node.js, MongoDB" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Kapak Görseli</label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors cursor-pointer">
              <label className="flex flex-col items-center justify-center p-6 cursor-pointer w-full gap-2">
                <UploadCloud className="w-8 h-8 text-[var(--brand-primary)] opacity-80" />
                <span className="text-sm font-bold text-primary">Görsel Seç</span>
                <span className="text-xs font-medium text-muted">PNG, JPG veya WEBP (Max 5MB)</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Açıklama</label>
            <textarea rows={4} placeholder="Proje hakkında kısa bilgi..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit">
              Projeyi Kaydet
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Projeyi Sil"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary">Emin misiniz?</h3>
            <p className="text-muted">Bu projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
          </div>
          <div className="flex items-center gap-3 w-full">
            <Button variant="ghost" onClick={() => setConfirmDelete(null)} className="flex-1">İptal</Button>
            <Button variant="primary" onClick={confirmDeleteProject} className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">Sil</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
