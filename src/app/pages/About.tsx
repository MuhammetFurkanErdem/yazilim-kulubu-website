import { motion } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Gamepad2, Link2, Users, Rocket, Target, Quote, Trophy, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';

interface BranchData {
  name: string;
  icon: LucideIcon;
  schedule: string;
  desc: string;
  tech: string[];
}

function BranchRow({ branch, idx }: { branch: BranchData; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <branch.icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
          <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[var(--brand-primary)] transition-colors">
            {branch.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted font-medium hidden sm:block">{branch.schedule}</span>
          <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[300px] opacity-100 pb-8' : 'max-h-0 opacity-0'
          }`}
      >
        <p className="text-muted font-medium leading-relaxed mb-5 max-w-2xl">
          {branch.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {branch.tech.map(tech => (
            <span key={tech} className="px-3 py-1 text-xs font-mono font-medium text-muted border-b border-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kollarımız</h2>
            <p className="text-lg text-muted font-medium">Her kolun kendi ekibi, kendi projeleri ve kendi yol haritası var.</p>
          </div>

          <div className="divide-y divide-default">
            {[
              {
                name: 'Web Geliştirme',
                icon: Globe,
                schedule: 'Çarşamba, 18:00',
                desc: 'Kendi projelerimizi geliştirmekten kulüp web sitemizi inşa etmeye kadar, web dünyasının mutfağındayız. Sadece kod yazmıyor; backend’den frontend’e, veritabanı tasarımından canlıya alma süreçlerine kadar gerçek bir ürün geliştirme deneyimi yaşıyoruz.',
                tech: ['React', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL']
              },
              {
                name: 'Mobil Geliştirme',
                icon: Smartphone,
                schedule: 'Perşembe, 18:00',
                desc: 'Bireysel uygulama geliştirmeden ekip ruhuna geçiş yapıyoruz. Uygulama marketlerinde yer alacak projeler üretmek ve mobil dünyadaki yarışmalara hazır ekipler kurmak için bir araya geliyoruz.',
                tech: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Firebase']
              },
              {
                name: 'Oyun Geliştirme',
                icon: Gamepad2,
                schedule: 'Cuma, 17:00',
                desc: 'Kulübümüzün en dinamik ekibiyle, 48 saatlik Game Jam maratonlarından ulusal yarışmalara kadar her yerdeyiz. 2D ve 3D dünyalar inşa ediyor, teorik oyun motoru bilgisini kısa sürede çalışan prototiplere dönüştürüyoruz.',
                tech: ['Unity', 'C#', 'Blender', 'Unreal Engine']
              },
              {
                name: 'Blockchain',
                icon: Target,
                schedule: 'Salı, 19:00',
                desc: 'Geleceğin teknolojilerini anlamak ve Web3 ekosistemindeki fırsatları takip etmek için buradayız. Blokzinciri mimarisi ve akıllı sözleşmeler üzerine okumalar yapıyor, projelerimizdeki merkeziyetsiz çözümleri tartışıyoruz.',
                tech: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat']
              }
            ].map((branch, idx) => (
              <BranchRow key={idx} branch={branch} idx={idx} />
            ))}
          </div>

          <div className="mt-12">
            <Button asLink href="/ekibimiz" variant="secondary" className="rounded-dynamic border-default">
              Tüm Ekibi Gör <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
