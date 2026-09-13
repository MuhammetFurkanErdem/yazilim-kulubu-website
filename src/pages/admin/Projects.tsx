import { Plus, Search, Edit2, Trash2, ExternalLink, Github, UploadCloud, AlertTriangle, Loader2, X } from "lucide-react";
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useState, useEffect } from "react";
import { projectService } from "@/api/services/projects";
import { storageService } from "@/api/services/storage";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/api/config";
import { SmartImage } from "@/components/shared/SmartImage";
import { ImageCropperModal } from "@/components/shared/ImageCropperModal";

export function Projects() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    is_club_project: true,
    status: 'approved' as 'pending' | 'approved' | 'rejected',
    demo_url: '',
    github_url: '',
    tech_stack: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  // Cropper State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const [cropperTargetType, setCropperTargetType] = useState<'cover' | 'gallery'>('cover');
  const [cropperAspect, setCropperAspect] = useState<number>(16 / 9);

  // Geliştiriciler
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<{ profile_id: string; role: string }[]>([]);
  const [selectedProfileToAdd, setSelectedProfileToAdd] = useState('');

  const handleCoverSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const processed = await storageService.processImage(f);
      const url = URL.createObjectURL(processed);
      setCropperSrc(url);
      setCropperTargetType('cover');
      setCropperAspect(16 / 9);
      setCropperOpen(true);
    }
  };

  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      const processed = await storageService.processImage(f);
      const url = URL.createObjectURL(processed);
      setCropperSrc(url);
      setCropperTargetType('gallery');
      setCropperAspect(4 / 3);
      setCropperOpen(true);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    if (cropperTargetType === 'cover') {
      setImageFile(croppedFile);
    } else {
      setGalleryFiles(prev => [...prev, croppedFile]);
    }
  };

  const handleAddDeveloper = () => {
    if (!selectedProfileToAdd) return;
    if (developers.some(d => d.profile_id === selectedProfileToAdd)) return;
    setDevelopers(prev => [...prev, { profile_id: selectedProfileToAdd, role: '' }]);
    setSelectedProfileToAdd('');
  };

  const handleRemoveDeveloper = (profileId: string) => {
    setDevelopers(prev => prev.filter(d => d.profile_id !== profileId));
  };

  const handleDeveloperRoleChange = (profileId: string, role: string) => {
    setDevelopers(prev => prev.map(d => d.profile_id === profileId ? { ...d, role } : d));
  };

  useEffect(() => {
    fetchProjects();
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('id, first_name, last_name, avatar_url').order('first_name', { ascending: true });
      if (error) throw error;
      setAllProfiles(data || []);
    } catch (error) {
      console.error("Profiller çekilemedi:", error);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Projeler çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeleteProject = async () => {
    if (confirmDelete !== null) {
      try {
        await projectService.deleteProject(confirmDelete);
        setProjects(projects.filter(p => p.id !== confirmDelete));
      } catch (error) {
        console.error("Proje silinirken hata:", error);
      } finally {
        setConfirmDelete(null);
      }
    }
  };

  const handleEdit = async (project: any) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || '',
      is_club_project: project.is_club_project,
      status: project.status || 'approved',
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : ''
    });
    setImageFile(null);
    setGalleryFiles([]);
    setExistingGalleryUrls(project.gallery_urls || []);

    try {
      const { data, error } = await supabase.from('project_members').select('profile_id, role').eq('project_id', project.id);
      if (error) throw error;
      setDevelopers((data || []).map((d: any) => ({ profile_id: d.profile_id, role: d.role || '' })));
    } catch (error) {
      console.error("Geliştiriciler çekilemedi:", error);
      setDevelopers([]);
    }

    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setFormData({
      title: '',
      description: '',
      long_description: '',
      is_club_project: true,
      status: 'approved',
      demo_url: '',
      github_url: '',
      tech_stack: ''
    });
    setImageFile(null);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setDevelopers([]);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      let imageUrl = selectedProject?.image_url || null;

      if (imageFile) {
        imageUrl = await storageService.uploadImage('project-images', imageFile);
      }

      let finalGalleryUrls = [...existingGalleryUrls];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(file => storageService.uploadImage('project-images', file, 'gallery'));
        const newGalleryUrls = await Promise.all(uploadPromises);
        finalGalleryUrls = [...finalGalleryUrls, ...newGalleryUrls];
      }

      const techArray = formData.tech_stack
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      // Verify if user's profile exists in profiles table before setting created_by
      let createdBy: string | null = user.id;
      const { data: profileCheck } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
      if (!profileCheck) {
        createdBy = null;
      }

      const projectPayload = {
        title: formData.title,
        description: formData.description,
        long_description: formData.long_description,
        is_club_project: formData.is_club_project,
        status: formData.status,
        demo_url: formData.demo_url,
        github_url: formData.github_url,
        tech_stack: techArray,
        image_url: imageUrl,
        gallery_urls: finalGalleryUrls,
        created_by: createdBy
      };

      let projectId = selectedProject?.id;
      if (selectedProject) {
        await supabase.from('projects').update(projectPayload).eq('id', selectedProject.id);
      } else {
        const created = await projectService.createProject(projectPayload as any);
        projectId = created.id;
      }

      // Geliştiricileri senkronize et (mevcutları sil, güncel listeyi ekle)
      await supabase.from('project_members').delete().eq('project_id', projectId);
      if (developers.length > 0) {
        await supabase.from('project_members').insert(
          developers.map(d => ({ project_id: projectId, profile_id: d.profile_id, role: d.role || null }))
        );
      }

      await fetchProjects();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Kaydedilirken hata oluştu:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Aktif/Onaylı';
      case 'pending': return 'Bekliyor';
      case 'rejected': return 'Reddedildi';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-500 border border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border border-red-500/20';
      default: return 'bg-surface text-muted border border-default';
    }
  };

  const filteredProjects = projects.filter(project => {
    const titleMatch = (project.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const techStackArray = Array.isArray(project.tech_stack) ? project.tech_stack : [];
    const techMatch = techStackArray.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return titleMatch || descMatch || techMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><span className="text-[var(--brand-primary)]">&gt;_</span> Projeler Yönetimi</h1>
        <Button variant="primary" className="flex items-center gap-2 font-mono" onClick={handleAdd}>
          <Plus className="w-4 h-4" /> ./yeni-proje.sh
        </Button>
      </div>

      <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden relative">
        <div className="w-full h-8 bg-surface border-b border-default flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-muted ml-4 font-mono">root@ygk-server:~/admin/projects</span>
        </div>

        <div className="p-4 border-b border-default flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="> Proje ara..."
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
               <p>Projeler yükleniyor...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
               <span className="text-4xl opacity-20">📁</span>
               <p>Henüz proje eklenmemiş.</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted gap-4">
              <Search className="w-12 h-12 opacity-20 text-muted" />
              <p>Aranan kriterlere uygun proje bulunamadı.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-default">
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Proje Adı</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Tür</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Durum</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Bağlantılar</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-bold text-sm text-primary">
                      <div className="flex items-center gap-3">
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.title} className="w-10 h-10 rounded-lg object-cover border border-default" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-surface border border-default flex items-center justify-center text-muted">
                            {project.title.charAt(0)}
                          </div>
                        )}
                        {project.title}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {project.is_club_project ? 'Kulüp Projesi' : 'Üye Projesi'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-muted hover:text-[var(--brand-primary)]" title="Demo">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="text-muted hover:text-primary" title="GitHub">
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
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject ? ">_ Projeyi Düzenle" : ">_ Yeni Proje Ekle"}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Proje Adı</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Örn: ÇOMÜ Kampüs Haritası" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Proje Tipi</label>
              <select 
                value={formData.is_club_project ? 'club' : 'member'}
                onChange={e => setFormData({...formData, is_club_project: e.target.value === 'club'})}
                className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
              >
                <option value="club">Kulüp Projesi</option>
                <option value="member">Üye Projesi</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Durum</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
                className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
              >
                <option value="approved">Aktif / Onaylı</option>
                <option value="pending">Onay Bekliyor</option>
                <option value="rejected">Reddedildi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Demo Linki</label>
              <input type="url" value={formData.demo_url} onChange={e => setFormData({...formData, demo_url: e.target.value})} placeholder="https://..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">GitHub Linki</label>
              <input type="url" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} placeholder="https://github.com/..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Etiketler (Virgülle ayırın)</label>
            <input type="text" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} placeholder="Örn: React, Node.js, MongoDB" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Kapak Görseli</label>
            {imageFile || selectedProject?.image_url ? (
              <div className="w-full relative h-40 border-2 border-default rounded-xl overflow-hidden bg-surface group">
                <SmartImage
                  src={imageFile ? URL.createObjectURL(imageFile) : selectedProject?.image_url}
                  alt="Kapak"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    if(selectedProject) selectedProject.image_url = null;
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
                  <span className="text-xs font-medium text-muted">PNG, JPG, WEBP veya HEIC/HEIF</span>
                  <input type="file" accept="image/jpeg, image/png, image/webp, image/*, .heic, .heif" className="hidden" onChange={handleCoverSelect} />
                </label>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Açıklama <span className="text-muted font-normal">(Amaç ve öne çıkan özellikler)</span></label>
            <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Proje hakkında kısa bilgi..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Detaylı Açıklama <span className="text-muted font-normal">(Opsiyonel, teknik veya genel detaylar)</span></label>
            <textarea rows={6} value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} placeholder="Projenin mimarisi, kullanılan teknolojiler, karşılaşılan zorluklar vb..." className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none"></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Geliştiriciler <span className="text-muted font-normal">(Opsiyonel)</span></label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page p-4 space-y-3">
              {developers.length > 0 && (
                <div className="space-y-2">
                  {developers.map(d => {
                    const profile = allProfiles.find(p => p.id === d.profile_id);
                    return (
                      <div key={d.profile_id} className="flex items-center gap-3 bg-surface border border-default rounded-lg p-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-page border border-default flex-shrink-0 flex items-center justify-center">
                          {profile?.avatar_url ? (
                            <SmartImage src={profile.avatar_url} alt={profile.first_name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-muted opacity-50">{profile?.first_name?.[0] || '?'}</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-primary flex-shrink-0">{profile ? `${profile.first_name} ${profile.last_name}` : 'Bilinmiyor'}</span>
                        <input
                          type="text"
                          value={d.role}
                          onChange={e => handleDeveloperRoleChange(d.profile_id, e.target.value)}
                          placeholder="Proje rolü (örn. Backend Geliştirici)"
                          className="flex-1 min-w-0 px-3 py-1.5 bg-page border border-default rounded-lg text-xs focus:outline-none focus:border-[var(--brand-primary)]"
                        />
                        <button type="button" onClick={() => handleRemoveDeveloper(d.profile_id)} className="p-1.5 text-muted hover:text-red-500 transition-colors flex-shrink-0" title="Kaldır">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-2">
                <select
                  value={selectedProfileToAdd}
                  onChange={e => setSelectedProfileToAdd(e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface border border-default rounded-lg text-sm focus:outline-none focus:border-[var(--brand-primary)] text-primary appearance-none"
                >
                  <option value="">Ekip üyesi seçin...</option>
                  {allProfiles.filter(p => !developers.some(d => d.profile_id === p.id)).map(p => (
                    <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                  ))}
                </select>
                <button type="button" onClick={handleAddDeveloper} disabled={!selectedProfileToAdd} className="px-4 py-2 bg-[var(--brand-primary)] text-white text-sm font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                  Ekle
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-primary">Ekstra Görseller <span className="text-muted font-normal">(Opsiyonel, çoklu fotoğraf)</span></label>
            <div className="w-full border-2 border-dashed border-default rounded-xl bg-page hover:bg-surface transition-colors p-4">
              {(existingGalleryUrls.length > 0 || galleryFiles.length > 0) && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {existingGalleryUrls.map((url, i) => (
                    <div key={'ext-' + i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                      <SmartImage src={url} alt="Galeri" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setExistingGalleryUrls(existingGalleryUrls.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                  {galleryFiles.map((f, i) => (
                    <div key={'new-' + i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                      <SmartImage src={URL.createObjectURL(f)} alt="Yeni" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex flex-col items-center justify-center py-4 cursor-pointer w-full gap-2">
                <UploadCloud className="w-6 h-6 text-muted" />
                <span className="text-xs font-bold text-primary">Galeriye Fotoğraf Ekle (PNG, JPG, HEIC)</span>
                <input type="file" accept="image/jpeg, image/png, image/webp, image/*, .heic, .heif" multiple className="hidden" onChange={handleGallerySelect} />
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-default">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

      <ImageCropperModal
        isOpen={cropperOpen}
        imageSrc={cropperSrc}
        aspectRatio={cropperAspect}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />

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
