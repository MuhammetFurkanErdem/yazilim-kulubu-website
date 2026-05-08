import { motion } from 'motion/react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '../components/Button';

export function Team() {
  const groupedTeam = [
    [
      {
        name: 'Feyzullah As',
        role: 'Yönetim Kurulu Başkanı',
        linkedin: '#',
        image: 'baskan.png'
      },
      {
        name: 'Muhammet Furkan Erdem',
        role: 'Yönetim Kurulu Başkan Yardımcısı',
        linkedin: '#',
        image: 'furkan.jpeg'
      }
    ],
    [
      {
        name: 'Emre Kürt',
        role: '',
        linkedin: '#',
        image: 'emre_kürt.jpeg'
      },
      {
        name: 'Selin Erdoğan',
        role: 'Reklam ve Tanıtım Koordinatörü',
        linkedin: '#',
        image: ''
      },
      {
        name: 'Ozan Efe Akpınar',
        role: 'Etkinlik Koordinatörü',
        linkedin: '#',
        image: ''
      }
    ],
    [
      {
        name: 'Deniz Yıldız',
        role: 'Oyun Kolu Lideri',
        linkedin: '#',
        image: ''
      },
      {
        name: 'Ece Kara',
        role: 'Web Kolu Lideri',
        linkedin: '#',
        image: ''
      }
    ]
  ];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Leadership Section */}
      <section className="pt-32 pb-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">

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
                    className="w-full max-w-[340px] flex flex-col bg-surface border border-default rounded-xl overflow-hidden shadow-sm group"
                  >
                    {/* Photo Side */}
                    <div className="w-full aspect-square relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover filter contrast-110 transition-all duration-500 group-hover:scale-105 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
                      />
                    </div>

                    {/* Content Side */}
                    <div className="w-full p-6 flex flex-col bg-surface flex-1">
                      <h3 className="text-xl font-bold mb-1 font-mono tracking-tight text-primary">{member.name}</h3>
                      <p className="text-sm font-mono font-bold text-[var(--brand-primary)] dark:text-[#b490ff] mb-5">{member.role}</p>

                      <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-5 mt-auto" />

                      <div className="flex items-center gap-5">
                        <a href={member.linkedin || '#'} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={member.instagram || '#'} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href={member.github || '#'} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                          <Github className="w-5 h-5" />
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