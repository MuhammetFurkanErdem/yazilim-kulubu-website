import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Gamepad2, Target, MousePointerClick } from 'lucide-react';
import { Button } from '../components/Button';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BranchData {
  name: string;
  icon: LucideIcon;
  desc: string;
  tech: string[];
  color: string;
  colorBg: string;
}

const branchesData: BranchData[] = [
  {
    name: 'Web Geliştirme',
    icon: Globe,
    color: '#7F77DD',
    colorBg: 'rgba(127,119,221,0.13)',
    desc: 'Kendi projelerimizi geliştirmekten kulüp web sitemizi inşa etmeye kadar, web dünyasının mutfağındayız. Backend\'den frontend\'e, veritabanı tasarımından canlıya alma süreçlerine kadar gerçek bir ürün geliştirme deneyimi yaşıyoruz.',
    tech: ['React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    name: 'Mobil Geliştirme',
    icon: Smartphone,
    color: '#1D9E75',
    colorBg: 'rgba(29,158,117,0.13)',
    desc: 'Bireysel uygulama geliştirmeden ekip ruhuna geçiş yapıyoruz. Uygulama marketlerinde yer alacak projeler üretmek ve mobil dünyadaki yarışmalara hazır ekipler kurmak için bir araya geliyoruz.',
    tech: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    name: 'Oyun Geliştirme',
    icon: Gamepad2,
    color: '#D85A30',
    colorBg: 'rgba(216,90,48,0.13)',
    desc: '48 saatlik Game Jam maratonlarından ulusal yarışmalara kadar her yerdeyiz. 2D ve 3D dünyalar inşa ediyor, teorik oyun motoru bilgisini kısa sürede çalışan prototiplere dönüştürüyoruz.',
    tech: ['Unity', 'C#', 'Blender', 'Unreal Engine', 'C++'],
  },
  {
    name: 'Blockchain',
    icon: Target,
    color: '#BA7517',
    colorBg: 'rgba(186,117,23,0.13)',
    desc: 'Geleceğin teknolojilerini anlamak ve Web3 ekosistemindeki fırsatları takip etmek için buradayız. Blokzinciri mimarisi ve akıllı sözleşmeler üzerine okumalar yapıyor, merkeziyetsiz çözümleri tartışıyoruz.',
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat'],
  },
];

function OrbitalBranches({ branches }: { branches: BranchData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const RADIUS = 148;
  const CENTER = 180;
  const ORBIT_SIZE = CENTER * 2;

  // Active node always sits at top (270deg). Others spread evenly from there.
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
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

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
            strokeWidth="1"
            strokeDasharray="4 8"
            className="text-default opacity-30"
          />
          {/* Connector lines from center to active node */}
          {branches.map((_, idx) => {
            const pos = getPos(idx);
            const isActive = idx === activeIndex;
            return (
              <motion.line
                key={idx}
                x1={CENTER} y1={CENTER}
                animate={{ x2: pos.x, y2: pos.y, opacity: isActive ? 0.18 : 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 16 }}
                stroke={branches[activeIndex].color}
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Center pulse */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 56,
            height: 56,
            top: CENTER - 28,
            left: CENTER - 28,
            backgroundColor: branches[activeIndex].color,
            opacity: 0.08,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0, 0.08] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full transition-colors duration-500"
          style={{
            width: 12,
            height: 12,
            top: CENTER - 6,
            left: CENTER - 6,
            backgroundColor: branches[activeIndex].color,
            opacity: 0.5,
          }}
        />

        {/* Orbital nodes */}
        {branches.map((branch, idx) => {
          const pos = getPos(idx);
          const isActive = idx === activeIndex;
          const isHovered = hoveredIndex === idx;
          const Icon = branch.icon;

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
              {/* Glow ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${branch.color}`, opacity: 0.35 }}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1.25, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}

              {/* Node background */}
              <motion.div
                className="absolute inset-0 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: isActive ? branch.colorBg : 'var(--color-surface, transparent)',
                  borderColor: isActive ? branch.color : 'var(--tw-border-color)',
                  borderWidth: isActive ? 1.5 : 1,
                  opacity: isActive ? 1 : 0.65,
                }}
              />

              {/* Icon */}
              <Icon
                className="relative z-10 transition-all duration-300"
                style={{
                  width: 22,
                  height: 22,
                  color: isActive ? branch.color : 'var(--tw-text-opacity)',
                  opacity: isActive ? 1 : 0.55,
                }}
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
      <div className="flex-1 min-w-0 max-w-md flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Active indicator dot + name */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: branches[activeIndex].color }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: branches[activeIndex].color }}
              >
                {branches[activeIndex].sub}
              </span>
            </div>

            <h3 className="text-3xl font-black tracking-tight text-primary mb-4">
              {branches[activeIndex].name}
            </h3>

            <p className="text-base text-muted leading-relaxed mb-7 max-w-sm">
              {branches[activeIndex].desc}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {branches[activeIndex].tech.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-semibold rounded-full border border-default bg-surface text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Subtle step indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {branches.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    backgroundColor: i === activeIndex ? branches[activeIndex].color : 'var(--color-border)',
                    opacity: i === activeIndex ? 1 : 0.35,
                  }}
                  aria-label={b.name}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BranchesSection() {
  return (
    <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
      <div className="max-w-[960px] mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kollarımız</h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-page border border-default rounded-full text-sm font-medium text-muted shadow-sm"
          >
            <MousePointerClick className="w-4 h-4 text-[var(--brand-primary)]" />
            <span className="opacity-90">Detayları görmek için yörüngedeki ikonlara tıklayın</span>
          </motion.div>
        </div>

        <OrbitalBranches branches={branchesData} />

        <div className="mt-16 flex justify-center">
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
      <section className="pt-28 pb-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Sıralarda Değil, Projelerde Büyüyoruz.</h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed font-medium">
              <p>
                Yazılım Geliştirme Kulübü, kod yazmanın sadece dersliklerde değil,
                bir ekip ruhuyla ve gerçek projelerle öğrenileceğine inanan öğrenciler tarafından kuruldu.
                Amacımız; kendi ufak projelerinden ulusal yarışmalara kadar uzanan bu yolda,
                beraber üretecek ekip arkadaşı bulmakta zorlanan herkesi tek bir çatı altında toplamak.
              </p>
              <p>
                Bugün 800’e yakın üyemizle; Oyun Geliştirme, Web, Mobil ve Blockchain kollarında sadece teoriyi değil,
                pratiği konuşuyoruz. ÇOMÜ’nün teknik potansiyelini Game Jam’ler, Hackathon’lar ve workshoplarla
                sokağa, teknoparklara ve yarışma arenalarına taşıyoruz.
              </p>
              <p>
                Bizler sadece öğrenmiyoruz; Çanakkale’den küresel teknoloji dünyasına
                uzanacak bir topluluğun temellerini beraber atıyoruz.              </p>
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