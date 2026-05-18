import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useState, useEffect } from 'react';

interface BranchData {
  name: string;
  image: string;
  cmd: string;
  descLines: string[];
  tech: string[];
  color: string;
  colorBg: string;
  darkInvert?: boolean;
}

const branchesData: BranchData[] = [
  {
    name: 'Web Geliştirme',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    cmd: '$ kollar --info --web',
    descLines: [
      '> Kol : Web Geliştirme',
      '> Frontend ve Backend mimarileri tasarlıyoruz.',
      '> Gerçek ürünler geliştirip canlıya alıyoruz.'
    ],
    tech: ['React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL'],
    color: '#7F77DD',
    colorBg: 'rgba(127,119,221,0.13)',
  },
  {
    name: 'Mobil Geliştirme',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    cmd: '$ kollar --info --mobile',
    descLines: [
      '> Kol : Mobil Geliştirme',
      '> iOS ve Android cross-platform uygulamalar.',
      '> Uygulama marketlerinde yer alacak projeler üretiyoruz.'
    ],
    tech: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase'],
    color: '#1D9E75',
    colorBg: 'rgba(29,158,117,0.13)',
  },
  {
    name: 'Oyun Geliştirme',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    cmd: '$ kollar --info --game',
    descLines: [
      '> Kol : Oyun Geliştirme',
      '> 2D ve 3D dünyalar inşa ediyoruz.',
      '> Game Jam maratonlarında çalışan prototipler üretiyoruz.'
    ],
    tech: ['Unity', 'C#', 'Blender', 'Unreal Engine', 'C++'],
    color: '#D85A30',
    colorBg: 'rgba(216,90,48,0.13)',
    darkInvert: true,
  },
  {
    name: 'Blockchain',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg',
    cmd: '$ kollar --info --chain',
    descLines: [
      '> Kol : Blockchain',
      '> Akıllı sözleşmeler, DeFi, DAO yapıları.',
      '> Merkeziyetsiz sistemler inşa ediyoruz.'
    ],
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat'],
    color: '#BA7517',
    colorBg: 'rgba(186,117,23,0.13)',
    darkInvert: true,
  },
];

function TypewriterText({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
}

function TerminalInner({ branch }: { branch: BranchData }) {
  const [linesRevealed, setLinesRevealed] = useState(0);

  return (
    <>
      {/* Command Line */}
      <div className="mb-6 text-slate-500 dark:text-slate-400">
        <span className="text-[var(--brand-primary)] font-bold mr-2">$</span>
        <TypewriterText text={branch.cmd} delay={0} onComplete={() => setLinesRevealed(1)} />
      </div>

      {/* Description Lines */}
      <div className="space-y-3 mb-8 min-h-[90px]">
        {branch.descLines.map((line, idx) => (
          <div key={idx} className="text-slate-700 dark:text-slate-300 font-medium tracking-wide">
            {linesRevealed > idx && (
              <TypewriterText
                text={line}
                delay={100}
                onComplete={() => setLinesRevealed(prev => Math.max(prev, idx + 2))}
              />
            )}
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: linesRevealed > branch.descLines.length ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {branch.tech.map(tech => (
          <span
            key={tech}
            className="px-3 py-1.5 text-xs font-mono border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </>
  );
}

function TerminalContent({ branch }: { branch: BranchData }) {
  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#0D1117] rounded-xl border border-slate-300 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#E2E8F0] dark:bg-[#161b22] border-b border-slate-300 dark:border-slate-800 transition-colors duration-300">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 dark:border-transparent"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 dark:border-transparent"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 dark:border-transparent"></div>
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-widest uppercase transition-opacity duration-300">
          {branch.name}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm text-left flex-1 transition-colors duration-300">
        <TerminalInner key={branch.name} branch={branch} />
      </div>
    </div>
  );
}

function OrbitalBranches({ branches }: { branches: BranchData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const RADIUS = 148;
  const CENTER = 180;
  const ORBIT_SIZE = CENTER * 2;

  const getPos = (idx: number) => {
    const step = 360 / branches.length;
    const offset = -activeIndex * step;
    const deg = idx * step + offset - 90;
    const rad = (deg * Math.PI) / 180;
    return {
      x: CENTER + Math.cos(rad) * RADIUS,
      y: CENTER + Math.sin(rad) * RADIUS,
    };
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

      {/* Orbital diagram */}
      <div className="relative flex-shrink-0" style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}>
        {/* Outer decorative ring */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}
        >
          {/* Subtle orbit path */}
          <circle
            cx={CENTER} cy={CENTER} r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-default opacity-20"
          />
        </svg>

        {/* Orbital nodes */}
        {branches.map((branch, idx) => {
          const pos = getPos(idx);
          const isActive = idx === activeIndex;
          const isHovered = hoveredIndex === idx;

          return (
            <motion.button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="absolute flex items-center justify-center rounded-full cursor-pointer focus:outline-none group"
              style={{
                width: 64,
                height: 64,
                top: 0,
                left: 0,
              }}
              animate={{
                x: pos.x - 32,
                y: pos.y - 32,
                scale: isActive ? 1 : isHovered ? 0.95 : 0.82,
                zIndex: isActive ? 10 : 1,
              }}
              transition={{ type: 'spring', stiffness: 55, damping: 15 }}
              aria-label={branch.name}
            >

              {/* Node background */}
              <motion.div
                className="absolute inset-0 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-page)',
                  borderColor: isActive ? branch.color : 'var(--tw-border-color)',
                  borderWidth: isActive ? 1.5 : 1,
                  opacity: 1,
                }}
              />

              {/* Icon Image */}
              <img
                src={branch.image}
                alt={branch.name}
                className={`relative z-10 w-8 h-8 object-contain transition-all duration-300 ${isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-50'
                  } ${branch.darkInvert ? 'dark:invert' : ''}`}
              />

              {/* Branch Name Label */}
              <motion.div
                className="absolute top-[110%] px-3 py-1.5 bg-surface border border-default rounded-md shadow-sm text-[11px] font-bold tracking-wide whitespace-nowrap pointer-events-none transition-all duration-300 flex items-center gap-1.5"
                style={{
                  color: isActive ? branch.color : 'var(--tw-text-opacity)',
                  opacity: isActive || isHovered ? 1 : 0,
                  transform: isActive || isHovered ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                {branch.name}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="flex-1 min-w-0 max-w-lg w-full flex flex-col items-center">
        <TerminalContent branch={branches[activeIndex]} />
      </div>
    </div>
  );
}

export function BranchesSection() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-20 bg-surface border-y border-default">
      <div className="max-w-[960px] mx-auto">
        <div className="mb-10 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kollarımız</h2>
          <p className="mt-2 text-muted">Kol ikonlarına tıklayarak detayları görebilirsiniz.</p>
        </div>

        <OrbitalBranches branches={branchesData} />

        <div className="mt-10 sm:mt-16 flex justify-center">
          <Button asLink href="/ekibimiz" variant="secondary" className="rounded-dynamic border-default">
            Tüm Ekibi Gör <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Who We Are Section */}
      <section className="pt-28 pb-16 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 tracking-tight">Sıralarda Değil, Projelerde Büyüyoruz.</h2>
            <div className="space-y-5 text-base sm:text-lg text-muted leading-relaxed font-medium">
              <p>
                <span className="font-mono text-[var(--brand-primary)] font-bold mr-2">[misyon]</span>
                Yazılım Geliştirme Kulübü, kod yazmanın sadece dersliklerde değil,
                bir ekip ruhuyla ve gerçek projelerle öğrenileceğine inanan öğrenciler tarafından kuruldu.
                Amacımız; kendi ufak projelerinden ulusal yarışmalara kadar uzanan bu yolda,
                beraber üretecek ekip arkadaşı bulmakta zorlanan herkesi tek bir çatı altında toplamak.
              </p>
              <p>
                <span className="font-mono text-[var(--brand-primary)] font-bold mr-2">[hedef]</span>
                Bugün 800’e yakın üyemizle; Oyun Geliştirme, Web, Mobil ve Blockchain kollarında sadece teoriyi değil,
                pratiği konuşuyoruz. ÇOMÜ’nün teknik potansiyelini Game Jam’ler, Hackathon’lar ve workshoplarla
                sokağa, teknoparklara ve yarışma arenalarına taşıyoruz.
              </p>
              <p>
                <span className="font-mono text-[var(--brand-primary)] font-bold mr-2">[vizyon]</span>
                Bizler sadece öğrenmiyoruz; Çanakkale’den küresel teknoloji dünyasına
                uzanacak bir topluluğun temellerini beraber atıyoruz.
              </p>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative aspect-[4/3] rounded-dynamic overflow-hidden border border-default shadow-dynamic bg-surface">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="Ekip çalışması"
                className="w-full h-full object-cover filter contrast-110 transition-all duration-500 group-hover:scale-105 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-xl drop-shadow-md">Takım Çalışması</div>
                  <div className="text-white/80 text-sm font-medium drop-shadow-md">Hackathon 2023 - 1.lik Ödülü</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BranchesSection />
    </div>
  );
}