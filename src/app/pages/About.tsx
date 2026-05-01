import { motion } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Gamepad2, Link2, Users, Rocket, Target, Quote, Trophy } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useState, useEffect } from 'react';

export function About() {
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kollarımız</h2>
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
                name: 'Blockchain',
                desc: 'Web3 teknolojileri, akıllı sözleşmeler ve dağıtık sistemler.',
                icon: Target,
                color: '#ef4444',
                tech: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat']
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

    </div>
  );
}
