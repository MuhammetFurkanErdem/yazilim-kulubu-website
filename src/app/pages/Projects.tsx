import { motion } from 'motion/react';
import { ArrowRight, Github, ExternalLink, User } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export function Projects() {
  const featuredProject = {
    name: 'YGK Platform',
    branch: 'web',
    desc: 'Kulüp yönetimi, etkinlik takibi ve proje showcase için geliştirilmiş tam teşekküllü web platformu.',
    tech: ['Next.js', 'React', 'Supabase', 'TypeScript', 'Tailwind'],
    team: [
      { name: 'Ahmet K.', role: 'Lead' },
      { name: 'Selin E.', role: 'Backend' },
      { name: 'Mert Ç.', role: 'Frontend' }
    ],
    demo: '#',
    github: '#'
  };

  const clubProjects = [
    {
      name: 'Öğrenci Not Takip',
      branch: 'web',
      tech: ['React', 'Node.js', 'MongoDB'],
      team: 4,
      desc: 'Öğrencilerin notlarını takip etmelerini sağlayan web uygulaması'
    },
    {
      name: 'Kampüs Etkinlik App',
      branch: 'mobile',
      tech: ['Flutter', 'Firebase', 'Dart'],
      team: 3,
      desc: 'ÇOMÜ kampüsündeki tüm etkinlikleri tek yerden takip et'
    },
    {
      name: 'Yemek Tahmin Modeli',
      branch: 'blockchain',
      tech: ['Python', 'TensorFlow', 'FastAPI'],
      team: 2,
      desc: 'Kafeterya menüsünü tahmin eden AI modeli'
    },
    {
      name: 'Çanakkale Chronicles',
      branch: 'game',
      tech: ['Unity', 'C#', 'Blender'],
      team: 5,
      desc: 'Çanakkale Savaşı\'nı anlatan eğitici oyun'
    },
    {
      name: 'YGK Token & DAO',
      branch: 'blockchain',
      tech: ['Solidity', 'Hardhat', 'React'],
      team: 3,
      desc: 'Kulüp yönetimi için blockchain tabanlı oylama sistemi'
    },
    {
      name: 'Ders Programı Viewer',
      branch: 'web',
      tech: ['Next.js', 'Prisma', 'tRPC'],
      team: 2,
      desc: 'Ders programlarını görselleştiren uygulama'
    }
  ];

  const memberProjects = [
    {
      name: 'Portfolio Builder',
      author: { name: 'Deniz Yıldız', dept: 'Bilgisayar Müh.' },
      tech: ['React', 'Vite', 'Three.js'],
      desc: 'Geliştiriciler için 3D animasyonlu portfolio sitesi oluşturucu'
    },
    {
      name: 'Study Buddy',
      author: { name: 'Ece Kara', dept: 'Yazılım Müh.' },
      tech: ['React Native', 'Firebase'],
      desc: 'Ders çalışma grupları oluşturma ve takip uygulaması'
    },
    {
      name: 'Crypto Tracker',
      author: { name: 'Kerem Arslan', dept: 'Bilgisayar Müh.' },
      tech: ['Vue.js', 'Chart.js'],
      desc: 'Kripto para takibi ve analiz platformu'
    },
    {
      name: 'Recipe AI',
      author: { name: 'Büşra Yılmaz', dept: 'Yazılım Müh.' },
      tech: ['Python', 'OpenAI', 'FastAPI'],
      desc: 'Malzemelerden yemek tarifi öneren AI asistanı'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-20 grid-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#534AB7] rounded-full blur-[120px] opacity-10" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[64px] font-bold mb-6">
              Kodla <span className="text-[#7F77DD]">Yarattıklarımız</span>
            </h1>
            <p className="text-lg text-[#6B7280] max-w-[720px] mx-auto leading-relaxed">
              Kulüp projeleri ve üye katkılarıyla oluşturduğumuz gerçek dünya uygulamaları.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-12 gap-12 items-center"
          >
            {/* Left - Details */}
            <div className="col-span-7">
              <div className="mb-4">
                <span className="text-sm font-mono text-[#7F77DD] tracking-wider">
                  ★ KULÜP PROJESİ · WEB KOLU
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">{featuredProject.name}</h2>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-6">
                {featuredProject.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {featuredProject.tech.map((tech) => (
                  <Badge key={tech} variant="web">{tech}</Badge>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-sm text-[#6B7280] mb-3">Ekip</div>
                <div className="flex items-center gap-4">
                  {featuredProject.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#534AB7] to-[#7F77DD]" />
                      <div>
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-[#6B7280]">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="primary">
                  <ExternalLink className="w-4 h-4" />
                  Canlı Demo
                </Button>
                <Button variant="secondary">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </div>
            </div>

            {/* Right - Code Editor */}
            <div className="col-span-5">
              <div className="relative bg-[#08080f] border border-[#534AB7]/30 rounded-2xl p-6 accent-line">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#374151]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs text-[#6B7280] font-mono ml-2">App.tsx</span>
                </div>

                <pre className="font-mono text-xs leading-relaxed">
                  <code>
                    <span className="text-[#7F77DD]">import</span>{' '}
                    <span className="text-white">{'{'}</span>{' '}
                    <span className="text-[#1D9E75]">useState</span>{' '}
                    <span className="text-white">{'}'}</span>{' '}
                    <span className="text-[#7F77DD]">from</span>{' '}
                    <span className="text-[#BA7517]">'react'</span>
                    {'\n'}
                    <span className="text-[#7F77DD]">import</span>{' '}
                    <span className="text-white">{'{'}</span>{' '}
                    <span className="text-[#1D9E75]">supabase</span>{' '}
                    <span className="text-white">{'}'}</span>{' '}
                    <span className="text-[#7F77DD]">from</span>{' '}
                    <span className="text-[#BA7517]">'./lib/supabase'</span>
                    {'\n\n'}
                    <span className="text-[#7F77DD]">export default function</span>{' '}
                    <span className="text-[#1D9E75]">App</span>
                    <span className="text-white">{'() {'}</span>
                    {'\n  '}
                    <span className="text-[#7F77DD]">const</span>{' '}
                    <span className="text-white">[</span>
                    <span className="text-white">data</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-white">setData</span>
                    <span className="text-white">]</span>{' '}
                    <span className="text-[#7F77DD]">=</span>{' '}
                    <span className="text-[#1D9E75]">useState</span>
                    <span className="text-white">([]);</span>
                    {'\n\n  '}
                    <span className="text-[#6B7280]">{'// Fetch projects'}</span>
                    {'\n  '}
                    <span className="text-[#7F77DD]">const</span>{' '}
                    <span className="text-[#1D9E75]">fetchProjects</span>{' '}
                    <span className="text-[#7F77DD]">=</span>{' '}
                    <span className="text-[#7F77DD]">async</span>{' '}
                    <span className="text-white">{'() => {'}</span>
                    {'\n    '}
                    <span className="text-[#7F77DD]">const</span>{' '}
                    <span className="text-white">{'{ data }'}</span>{' '}
                    <span className="text-[#7F77DD]">=</span>{' '}
                    <span className="text-[#7F77DD]">await</span>{' '}
                    <span className="text-white">supabase</span>
                    {'\n      '}
                    <span className="text-white">.</span>
                    <span className="text-[#1D9E75]">from</span>
                    <span className="text-white">(</span>
                    <span className="text-[#BA7517]">'projects'</span>
                    <span className="text-white">)</span>
                    {'\n      '}
                    <span className="text-white">.</span>
                    <span className="text-[#1D9E75]">select</span>
                    <span className="text-white">(</span>
                    <span className="text-[#BA7517]">'*'</span>
                    <span className="text-white">);</span>
                    {'\n  '}
                    <span className="text-white">{'};'}</span>
                    {'\n'}
                    <span className="text-white">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Club Projects Grid */}
      <section className="py-24 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="text-[42px] font-bold mb-4">Kulüp Projeleri</h2>
            <p className="text-lg text-[#6B7280]">Kollarımızın geliştirdiği topluluk projeleri</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {clubProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-[#534AB7] accent-line"
              >
                {/* Code Preview */}
                <div className="h-36 bg-gradient-to-br from-[#08080f] to-[#111827] p-4 font-mono text-xs flex items-center justify-center">
                  <div>
                    <div className="text-[#7F77DD]">function</div>
                    <div className="text-white ml-2">{project.name.split(' ')[0]}() {'{'}</div>
                    <div className="text-[#6B7280] ml-4">// {project.branch}</div>
                    <div className="text-white ml-2">{'}'}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <Badge variant={project.branch as any} className="mb-3">{project.branch}</Badge>
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-[#6B7280] mb-4">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-[#374151] text-[#9CA3AF] text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center -space-x-2">
                      {Array.from({ length: project.team }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#534AB7] to-[#7F77DD] border-2 border-[#111827]" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <a href="#" className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#6B7280] transition-colors flex items-center justify-center">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#534AB7] transition-colors flex items-center justify-center">
                        <ExternalLink className="w-4 h-4" />
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
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-12 mb-12">
            {/* Left */}
            <div className="col-span-7">
              <h2 className="text-[42px] font-bold mb-4">Üye Projeleri</h2>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-6">
                Kulüp üyelerimizin bireysel olarak geliştirdiği ve onaylanan projeler. 
                Sen de projeni gönder, inceleme sonrası sayfamızda yayınlayalım!
              </p>
              <Button variant="primary">
                Projenizi Gönderin <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Right - Stats */}
            <div className="col-span-5">
              <div className="bg-[#111827] border border-[#374151] rounded-2xl p-8 accent-line">
                <div className="text-4xl font-bold font-mono bg-gradient-to-r from-white to-[#D4537E] bg-clip-text text-transparent mb-2">
                  8
                </div>
                <div className="text-sm text-[#6B7280] mb-6">Onaylanmış Üye Projesi</div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <div className="w-1 h-1 rounded-full bg-[#D4537E]" />
                    Form üzerinden proje gönderin
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <div className="w-1 h-1 rounded-full bg-[#D4537E]" />
                    Yönetim kurulu inceler
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <div className="w-1 h-1 rounded-full bg-[#D4537E]" />
                    Onaylananlar sayfada yayınlanır
                  </div>
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <div className="w-1 h-1 rounded-full bg-[#D4537E]" />
                    Sosyal medyada paylaşılır
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 gap-6">
            {memberProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-[#D4537E]/30 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:border-[#D4537E] accent-line"
                style={{ '--accent-color': '#D4537E' } as any}
              >
                <Badge variant="member" className="mb-3">
                  <User className="w-3 h-3" />
                  Üye Projesi
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <Badge key={tech} variant="member">{tech}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#374151]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4537E] to-[#f5b7d1]" />
                    <div>
                      <div className="text-sm font-medium">{project.author.name}</div>
                      <div className="text-xs text-[#6B7280]">{project.author.dept}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="#" className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#6B7280] transition-colors flex items-center justify-center">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#D4537E] transition-colors flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
