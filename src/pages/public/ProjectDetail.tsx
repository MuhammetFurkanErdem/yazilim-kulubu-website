import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Loader2, Image as ImageIcon, ChevronLeft, ChevronRight, X, ZoomIn, Mail, Linkedin, Instagram, Users } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/api/config';
import { SmartImage } from '@/components/shared/SmartImage';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';

function DeveloperCard({ dev, onSelect }: { dev: any; onSelect: (dev: any) => void }) {
  const profile = dev.profiles || {};
  const roleLabel = dev.role || profile.position || 'Geliştirici';
  return (
    <button
      type="button"
      onClick={() => onSelect(dev)}
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-surface border border-default rounded-xl shadow-sm hover:border-[var(--brand-primary)] transition-colors text-left cursor-pointer card-interactive"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-page border border-default flex-shrink-0 flex items-center justify-center">
        {profile.avatar_url ? (
          <SmartImage src={profile.avatar_url} alt={`${profile.first_name || ''} ${profile.last_name || ''}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-muted opacity-50">
            {(profile.first_name?.[0] || '') + (profile.last_name?.[0] || '')}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-bold text-sm sm:text-base text-primary truncate">{profile.first_name} {profile.last_name}</div>
        <div className="text-xs sm:text-sm font-mono font-bold text-[var(--brand-primary)] truncate">{roleLabel}</div>
      </div>
    </button>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const handleNextPhoto = useCallback(() => {
    if (!project?.gallery_urls) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % project.gallery_urls.length));
  }, [project]);

  const handlePrevPhoto = useCallback(() => {
    if (!project?.gallery_urls) return;
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + project.gallery_urls.length) % project.gallery_urls.length));
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNextPhoto, handlePrevPhoto]);

  const fetchProjectDetails = async () => {
    setIsLoading(true);
    try {
      const [{ data: projectData, error: projectError }, { data: devData, error: devError }] = await Promise.all([
        supabase.from('projects').select('*').eq('id', id).single(),
        supabase.from('project_members').select('*, profiles(*)').eq('project_id', id)
      ]);
      if (projectError) throw projectError;
      setProject(projectData);
      setDevelopers(devError ? [] : (devData || []));
    } catch (error) {
      console.error("Proje detayı çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[var(--brand-primary)] bg-page">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-mono text-muted">Proje Detayları Yükleniyor...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-page">
        <h1 className="text-2xl font-bold text-primary">Proje Bulunamadı</h1>
        <Link to="/projeler" className="text-[var(--brand-primary)] hover:underline">Projelere Dön</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page pt-24 sm:pt-22">
      {/* Header */}
      <section className="relative pt-32 sm:pt-48 pb-16 sm:pb-20 border-b border-default overflow-hidden bg-surface">
        {project.image_url && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <SmartImage
              src={project.image_url}
              alt=""
              className="w-full h-full object-cover filter blur-[3px] scale-105 opacity-45 dark:opacity-35 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-page via-page/70 to-black/60" />
          </div>
        )}

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--brand-primary)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--brand-primary)]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-20">
          <Link
            to="/projeler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Projelere Dön
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--brand-primary)] text-white shadow-lg shadow-[var(--brand-primary)]/30">
              {project.is_club_project ? 'Kulüp Projesi' : 'Üye Projesi'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-primary max-w-4xl leading-tight">
            {project.title}
          </h1>

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech_stack.map((tech: string, idx: number) => (
                <span key={idx} className="px-4 py-2 bg-page/70 border border-default/60 rounded-full text-sm font-bold text-primary backdrop-blur-md">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-row items-center gap-3 w-full">
            {project.demo_url && (
              <Button
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className={`${project.github_url ? 'w-1/2' : 'w-full'} sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-xl shadow-dynamic font-bold whitespace-nowrap`}
              >
                <span className="whitespace-nowrap">Canlı Demo</span> <ExternalLink className="w-4 h-4 ml-2 shrink-0" />
              </Button>
            )}
            {project.github_url && (
              <Button
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className={`${project.demo_url ? 'w-1/2' : 'w-full'} sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-xl font-bold bg-page/70 hover:bg-page border-default/60 backdrop-blur-md whitespace-nowrap`}
              >
                <span className="whitespace-nowrap">Kaynak Kod</span> <Github className="w-4 h-4 ml-2 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Short Description */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[800px] mx-auto">
          <p className="text-lg sm:text-2xl text-primary leading-relaxed font-medium whitespace-pre-line">
            {project.description || 'Kısa açıklama bulunmuyor.'}
          </p>
        </div>
      </section>

      {/* Long Description */}
      {project.long_description && project.long_description.trim() !== '' && (
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-20 bg-surface border-t border-default">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Proje Hakkında</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-medium whitespace-pre-line">
              {project.long_description}
            </p>
          </div>
        </section>
      )}

      {/* Developers */}
      {developers.length > 0 && (
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-20 bg-page border-t border-default">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Geliştiriciler</h2>
                <p className="text-muted font-medium">Bu projeyi hayata geçiren ekip</p>
              </div>
              <div className="w-12 h-12 bg-surface border border-default rounded-full flex items-center justify-center text-[var(--brand-primary)]">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {developers.map((dev) => (
                <DeveloperCard key={dev.id} dev={dev} onSelect={setSelectedDeveloper} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {project.gallery_urls && project.gallery_urls.length > 0 && (
        <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-20 bg-surface border-t border-default">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Görseller</h2>
                <p className="text-muted font-medium">Projeden ekran görüntüleri ve fotoğraflar</p>
              </div>
              <div className="w-12 h-12 bg-page border border-default rounded-full flex items-center justify-center text-[var(--brand-primary)]">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery_urls.map((photo: string, idx: number) => (
                <motion.div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative rounded-dynamic overflow-hidden border border-default bg-page aspect-[4/3] shadow-sm hover:shadow-dynamic transition-all cursor-pointer"
                >
                  <SmartImage
                    src={photo}
                    alt={`${project.title} Görsel ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold text-sm drop-shadow-md pointer-events-none flex items-center gap-2">
                    Görseli Büyüt
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && project.gallery_urls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="w-full max-w-6xl flex items-center justify-between z-10 py-2"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-white/80 font-mono text-sm font-semibold bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                Görsel {lightboxIndex + 1} / {project.gallery_urls.length}
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                title="Kapat (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div
              className="relative w-full max-w-6xl flex-1 flex items-center justify-between my-4 px-2 sm:px-12"
              onClick={e => e.stopPropagation()}
            >
              {project.gallery_urls.length > 1 && (
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-4 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl cursor-pointer"
                  title="Önceki Görsel (← Sol Ok)"
                >
                  <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 -ml-0.5" />
                </button>
              )}

              <div className="w-full h-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
                <SmartImage
                  key={lightboxIndex}
                  src={project.gallery_urls[lightboxIndex]}
                  alt={`Görsel ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              </div>

              {project.gallery_urls.length > 1 && (
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-4 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-2xl cursor-pointer"
                  title="Sonraki Görsel (→ Sağ Ok)"
                >
                  <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 -mr-0.5" />
                </button>
              )}
            </div>

            <div
              className="text-white/50 text-xs font-mono font-medium pb-2 text-center"
              onClick={e => e.stopPropagation()}
            >
              Klavye Yön Tuşları <span className="text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/10">←</span> <span className="text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/10">→</span> veya butonlar ile gezinebilirsiniz. Kapatmak için <span className="text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/10">ESC</span> tuşuna basın.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developer Contact Modal */}
      <Modal
        isOpen={!!selectedDeveloper}
        onClose={() => setSelectedDeveloper(null)}
        title={selectedDeveloper ? `${selectedDeveloper.profiles?.first_name || ''} ${selectedDeveloper.profiles?.last_name || ''}`.trim() : ''}
      >
        {selectedDeveloper && (() => {
          const profile = selectedDeveloper.profiles || {};
          return (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface border border-default flex-shrink-0 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <SmartImage src={profile.avatar_url} alt={profile.first_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-muted opacity-50">
                      {(profile.first_name?.[0] || '') + (profile.last_name?.[0] || '')}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-mono font-bold text-[var(--brand-primary)] text-sm">{selectedDeveloper.role || profile.position || 'Geliştirici'}</p>
                  {profile.department && (
                    <p className="text-sm text-muted font-medium">{profile.department}</p>
                  )}
                </div>
              </div>

              {profile.bio && profile.bio.trim() !== '' && (
                <p className="text-sm text-primary leading-relaxed">{profile.bio}</p>
              )}

              <div className="pt-4 border-t border-default space-y-3">
                <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">İletişim</div>

                {profile.email && profile.email.trim() !== '' && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{profile.email}</span>
                  </a>
                )}
                {profile.linkedin_url && profile.linkedin_url.trim() !== '' && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{profile.linkedin_url}</span>
                  </a>
                )}
                {profile.github_url && profile.github_url.trim() !== '' && (
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{profile.github_url}</span>
                  </a>
                )}
                {profile.instagram_url && profile.instagram_url.trim() !== '' && (
                  <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{profile.instagram_url}</span>
                  </a>
                )}
                {!profile.email && !profile.linkedin_url && !profile.github_url && !profile.instagram_url && (
                  <p className="text-sm text-muted">Henüz iletişim bilgisi eklenmemiş.</p>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
