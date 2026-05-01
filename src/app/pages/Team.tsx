import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Globe, Smartphone, Gamepad2, Link2, ArrowRight, Instagram } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export function Team() {
  const groupedTeam = [
    [
      {
        name: 'Ahmet Kaya',
        role: 'Yönetim Kurulu Başkanı',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Büşra Yılmaz',
        role: 'Yönetim Kurulu Başkan Yardımcısı',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
      }
    ],
    [
      {
        name: 'Mert Çelik',
        role: 'Genel Sekreter',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Selin Erdoğan',
        role: 'Reklam ve Tanıtım Koordinatörü',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Ozan Efe Akpınar',
        role: 'Etkinlik Koordinatörü',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600'
      }
    ],
    [
      {
        name: 'Deniz Yıldız',
        role: 'Oyun Kolu Lideri',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600'
      },
      {
        name: 'Ece Kara',
        role: 'Web Kolu Lideri',
        linkedin: '#',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'
      }
    ]
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

          <div className="flex flex-col gap-12 sm:gap-16">
            {groupedTeam.map((group, groupIdx) => (
              <div key={groupIdx} className="flex flex-wrap justify-center gap-6 sm:gap-8">
                {group.map((member, idx) => (
                  <motion.div
                    key={`${groupIdx}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-full max-w-[320px] flex flex-col bg-surface border border-default rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Photo Side */}
                    <div className="w-full aspect-[4/5] relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover filter contrast-110 dark:grayscale dark:contrast-150"
                      />
                    </div>

                    {/* Content Side */}
                    <div className="w-full p-6 flex flex-col justify-center bg-surface flex-1">
                      <h3 className="text-xl font-bold mb-1 font-mono tracking-tight text-primary">{member.name}</h3>
                      <p className="text-sm font-mono font-bold text-[var(--brand-primary)] dark:text-[#b490ff] mb-6 line-clamp-2 min-h-[40px]">{member.role}</p>

                      <div className="h-px w-full bg-default mb-6 mt-auto" />

                      <div className="flex items-center gap-5">
                        <a href={member.linkedin} className="text-muted hover:text-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-muted hover:text-primary transition-colors">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-muted hover:text-primary transition-colors">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.692h-1.92z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}