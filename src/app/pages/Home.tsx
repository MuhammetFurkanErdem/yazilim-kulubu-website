import { motion } from 'motion/react';
import { ArrowRight, Rocket, Brain, Zap, Globe, Users, Trophy, Youtube, Linkedin, Instagram, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useEffect, useRef } from 'react';
import { NetworkBackground } from '../components/NetworkBackground';
import { MatrixBackground } from '../components/MatrixBackground';
import { GlowingOrbsBackground } from '../components/GlowingOrbsBackground';

function CountUp({ target, suffix, label, delay = 0 }: { target: number; suffix: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const start = performance.now();
          setTimeout(() => {
            const animate = (now: number) => {
              const elapsed = now - start - delay;
              if (elapsed < 0) { requestAnimationFrame(animate); return; }
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              setCount(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay, hasAnimated]);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="text-3xl md:text-5xl font-black text-primary tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-[10px] md:text-xs font-semibold text-muted uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

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
        <NetworkBackground />

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
            <Button href="https://docs.google.com/forms/d/e/1FAIpQLSfuwWAWqtpjasdHr9SyZfBZt1LrPGmc2y80bfLXY1H-f7Hsrg/viewform?usp=dialog" variant="primary" size="lg" className="rounded-dynamic shadow-dynamic px-10 h-14 text-lg w-full sm:w-auto font-bold">
              Bize Katıl
            </Button>
            <Button asLink href="/iletisim" variant="secondary" size="lg" className="rounded-dynamic px-10 h-14 text-lg border-default w-full sm:w-auto font-bold bg-surface hover:bg-elevated transition-colors">
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
            <a href="#" className="icon-interactive flex items-center gap-2"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="icon-interactive flex items-center gap-2"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="icon-interactive flex items-center gap-2"><Linkedin className="w-5 h-5" /></a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-default bg-surface py-14 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
            <div className="md:pr-12 md:border-r border-default flex-shrink-0 text-center md:text-left">
              <p className="text-xl md:text-2xl font-black tracking-tight leading-snug">
                Birlikte büyüyen<br className="hidden md:block" /> bir topluluk.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-around w-full">
              {[
                { target: 800, suffix: '+', label: 'Aktif Üye' },
                { target: 10, suffix: '+', label: 'Tamamlanan Proje' },
                { target: 4, suffix: '', label: 'Ana Kol' },
                { target: 5, suffix: '+', label: 'Büyük Etkinlik' },
              ].map((stat, idx) => (
                <CountUp key={idx} target={stat.target} suffix={stat.suffix} label={stat.label} delay={idx * 100} />
              ))}
            </div>
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
                className="group bg-elevated border border-default rounded-dynamic overflow-hidden shadow-dynamic flex flex-col card-interactive"
              >
                {/* Real Image Placeholder instead of fake code block */}
                <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                    {/* Badge removed completely per user request */}
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


    </div>
  );
}
