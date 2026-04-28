import { motion } from 'motion/react';
import { ArrowRight, Rocket, Brain, Zap, Globe, Users, Trophy, Github, Linkedin, Instagram, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useState, useEffect } from 'react';

export function Home() {
  const [animatedText, setAnimatedText] = useState('');
  const words = ['işbirliği yap,', 'öğren,', 'inşa et,'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const word = words[wordIndex];
    let i = 0;
    const interval = setInterval(() => {
      if (i <= word.length) {
        setAnimatedText(word.slice(0, i));
        i++;
      } else {
        setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 1500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [wordIndex]);
  return (
    <div className="min-h-screen">
      {/* Centered Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-page transition-colors duration-300 text-center px-8 pt-20">
        {/* Subtle dot pattern background for depth */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjYWFhIiBmaWxsLW9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+')", maskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)' }} />

        <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8"
          >
            Kod yaz, <span className="text-[var(--brand-primary)]">{animatedText}</span><br />
            değişim yarat.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted mb-12 max-w-[650px] leading-relaxed font-medium"
          >
            Projeler inşa et, arkadaşlıklar kur ve geleceği bizimle kodla. ÇOMÜ'nün en büyük geliştirici topluluğuna bugün katıl!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          >
            <Button asLink href="/katil" variant="primary" size="lg" className="rounded-dynamic shadow-dynamic px-10 h-14 text-lg w-full sm:w-auto font-bold">
              Bize Katıl
            </Button>
            <Button variant="secondary" size="lg" className="rounded-dynamic px-10 h-14 text-lg border-default w-full sm:w-auto font-bold bg-surface hover:bg-elevated transition-colors">
              İletişime Geç
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-6 text-muted font-medium"
          >
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#0A66C2] transition-colors flex items-center gap-2"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#E1306C] transition-colors flex items-center gap-2"><Instagram className="w-5 h-5" /></a>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-b border-default bg-surface py-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 divide-x-0 md:divide-x divide-default text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center justify-center space-y-3">
              <div className="text-5xl md:text-6xl font-black text-primary font-mono tracking-tighter">800+</div>
              <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">Aktif Üye</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center justify-center space-y-3">
              <div className="text-5xl md:text-6xl font-black text-primary font-mono tracking-tighter">10+</div>
              <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">Tamamlanan Proje</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center justify-center space-y-3">
              <div className="text-5xl md:text-6xl font-black text-primary font-mono tracking-tighter">4</div>
              <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">Ana Komite</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center space-y-3">
              <div className="text-5xl md:text-6xl font-black text-primary font-mono tracking-tighter">5+</div>
              <div className="text-xs md:text-sm font-bold text-muted uppercase tracking-widest">Büyük Etkinlik</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-24 px-8 lg:px-20 bg-page transition-colors duration-300 border-b border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sadece kod değil, deneyim kazanıyorsun.</h2>
            <p className="text-lg text-muted">Gerçek projeler, gerçek insanlar, gerçek fırsatlar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'Gerçek Projeler', desc: 'Üniversite dışında da kullanılan, gerçek dünya problemlerini çözen projeler geliştir.' },
              { icon: Brain, title: 'Workshop & Eğitim', desc: 'Her hafta yeni teknolojiler öğren, sektör profesyonellerinden ilham al.' },
              { icon: Zap, title: 'Hackathon Kültürü', desc: '24 saat süren yoğun kodlama maratonlarında takımınla birlikte yarış.' },
              { icon: Globe, title: 'Ağ & Bağlantı', desc: 'Aynı hedeflere sahip öğrenciler ve sektör profesyonelleriyle tanış.' },
              { icon: Users, title: 'Mentor Desteği', desc: 'Deneyimli üyeler ve mezunlardan birebir mentorluk al.' },
              { icon: Trophy, title: 'Tanınırlık', desc: 'Başarılı projelerini portföyüne ekle, iş başvurularında öne çık.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic p-8 hover:-translate-y-1 transition-transform duration-300 shadow-dynamic"
              >
                <div className="w-12 h-12 bg-surface border border-default rounded-dynamic flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-base text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-8 lg:px-20 bg-page transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">Öne Çıkan Projeler</h2>
              <p className="text-lg text-muted">Kulübümüzün son dönemde geliştirdiği uygulamalar</p>
            </div>
            <Button variant="secondary" asLink href="/projeler" className="rounded-dynamic border-default">
              Tümünü Gör <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Öğrenci Not Takip', category: 'Web Uygulaması', tech: ['React', 'Node.js'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
              { name: 'Kampüs Etkinlik App', category: 'Mobil', tech: ['Flutter', 'Firebase'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800' },
              { name: 'Çanakkale Chronicles', category: 'Oyun', tech: ['Unity', 'C#'], image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-elevated border border-default rounded-dynamic overflow-hidden shadow-dynamic flex flex-col"
              >
                {/* Real Image Placeholder instead of fake code block */}
                <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="brand" className="bg-surface/90 backdrop-blur text-primary border-default">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-surface border border-default text-muted font-mono text-xs rounded-dynamic">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-default">
                    <span className="text-sm font-medium text-muted">Takım Projesi</span>
                    <a href="#" className="text-sm font-bold text-[var(--brand-primary)] hover:text-primary flex items-center gap-1 transition-colors">
                      İncele <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-24 px-8 lg:px-20 bg-surface transition-colors duration-300 border-t border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Yönetim Ekibi</h2>
            <p className="text-lg text-muted">Kulübümüze yön veren tutkulu öğrenciler</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ahmet Kaya', role: 'Başkan', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300' },
              { name: 'Büşra Yılmaz', role: 'Başkan Yrd.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300' },
              { name: 'Mert Çelik', role: 'Genel Sekreter', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300' },
              { name: 'Selin Erdoğan', role: 'Kol Lideri', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300' }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic p-6 text-center shadow-dynamic"
              >
                {/* Real Placeholder Avatars */}
                <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-2 border-default bg-surface relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter dark:grayscale"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted font-medium mb-4">{member.role}</p>

                <div className="flex items-center justify-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-dynamic bg-surface border border-default hover:bg-page transition-colors flex items-center justify-center text-muted hover:text-primary">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-dynamic bg-surface border border-default hover:bg-page transition-colors flex items-center justify-center text-muted hover:text-[#0A66C2]">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 lg:px-20 bg-page transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-elevated border border-default rounded-dynamic p-12 lg:p-20 text-center shadow-dynamic relative overflow-hidden">
            {/* Subtle decor for CTA */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--brand-primary)]" />

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Bir sonraki projen<br />burada başlıyor.</h2>
            <p className="text-lg text-muted mb-10 max-w-[600px] mx-auto">
              Kulübe katıl, takımını kur ve ÇOMÜ'deki en büyük yazılım topluluğunun bir parçası ol.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asLink href="/katil" variant="primary" size="lg" className="rounded-dynamic px-8">
                Üyelik Başvurusu <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" className="rounded-dynamic px-8 border-default">
                WhatsApp'a Katıl
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
