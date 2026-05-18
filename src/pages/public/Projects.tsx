import { motion } from 'motion/react';
import { ArrowRight, Github, ExternalLink, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useState, useEffect } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { supabase } from '@/api/config';

export function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [featuredProject, setFeaturedProject] = useState<any>(null);
  const [clubProjects, setClubProjects] = useState<any[]>([]);
  const [memberProjects, setMemberProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    department: '',
    projectName: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      
      if (data) {
        const featured = data.find(p => p.is_club_project && p.image_url);
        const club = data.filter(p => p.is_club_project && p.id !== featured?.id);
        const member = data.filter(p => !p.is_club_project);
        
        setFeaturedProject(featured);
        setClubProjects(club);
        setMemberProjects(member);
      }
    } catch (error) {
      console.error("Projeler çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const message = `
Proje Adı: ${formData.projectName}
Teknolojiler: ${formData.techStack}
GitHub: ${formData.githubUrl}
Demo: ${formData.demoUrl || 'Belirtilmemiş'}

Açıklama:
${formData.description}
      `.trim();

      const { error } = await supabase.from('applications').insert([{
        full_name: formData.fullName,
        department: formData.department,
        message: message,
        type: 'project',
        status: 'pending'
      }]);

      if (error) throw error;
      
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        department: '',
        projectName: '',
        techStack: '',
        githubUrl: '',
        demoUrl: '',
        description: ''
      });
    } catch (error: any) {
      console.error("Proje gönderilemedi:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[var(--brand-primary)] bg-page">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-mono text-muted">Projeler Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Featured Project */}
      {featuredProject && (
        <section className="pt-28 pb-16 px-4 sm:px-8 lg:px-20 bg-page">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left - Details */}
              <div className="col-span-1 lg:col-span-6">
                <div className="mb-6 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-primary)]"></span>
                  </span>
                  <span className="text-sm font-bold text-[var(--brand-primary)] tracking-widest uppercase">
                    ÖNE ÇIKAN KULÜP PROJESİ
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">{featuredProject.title}</h2>
                <p className="text-base sm:text-xl text-muted leading-relaxed font-medium mb-6 sm:mb-8">
                  {featuredProject.description}
                </p>

                {featuredProject.tech_stack && featuredProject.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {featuredProject.tech_stack.map((tech: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-surface border border-default rounded-full text-sm font-bold text-primary shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {featuredProject.demo_url && (
                    <Button href={featuredProject.demo_url} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" className="w-full sm:w-auto px-8 rounded-xl shadow-dynamic font-bold">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Canlı Demo
                    </Button>
                  )}
                  {featuredProject.github_url && (
                    <Button href={featuredProject.github_url} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-surface hover:bg-elevated border-default">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub Reposu
                    </Button>
                  )}
                </div>
              </div>

              {/* Right - Realistic Mockup Image */}
              <div className="col-span-1 lg:col-span-6 relative">
                <div className="relative rounded-dynamic overflow-hidden border border-default shadow-dynamic aspect-video bg-surface">
                  {featuredProject.image_url ? (
                    <img
                      src={featuredProject.image_url}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover filter contrast-110 transition-all duration-500 dark:grayscale dark:contrast-125 hover:grayscale-0 dark:hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted font-bold">Görsel Yok</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/20 to-transparent mix-blend-overlay"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[80px] opacity-20 -z-10" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Club Projects Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 sm:mb-16 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kulüp Projeleri</h2>
            <p className="text-base sm:text-xl text-muted font-medium">Kulüp bünyesindeki farklı alan kollarımızın aktif geliştirdiği ürünler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clubProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface border border-default rounded-dynamic p-8 card-interactive shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-widest">
                      <User className="w-3.5 h-3.5" />
                      Kulüp Projesi
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-page border border-default hover:border-[var(--brand-primary)] text-muted hover:text-[var(--brand-primary)] transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                          <Github className="w-3.5 h-3.5" />
                          Kaynak Kod
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-text)] hover:opacity-90 transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--brand-primary)] transition-colors">{project.title}</h3>
                  <p className="text-base font-medium text-muted mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech_stack && project.tech_stack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-page border border-default text-muted font-bold text-xs rounded-lg">{tech}</span>
                    ))}
                  </div>
                </div>

                {project.branch && (
                  <div className="flex items-center gap-4 pt-6 border-t border-default mt-auto">
                    <div className="text-sm font-bold text-[var(--brand-primary)] uppercase tracking-wider">Kol: {project.branch}</div>
                  </div>
                )}
              </motion.div>
            ))}
            {clubProjects.length === 0 && (
              <div className="col-span-full text-center text-muted font-medium py-12">Kulüp projesi bulunmamaktadır.</div>
            )}
          </div>
        </div>
      </section>

      {/* Member Projects */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 mb-10 sm:mb-16 items-center">
            {/* Left */}
            <div className="col-span-1 lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">Üye Projeleri</h2>
              <p className="text-base sm:text-xl text-muted leading-relaxed mb-6 sm:mb-8 font-medium">
                Sadece kulüp içinde kalmıyor, üyelerimizin bireysel başarılarını da sergiliyoruz.
                Geliştirdiğin bir proje mi var? Hemen bize gönder, inceleyip toplulukla paylaşalım!
              </p>
              <Button onClick={() => { setIsModalOpen(true); setIsSubmitted(false); }} variant="primary" size="lg" className="rounded-xl shadow-dynamic font-bold px-8">
                Projeni Gönder <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Right - Stats */}
            <div className="col-span-1 lg:col-span-5">
              <div className="bg-surface border border-default rounded-dynamic p-8 md:p-10 shadow-dynamic">
                <div className="text-6xl md:text-7xl font-black font-mono text-[var(--brand-primary)] mb-2">
                  {memberProjects.length}
                </div>
                <div className="text-lg font-bold text-primary mb-8">Yayında Olan Üye Projesi</div>

                <div className="space-y-4 text-sm font-medium">
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                    Form üzerinden projenizi kısaca tanıtın.
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                    Teknik ekip tarafından hızlıca incelenir.
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                    Onaylananlar bu prestijli sayfada yayınlanır.
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
                    Projeniz kulübün sosyal mecralarında duyurulur.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Member Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic overflow-hidden card-interactive shadow-sm group flex flex-col"
              >
                {/* Visual Preview Placeholder */}
                <div className="h-40 bg-page border-b border-default flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[var(--brand-primary)]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')" }}></div>
                  <div className="text-7xl font-black text-muted opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">{project.title ? project.title.substring(0, 3) : 'PRJ'}</div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] uppercase tracking-widest mb-3">
                    <User className="w-3.5 h-3.5" />
                    Üye Projesi
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-sm font-medium text-muted mb-6 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack && project.tech_stack.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-page border border-default text-primary text-xs font-bold rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-default mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-primary leading-none">{project.team_members || 'Geliştirici'}</span>
                        <span className="text-[10px] font-medium text-muted mt-0.5">Üye</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-page border border-default hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-muted transition-all flex items-center justify-center shadow-sm" title="Kaynak Kod">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-text)] hover:opacity-90 transition-all flex items-center justify-center shadow-sm" title="Demo">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Projeni Paylaş"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">Tebrikler, Projen Gönderildi!</h3>
            <p className="text-muted font-medium mb-8 max-w-[320px]">
              Projeni inceleyip en kısa sürede "Üye Projeleri" bölümünde sergileyeceğiz. Eline sağlık!
            </p>
            <Button onClick={() => setIsModalOpen(false)} variant="secondary" className="font-bold border-default px-8">
              Kapat
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-muted font-medium mb-2">
              Kendi geliştirdiğin, bitmiş veya devam eden projenin detaylarını aşağıya gir. Diğer üyelerimize ilham ol!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">Adın Soyadın</label>
                <input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} type="text" placeholder="Örn: Ali Yılmaz" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">Bölüm / Sınıf</label>
                <input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} type="text" placeholder="Örn: Bilgisayar Müh. 2. Sınıf" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Projenin Adı</label>
              <input value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} type="text" placeholder="Örn: Kampüs Yemekhane Botu" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Kullanılan Teknolojiler</label>
              <input value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} type="text" placeholder="Örn: Python, Telegram API, PostgreSQL (virgülle ayırın)" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">GitHub Linki</label>
                <input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} type="url" placeholder="https://github.com/..." className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">Canlı Demo (Varsa)</label>
                <input value={formData.demoUrl} onChange={e => setFormData({...formData, demoUrl: e.target.value})} type="url" placeholder="https://..." className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Proje Hakkında Kısa Bilgi</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} placeholder="Projen ne işe yarıyor? Neden geliştirdin?" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full rounded-xl py-3.5 font-bold shadow-dynamic">
                {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Gönderiliyor...</> : (
                  <>Projeyi Gönder <Send className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
