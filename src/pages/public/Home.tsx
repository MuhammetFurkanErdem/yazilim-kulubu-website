import { motion } from 'motion/react';
import { ArrowRight, Youtube, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { supabase } from '@/api/config';
import { NetworkBackground } from '@/components/layout/NetworkBackground';

interface FeaturedProject {
  id: string;
  title: string;
  tech_stack: string[] | null;
  image_url: string | null;
  is_club_project: boolean | null;
}

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
      <div className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

export function Home() {
  const [animatedText, setAnimatedText] = useState('');
  const words = ['işbirliği yap,', 'öğren,', 'inşa et,'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [settings, setSettings] = useState({
    instagram: 'https://www.instagram.com/comuyazilimgelistirme/?hl=tr',
    youtube: 'https://www.youtube.com/@comuyazilimgelistirme',
    linkedin: 'https://www.linkedin.com/company/%C3%A7om%C3%BC-yaz%C4%B1l%C4%B1m-geli%C5%9Ftirme-kul%C3%BCb%C3%BC/'
  });
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && animatedText === currentWord) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && animatedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setAnimatedText(prev => {
        if (isDeleting) {
          return prev.slice(0, -1);
        } else {
          return currentWord.slice(0, prev.length + 1);
        }
      });
    }, isDeleting ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [animatedText, isDeleting, wordIndex]);

  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        const [{ data: settingsData, error: settingsError }, { data: projectsData, error: projectsError }] = await Promise.all([
          supabase.from('site_settings').select('*'),
          supabase
            .from('projects')
            .select('id, title, tech_stack, image_url, is_club_project')
            .order('created_at', { ascending: false })
            .limit(3)
        ]);

        if (settingsError) {
          console.error('Sosyal medya ayarları çekilemedi:', settingsError);
        } else if (settingsData) {
          const settingsMap = Object.fromEntries(settingsData.map(item => [item.key, item.value]));
          setSettings(previous => ({
            instagram: settingsMap.social_instagram || previous.instagram,
            youtube: settingsMap.social_youtube || previous.youtube,
            linkedin: settingsMap.social_linkedin || previous.linkedin
          }));
        }

        if (projectsError) {
          console.error('Öne çıkan projeler çekilemedi:', projectsError);
        } else {
          setFeaturedProjects(projectsData || []);
        }
      } catch (error) {
        console.error('Ana sayfa içerikleri çekilemedi:', error);
      }
    };

    fetchHomepageContent();
  }, []);

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          animation: cursor-blink 0.8s infinite;
        }
      `}</style>
      {/* Centered Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-page transition-colors duration-300 text-center px-4 sm:px-8 pt-20">
        <NetworkBackground />

        <div className="relative z-10 max-w-[900px] mx-auto flex flex-col items-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[3.1rem] xs:text-5xl sm:text-6xl md:text-8xl font-black leading-[1.12] tracking-tighter mb-8"
          >
            <span className="whitespace-nowrap">Kod yaz,</span><br />
            <span className="text-[var(--brand-primary)] relative inline-flex items-center whitespace-nowrap">
              {animatedText}
              <span className="inline-block w-[3px] md:w-[5px] h-[0.9em] bg-[var(--brand-primary)] ml-1 typewriter-cursor align-middle" />
            </span><br />
            <span className="whitespace-nowrap">değişim yarat.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-[22px] text-muted mb-8 sm:mb-12 max-w-[650px] leading-relaxed font-medium px-2 sm:px-0"
          >
            Projeler inşa et, arkadaşlıklar kur ve geleceği bizimle kodla. ÇOMÜ'nün en büyük geliştirici topluluğuna bugün katıl!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mb-8 sm:mb-14 w-full sm:w-auto max-w-[340px] sm:max-w-none"
          >
            <Button href="https://docs.google.com/forms/d/e/1FAIpQLSfuwWAWqtpjasdHr9SyZfBZt1LrPGmc2y80bfLXY1H-f7Hsrg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" variant="primary" size="lg" className="rounded-dynamic shadow-dynamic px-8 sm:px-10 h-12 sm:h-14 text-base sm:text-lg w-full sm:w-auto font-bold">
              Bize Katıl
            </Button>
            <Button asLink href="/iletisim" variant="secondary" size="lg" className="rounded-dynamic px-8 sm:px-10 h-12 sm:h-14 text-base sm:text-lg border-default w-full sm:w-auto font-bold bg-surface hover:bg-elevated transition-colors">
              İletişime Geç
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-6 text-muted font-medium mb-6 sm:mb-8"
          >
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="touch-target icon-interactive inline-flex items-center justify-center rounded-xl"><Instagram className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="touch-target icon-interactive inline-flex items-center justify-center rounded-xl"><Youtube className="w-5 h-5 sm:w-6 sm:h-6" /></a>
            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="touch-target icon-interactive inline-flex items-center justify-center rounded-xl"><Linkedin className="w-5 h-5 sm:w-6 sm:h-6" /></a>
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
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-elevated border border-default rounded-dynamic overflow-hidden shadow-dynamic flex flex-col card-interactive"
              >
                {/* Real Image Placeholder instead of fake code block */}
                <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                  <img
                    src={project.image_url || '/logo.png'}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    {/* Badge removed completely per user request */}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {(project.tech_stack || []).map(t => (
                      <span key={t} className="px-3 py-1 bg-surface border border-default text-muted font-mono text-xs rounded-dynamic">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-default">
                    <span className="text-sm font-medium text-muted">{project.is_club_project ? 'Kulüp Projesi' : 'Üye Projesi'}</span>
                    <Link to={`/projeler#project-${project.id}`} className="text-sm font-bold text-[var(--brand-primary)] hover:text-primary flex items-center gap-1 transition-colors">
                      İncele <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {featuredProjects.length === 0 && (
            <p className="py-8 text-center text-muted font-medium">Öne çıkan projeler yakında burada yer alacak.</p>
          )}
        </div>
      </section>


    </div>
  );
}
