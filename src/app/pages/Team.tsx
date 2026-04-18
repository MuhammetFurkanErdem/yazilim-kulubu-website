import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Globe, Smartphone, Gamepad2, Link2, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export function Team() {
  const leadership = [
    {
      name: 'Ahmet Kaya',
      role: 'Başkan',
      branch: 'Web Kolu',
      year: '3. Sınıf',
      bio: 'Full-stack geliştirme ve açık kaynak projelere tutkuyla katkı sağlayan bir öğrenciyim. YGK\'yı kuran ekibin bir parçası olmaktan gurur duyuyorum.',
      funFact: '☕ Günde 5 kahve içerim ve kod yazarken lo-fi müzik dinlerim',
      github: '#',
      linkedin: '#',
      email: 'ahmet@ygk.com',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Büşra Yılmaz',
      role: 'Başkan Yardımcısı',
      branch: 'AI/ML',
      year: '4. Sınıf',
      bio: 'Yapay zeka ve makine öğrenmesi alanında çalışıyorum. Özellikle doğal dil işleme ve görüntü tanıma projelerine odaklanıyorum.',
      funFact: '🎨 Boş zamanlarımda dijital illüstrasyon yapıyorum',
      github: '#',
      linkedin: '#',
      email: 'busra@ygk.com',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
    },
    {
      name: 'Mert Çelik',
      role: 'Genel Sekreter',
      branch: 'Mobil Kolu',
      year: '3. Sınıf',
      bio: 'Flutter ile cross-platform mobil uygulamalar geliştiriyorum. Kullanıcı deneyimi ve performans optimizasyonu konularına özel ilgi duyuyorum.',
      funFact: '🏃 Her sabah 6\'da koşuya çıkarım ve kod yazarken ayakta dururum',
      github: '#',
      linkedin: '#',
      email: 'mert@ygk.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const branchLeaders = [
    {
      name: 'Selin Erdoğan',
      branch: 'Web',
      specialty: 'DevOps & Backend',
      icon: Globe,
      color: 'var(--brand-primary)',
      variant: 'web',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Kerem Arslan',
      branch: 'Mobil',
      specialty: 'Flutter & Native',
      icon: Smartphone,
      color: '#10b981',
      variant: 'mobile',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Deniz Yıldız',
      branch: 'Oyun',
      specialty: 'Unity & C#',
      icon: Gamepad2,
      color: '#f59e0b',
      variant: 'game',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Ece Kara',
      branch: 'Blockchain',
      specialty: 'Smart Contracts',
      icon: Link2,
      color: '#ef4444',
      variant: 'blockchain',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 flex flex-col items-center justify-center overflow-hidden border-b border-default">
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjYWFhIiBmaWxsLW9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+')", maskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)' }} />
        
        <div className="relative z-10 max-w-[900px] mx-auto text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Ekibimizle <span className="text-[var(--brand-primary)]">Tanışın</span>
            </h1>
            <p className="text-xl text-muted max-w-[720px] mx-auto leading-relaxed font-medium">
              Kulübümüzü yöneten, vizyonu belirleyen ve her dönem yeni projelere imza atan tutkulu liderler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Yönetim Kurulu</h2>
            <p className="text-xl text-muted font-medium">Kulübümüzün vizyonunu belirleyen liderler</p>
          </div>

          <div className="space-y-12">
            {leadership.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 bg-surface border border-default rounded-dynamic overflow-hidden hover:border-[var(--brand-primary)] shadow-dynamic transition-all duration-300 ${
                  idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Photo Side */}
                <div className="w-full md:w-2/5 relative min-h-[300px]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover filter contrast-110 dark:grayscale dark:contrast-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-page/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1 w-4 bg-[var(--brand-primary)] rounded" />
                    <span className="text-xs font-mono font-bold text-[var(--brand-primary)] tracking-wider uppercase">{member.role}</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4 tracking-tight">{member.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-elevated border border-default rounded-full text-xs font-mono font-bold text-primary">
                      {member.branch}
                    </span>
                    <span className="px-3 py-1 bg-elevated border border-default rounded-full text-xs font-mono font-medium text-muted">
                      {member.year}
                    </span>
                  </div>
                  <p className="text-lg text-muted leading-relaxed font-medium mb-8">{member.bio}</p>
                  
                  <div className="bg-elevated border border-default rounded-xl p-4 mb-8">
                    <p className="text-sm font-medium text-primary italic">"{member.funFact}"</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={member.linkedin}
                      className="flex items-center gap-2 px-5 py-2.5 bg-elevated border border-default hover:border-primary text-primary font-medium text-sm rounded-full transition-all shadow-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href={member.github}
                      className="flex items-center gap-2 px-5 py-2.5 bg-elevated border border-default hover:border-primary text-primary font-medium text-sm rounded-full transition-all shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white font-medium text-sm rounded-full transition-all shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      İletişim
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Leaders */}
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kol Liderleri</h2>
            <p className="text-xl text-muted font-medium">Her kolun teknik liderliğini yapan uzman üyelerimiz</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {branchLeaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic p-8 text-center hover:-translate-y-1 transition-all duration-300 hover:border-primary shadow-dynamic group"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="absolute inset-0 w-full h-full object-cover rounded-full filter contrast-110 dark:grayscale dark:contrast-150 border-2 border-default transition-all duration-300 group-hover:border-primary"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-surface border border-default flex items-center justify-center text-primary">
                    <leader.icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="inline-block px-3 py-1 bg-surface border border-default rounded-full text-xs font-mono font-bold text-primary mb-4">
                  {leader.branch}
                </div>

                <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                <p className="text-sm font-medium text-muted mb-6">{leader.specialty}</p>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-surface border border-default hover:border-primary text-muted hover:text-primary transition-all flex items-center justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-surface border border-default hover:border-primary text-muted hover:text-primary transition-all flex items-center justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left - Benefits */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Aramıza Katıl.</h2>
              <p className="text-lg text-muted mb-10 font-medium leading-relaxed">
                YGK'ya katıl, ilgi alanına göre bir kolda çalış ve hemen bugün gerçek projeler üretmeye başla.
              </p>

              <div className="space-y-8">
                {[
                  { icon: '🚀', text: 'Hemen projeye gir', desc: 'İlk haftadan itibaren aktif projelerde çalış.' },
                  { icon: '🧠', text: 'Mentor desteği', desc: 'Deneyimli üyelerden birebir teknik destek al.' },
                  { icon: '🎟️', text: 'Tüm etkinliklere ücretsiz', desc: 'Workshop ve hackathon\'lara öncelikli katıl.' },
                  { icon: '🌐', text: 'GitHub organizasyonuna giriş', desc: 'Açık kaynak projelerimize doğrudan katkı sağla.' }
                ].map((perk, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="text-2xl flex-shrink-0 bg-surface border border-default w-12 h-12 flex items-center justify-center rounded-xl">{perk.icon}</div>
                    <div>
                      <div className="font-bold text-lg mb-1">{perk.text}</div>
                      <div className="text-muted font-medium">{perk.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-7"
            >
              <div className="bg-surface border border-default shadow-dynamic rounded-dynamic p-8 md:p-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Ad</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                        placeholder="Adınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Soyad</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                        placeholder="Soyadınız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Öğrenci E-postası</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="ornek@ogr.comu.edu.tr"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Bölüm</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                        placeholder="Bilgisayar Müh."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Sınıf</label>
                      <select className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium text-primary">
                        <option>1. Sınıf</option>
                        <option>2. Sınıf</option>
                        <option>3. Sınıf</option>
                        <option>4. Sınıf</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Kol Seçimi</label>
                    <select className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium text-primary">
                      <option>Web Geliştirme</option>
                      <option>Mobil Geliştirme</option>
                      <option>Oyun Geliştirme</option>
                      <option>Siber Güvenlik</option>
                      <option>Yapay Zeka (AI/ML)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Kendini Tanıt</label>
                    <textarea
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 resize-none"
                      rows={4}
                      placeholder="Neden YGK'ya katılmak istiyorsun? Hangi projelere ilgin var?"
                    />
                  </div>

                  <Button variant="primary" className="w-full rounded-xl py-4 font-bold shadow-dynamic" size="lg">
                    Başvuruyu Gönder <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}