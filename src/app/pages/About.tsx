import { motion } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Gamepad2, Link2, Users, Rocket, Target, Quote, Trophy } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useState, useEffect } from 'react';

export function About() {
  const [counts, setCounts] = useState({ members: 0, projects: 0, years: 0, events: 0 });

  useEffect(() => {
    const targets = { members: 120, projects: 40, years: 3, events: 10 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts({
        members: Math.floor((targets.members / steps) * step),
        projects: Math.floor((targets.projects / steps) * step),
        years: Math.floor((targets.years / steps) * step),
        events: Math.floor((targets.events / steps) * step)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Centered Hero Section */}
      <section className="relative pt-32 pb-24 px-8 flex flex-col items-center justify-center overflow-hidden border-b border-default">
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjYWFhIiBmaWxsLW9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+')", maskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)' }} />
        
        <div className="relative z-10 max-w-[900px] mx-auto text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Kod yazan bir <span className="text-[var(--brand-primary)]">topluluk</span> <br className="hidden md:block" /> inşa ediyoruz.
            </h1>
            <p className="text-xl text-muted max-w-[720px] mx-auto leading-relaxed font-medium">
              ÇOMÜ bünyesinde, öğrencilerin teknolojiyi sadece öğrenmekle kalmayıp gerçek ürünler ürettiği ve birlikte büyüdüğü bir ortam yaratıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 px-8 bg-surface border-b border-default relative z-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Aktif Üye', value: counts.members, suffix: '+' },
              { label: 'Tamamlanan Proje', value: counts.projects, suffix: '+' },
              { label: 'Yıl Deneyim', value: counts.years, suffix: '' },
              { label: 'Büyük Etkinlik', value: counts.events, suffix: '+' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic p-6 text-center shadow-dynamic"
              >
                <div className="text-4xl md:text-5xl font-bold font-mono text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-medium uppercase tracking-wider text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Üniversite kulübü değil, mini bir teknoloji şirketi.</h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed font-medium">
              <p>
                Yazılım Geliştirme Kulübü, 2022 yılında tutkulu bir grup öğrenci tarafından kuruldu. 
                Amacımız, üniversite öğrencilerine sadece teorik bilgi değil, gerçek dünya deneyimi kazandırmak.
              </p>
              <p>
                4 farklı kol altında (Web, Mobil, Oyun, Blockchain) çalışan ekiplerimiz, 
                her dönem yeni projeler geliştiriyor, workshop'lar düzenliyor ve ulusal hackathon'lara katılıyor.
              </p>
              <p>
                Hedefimiz çok net: Girdiğin ilk günden mezuniyetine kadar gerçek değer üreten, sektöre %100 hazır bir yazılımcı olmanı sağlamak.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <Button variant="primary" size="lg" className="rounded-dynamic shadow-dynamic px-8 w-full sm:w-auto font-bold">
                Aramıza Katıl
              </Button>
              <Button variant="secondary" size="lg" className="rounded-dynamic border-default px-8 w-full sm:w-auto font-bold bg-surface hover:bg-elevated">
                Yönetim Ekibiyle Tanış
              </Button>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-dynamic overflow-hidden border border-default shadow-dynamic bg-surface">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Ekip çalışması" 
                className="w-full h-full object-cover filter contrast-110 dark:grayscale dark:contrast-150 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-xl drop-shadow-md">Takım Çalışması</div>
                  <div className="text-white/80 text-sm font-medium drop-shadow-md">Hackathon 2023 - 1.lik Ödülü</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Uzmanlık Kollarımız</h2>
            <p className="text-xl text-muted font-medium">İlgi alanına göre seç, odaklan ve en iyisi ol.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Web Geliştirme',
                desc: 'Modern web uygulamaları, frontend ve backend mimarileri.',
                icon: Globe,
                color: 'var(--brand-primary)',
                tech: ['React', 'Node.js', 'Next.js', 'TypeScript']
              },
              {
                name: 'Mobil Geliştirme',
                desc: 'Cross-platform ve native mobil uygulama geliştirme süreçleri.',
                icon: Smartphone,
                color: '#10b981',
                tech: ['Flutter', 'React Native', 'Swift', 'Kotlin']
              },
              {
                name: 'Oyun Geliştirme',
                desc: 'Oyun motorları, 3D modelleme ve oyun mekaniği tasarımı.',
                icon: Gamepad2,
                color: '#f59e0b',
                tech: ['Unity', 'C#', 'Unreal Engine', 'Blender']
              },
              {
                name: 'Siber Güvenlik',
                desc: 'Ağ güvenliği, penetrasyon testleri ve güvenli kodlama.',
                icon: Target,
                color: '#ef4444',
                tech: ['Python', 'Kali Linux', 'Burp Suite', 'Bash']
              }
            ].map((branch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-elevated border border-default rounded-dynamic p-8 hover:-translate-y-1 transition-all duration-300 shadow-dynamic group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-dynamic flex items-center justify-center flex-shrink-0 bg-surface border border-default transition-colors group-hover:border-[var(--brand-primary)]">
                    <branch.icon className="w-8 h-8 text-primary transition-colors group-hover:text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{branch.name}</h3>
                    <p className="text-muted font-medium mb-6 leading-relaxed">{branch.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {branch.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-surface border border-default rounded-full text-xs font-mono font-medium text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do & Testimonial Section */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Activities */}
          <div>
            <h2 className="text-4xl font-bold mb-10 tracking-tight">Sürekli Gelişim Ritüellerimiz</h2>
            <div className="space-y-6">
              {[
                { title: 'Haftalık Buluşmalar', desc: 'Kod okumaları, teknoloji tartışmaları ve networking.' },
                { title: 'Proje Sprintleri', desc: 'Gerçek ürünleri takım halinde 4 haftalık sprintlerle canlıya alma.' },
                { title: 'Tech Talks', desc: 'Sektör profesyonellerinden doğrudan tecrübe aktarımı.' },
                { title: 'Hackathon Kampları', desc: 'Ulusal yarışmalara özel olarak hazırlanan elit kodlama kampları.' }
              ].map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 items-start p-6 bg-surface border border-default rounded-dynamic"
                >
                  <div className="text-2xl font-mono font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 w-12 h-12 flex items-center justify-center rounded-dynamic flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{activity.title}</h4>
                    <p className="text-muted font-medium">{activity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <div className="bg-elevated border border-default rounded-dynamic p-10 shadow-dynamic relative w-full">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-default/50" />
              <p className="text-2xl font-medium italic text-primary leading-relaxed mb-10 relative z-10 pt-4">
                "Burada yazdığım kod sadece bir ödev değil, gerçek bir üründü. Bu pratik deneyim, beni sektöre tamamen hazır hale getirdi ve staj başvurularımda doğrudan fark yarattı."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150" 
                  alt="Ahmet Kaya" 
                  className="w-16 h-16 rounded-full border-2 border-default object-cover"
                />
                <div>
                  <div className="font-bold text-lg">Ahmet Kaya</div>
                  <div className="text-sm font-medium text-[var(--brand-primary)]">Eski Kulüp Başkanı, Frontend Developer</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
