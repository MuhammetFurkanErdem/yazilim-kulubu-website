import { motion } from 'motion/react';
import { ArrowRight, Github, ExternalLink, User } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';

export function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Optional: close modal automatically after a delay
      // setTimeout(() => { setIsModalOpen(false); setIsSubmitted(false); }, 3000);
    }, 1500);
  };
  const featuredProject = {
    name: 'YGK Platform',
    branch: 'web',
    desc: 'Kulüp yönetimi, etkinlik takibi ve proje showcase için geliştirilmiş tam teşekküllü web platformu.',
    tech: ['Next.js', 'React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    team: [
      { name: 'Ahmet K.', role: 'Lead', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100' },
      { name: 'Selin E.', role: 'Backend', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
      { name: 'Mert Ç.', role: 'Frontend', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' }
    ],
    demo: '#',
    github: '#',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  };

  const clubProjects = [
    {
      name: 'Öğrenci Not Takip',
      branch: 'web',
      tech: ['React', 'Node.js', 'MongoDB'],
      team: 4,
      desc: 'Öğrencilerin notlarını takip etmelerini sağlayan web uygulaması',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    },
    {
      name: 'Kampüs Etkinlik App',
      branch: 'mobile',
      tech: ['Flutter', 'Firebase', 'Dart'],
      team: 3,
      desc: 'ÇOMÜ kampüsündeki tüm etkinlikleri tek yerden takip et',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    },
    {
      name: 'Yemek Tahmin Modeli',
      branch: 'blockchain',
      tech: ['Python', 'TensorFlow', 'FastAPI'],
      team: 2,
      desc: 'Kafeterya menüsünü tahmin eden AI modeli',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    },
    {
      name: 'Çanakkale Chronicles',
      branch: 'game',
      tech: ['Unity', 'C#', 'Blender'],
      team: 5,
      desc: 'Çanakkale Savaşı\'nı anlatan eğitici oyun',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    },
    {
      name: 'YGK Token & DAO',
      branch: 'blockchain',
      tech: ['Solidity', 'Hardhat', 'React'],
      team: 3,
      desc: 'Kulüp yönetimi için blockchain tabanlı oylama sistemi',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    },
    {
      name: 'Ders Programı Viewer',
      branch: 'web',
      tech: ['Next.js', 'Prisma', 'tRPC'],
      team: 2,
      desc: 'Ders programlarını görselleştiren uygulama',
      githubUrl: 'https://github.com/ygk-comu',
      demoUrl: '#'
    }
  ];

  const memberProjects = [
    {
      name: 'Portfolio Builder',
      author: { name: 'Deniz Yıldız', dept: 'Bilgisayar Müh.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100' },
      tech: ['React', 'Vite', 'Three.js'],
      desc: 'Geliştiriciler için 3D animasyonlu portfolio sitesi oluşturucu.'
    },
    {
      name: 'Study Buddy',
      author: { name: 'Ece Kara', dept: 'Yazılım Müh.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100' },
      tech: ['React Native', 'Firebase'],
      desc: 'Ders çalışma grupları oluşturma ve takip uygulaması.'
    },
    {
      name: 'Crypto Tracker',
      author: { name: 'Kerem Arslan', dept: 'Bilgisayar Müh.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
      tech: ['Vue.js', 'Chart.js'],
      desc: 'Kripto para takibi ve detaylı pazar analiz platformu.'
    },
    {
      name: 'Recipe AI',
      author: { name: 'Büşra Yılmaz', dept: 'Yazılım Müh.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
      tech: ['Python', 'OpenAI', 'FastAPI'],
      desc: 'Eldeki malzemelerden akıllı yemek tarifi öneren AI asistanı.'
    }
  ];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Featured Project */}
      <section className="pt-28 pb-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
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
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">{featuredProject.name}</h2>
              <p className="text-xl text-muted leading-relaxed font-medium mb-8">
                {featuredProject.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {featuredProject.tech.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-surface border border-default rounded-full text-sm font-bold text-primary shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mb-10 bg-surface border border-default rounded-2xl p-6 shadow-sm">
                <div className="text-xs text-muted font-bold tracking-widest uppercase mb-4">Geliştirici Ekip</div>
                <div className="flex flex-wrap items-center gap-6">
                  {featuredProject.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-default filter grayscale dark:contrast-150" />
                      <div>
                        <div className="text-sm font-bold text-primary">{member.name}</div>
                        <div className="text-xs text-muted font-medium">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 rounded-xl shadow-dynamic font-bold">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Canlı Demo
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-surface hover:bg-elevated border-default">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub Reposu
                </Button>
              </div>
            </div>

            {/* Right - Realistic Mockup Image */}
            <div className="col-span-1 lg:col-span-6 relative">
              <div className="relative rounded-dynamic overflow-hidden border border-default shadow-dynamic aspect-video bg-surface">
                <img
                  src={featuredProject.image}
                  alt="YGK Platform Mockup"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/20 to-transparent mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[80px] opacity-20 -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Club Projects Grid */}
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kulüp Projeleri</h2>
            <p className="text-xl text-muted font-medium">Kulüp bünyesindeki farklı alan kollarımızın aktif geliştirdiği ürünler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic overflow-hidden card-interactive shadow-sm group flex flex-col"
              >
                {/* Visual Preview Placeholder */}
                <div className="h-40 bg-page border-b border-default flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[var(--brand-primary)]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')" }}></div>
                  <div className="text-7xl font-black text-muted opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">{project.name.substring(0, 3)}</div>
                  <Badge variant={project.branch as any} className="absolute top-4 left-4 shadow-sm font-bold uppercase">{project.branch}</Badge>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                  <p className="text-sm font-medium text-muted mb-6 flex-1">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-page border border-default text-primary text-xs font-bold rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-default mt-auto">
                    <div className="flex items-center -space-x-2">
                      {Array.from({ length: project.team }).map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-page border-2 border-elevated flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-muted" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-surface border-2 border-elevated flex items-center justify-center text-[10px] font-bold text-primary">
                        +{project.team}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-page border border-default hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-muted transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                        <Github className="w-3.5 h-3.5" />
                        Kaynak Kod
                      </a>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-text)] hover:opacity-90 transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Projects */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16 items-center">
            {/* Left */}
            <div className="col-span-1 lg:col-span-7">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Üye Projeleri</h2>
              <p className="text-xl text-muted leading-relaxed mb-8 font-medium">
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
                  24
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memberProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface border border-default rounded-dynamic p-8 card-interactive shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant="member" className="shadow-sm font-bold bg-elevated border-default text-primary">
                      <User className="w-3.5 h-3.5 mr-1" />
                      Üye Projesi
                    </Badge>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href="https://github.com/ygk-comu" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-page border border-default hover:border-[var(--brand-primary)] text-muted hover:text-[var(--brand-primary)] transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                        <Github className="w-3.5 h-3.5" />
                        Kaynak Kod
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-[var(--brand-primary)] text-[var(--brand-text)] hover:opacity-90 transition-all flex items-center gap-2 text-xs font-bold shadow-sm">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--brand-primary)] transition-colors">{project.name}</h3>
                  <p className="text-base font-medium text-muted mb-6">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(tech => (
                      <Badge key={tech} variant="neutral" className="bg-page border-default text-muted font-bold text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-default">
                  <img src={project.author.image} alt={project.author.name} className="w-12 h-12 rounded-full border-2 border-default object-cover filter grayscale dark:contrast-150" />
                  <div>
                    <div className="text-base font-bold text-primary">{project.author.name}</div>
                    <div className="text-sm font-medium text-muted">{project.author.dept}</div>
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
                <input type="text" placeholder="Örn: Ali Yılmaz" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">Bölüm / Sınıf</label>
                <input type="text" placeholder="Örn: Bilgisayar Müh. 2. Sınıf" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Projenin Adı</label>
              <input type="text" placeholder="Örn: Kampüs Yemekhane Botu" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Kullanılan Teknolojiler</label>
              <input type="text" placeholder="Örn: Python, Telegram API, PostgreSQL (virgülle ayırın)" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">GitHub Linki</label>
                <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-primary">Canlı Demo (Varsa)</label>
                <input type="url" placeholder="https://..." className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary">Proje Hakkında Kısa Bilgi</label>
              <textarea rows={4} placeholder="Projen ne işe yarıyor? Neden geliştirdin?" className="w-full px-4 py-3 bg-page border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)] resize-none" required></textarea>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full rounded-xl py-3.5 font-bold shadow-dynamic">
                {isSubmitting ? 'Gönderiliyor...' : (
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
