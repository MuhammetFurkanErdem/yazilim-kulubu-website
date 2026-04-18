import { motion } from 'motion/react';
import { ArrowRight, Globe, Smartphone, Gamepad2, Link2 } from 'lucide-react';
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-20 grid-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#534AB7] rounded-full blur-[120px] opacity-10" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[64px] font-bold mb-6">
              Kod yazan bir <span className="text-[#7F77DD]">topluluk</span> inşa ediyoruz.
            </h1>
            <p className="text-lg text-[#6B7280] max-w-[720px] mx-auto leading-relaxed">
              ÇOMÜ bünyesinde, öğrencilerin teknolojiyi sadece öğrenmekle kalmayıp gerçek ürünler ürettiği bir ortam yaratıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-7"
          >
            <div className="mb-4">
              <span className="text-sm font-mono text-[#7F77DD] tracking-wider uppercase">Biz Kimiz?</span>
            </div>
            <h2 className="text-[42px] font-bold mb-6">Üniversite kulübü değil, mini bir teknoloji şirketi.</h2>
            <div className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>
                Yazılım Geliştirme Kulübü, 2022 yılında tutkulu bir grup öğrenci tarafından kuruldu. 
                Amacımız, üniversite öğrencilerine sadece teorik bilgi değil, gerçek dünya deneyimi kazandırmak.
              </p>
              <p>
                4 farklı kol altında (Web, Mobil, Oyun, Blockchain) çalışan ekiplerimiz, 
                her dönem yeni projeler geliştiriyor, workshop'lar düzenliyor ve hackathon'lara katılıyor.
              </p>
              <p>
                120'den fazla aktif üyemiz ve 40'tan fazla tamamlanmış projemizle, 
                ÇOMÜ'nun en aktif teknoloji topluluğuyuz.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <Button variant="primary">Üye Ol</Button>
              <Button variant="secondary">Kollarımızı Keşfet</Button>
            </div>
          </motion.div>

          {/* Right - Code Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-5"
          >
            <div className="relative bg-[#08080f] border border-[#534AB7]/30 rounded-2xl p-6 accent-line">
              {/* Editor Bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#374151]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs text-[#6B7280] font-mono ml-2">kulüp.ts</span>
              </div>

              {/* Code */}
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-[#7F77DD]">const</span>{' '}
                  <span className="text-white">kulüp</span>{' '}
                  <span className="text-[#7F77DD]">=</span>{' '}
                  <span className="text-white">{'{'}</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">isim</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-[#BA7517]">"YGK · ÇOMÜ"</span>
                  <span className="text-white">,</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">kuruluş</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-[#D85A30]">2022</span>
                  <span className="text-white">,</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">üyeler</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-[#D85A30]">120</span>
                  <span className="text-white">,</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">projeler</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-[#D85A30]">40</span>
                  <span className="text-white">,</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">kollar</span>
                  <span className="text-white">: [</span>
                  <span className="text-[#BA7517]">"Web"</span>
                  <span className="text-white">,</span>{' '}
                  <span className="text-[#BA7517]">"Mobil"</span>
                  <span className="text-white">,</span>
                  {'\n          '}
                  <span className="text-[#BA7517]">"Oyun"</span>
                  <span className="text-white">,</span>{' '}
                  <span className="text-[#BA7517]">"Blockchain"</span>
                  <span className="text-white">],</span>
                  {'\n  '}
                  <span className="text-[#1D9E75]">misyon</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-[#7F77DD]">{'() =>'}</span>{' '}
                  <span className="text-white">{'{'}</span>
                  {'\n    '}
                  <span className="text-[#6B7280]">{'// Gerçek projeler, gerçek deneyim'}</span>
                  {'\n    '}
                  <span className="text-[#7F77DD]">return</span>{' '}
                  <span className="text-[#BA7517]">"değer üret"</span>
                  <span className="text-white">;</span>
                  {'\n  '}
                  <span className="text-white">{'}'}</span>
                  {'\n'}
                  <span className="text-white">{'};'}</span>
                  {'\n\n'}
                  <span className="text-white">kulüp.</span>
                  <span className="text-[#1D9E75]">üyeOl</span>
                  <span className="text-white">(</span>
                  <span className="text-[#7F77DD]">sen</span>
                  <span className="text-white">);</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: 'Aktif Üye', value: counts.members, suffix: '+' },
              { label: 'Tamamlanan Proje', value: counts.projects, suffix: '+' },
              { label: 'Yıl', value: counts.years, suffix: '' },
              { label: 'Etkinlik/Yıl', value: counts.events, suffix: '+' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-[#111827] border border-[#374151] rounded-2xl p-8 text-center accent-line"
              >
                <div className="text-5xl font-bold font-mono bg-gradient-to-r from-white to-[#7F77DD] bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-[#6B7280]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[42px] font-bold mb-4">Kollarımız</h2>
            <p className="text-lg text-[#6B7280]">Her kol kendi alanında uzmanlaşmış ekiplerden oluşur</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                name: 'Web Geliştirme',
                icon: Globe,
                color: '#534AB7',
                glow: 'glow-web',
                variant: 'web',
                tech: ['Next.js', 'React', 'Node.js', 'Supabase', 'TypeScript']
              },
              {
                name: 'Mobil Geliştirme',
                icon: Smartphone,
                color: '#1D9E75',
                glow: 'glow-mobile',
                variant: 'mobile',
                tech: ['Flutter', 'Dart', 'Firebase', 'Android', 'iOS']
              },
              {
                name: 'Oyun Geliştirme',
                icon: Gamepad2,
                color: '#D85A30',
                glow: 'glow-game',
                variant: 'game',
                tech: ['Unity', 'C#', 'Godot', 'GDScript', 'Blender']
              },
              {
                name: 'Blockchain',
                icon: Link2,
                color: '#BA7517',
                glow: 'glow-blockchain',
                variant: 'blockchain',
                tech: ['Solidity', 'Ethereum', 'Web3.js', 'Rust', 'Hardhat']
              }
            ].map((branch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-[#111827] border border-[#374151] rounded-2xl p-8 flex items-start gap-6 hover:-translate-y-1 transition-all duration-300 hover:border-[${branch.color}] ${branch.glow} accent-line`}
                style={{ '--accent-color': branch.color } as any}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${branch.color}20`, border: `1px solid ${branch.color}` }}>
                  <branch.icon className="w-8 h-8" style={{ color: branch.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">{branch.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {branch.tech.map(tech => (
                      <Badge key={tech} variant={branch.variant as any}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-12">
            {/* Left - Activities List */}
            <div className="col-span-6 space-y-6">
              <h2 className="text-[42px] font-bold mb-8">Ne Yapıyoruz?</h2>
              {[
                'Haftalık Buluşmalar',
                'Aylık Workshop\'lar',
                'Proje Dönemleri',
                'Hackathon\'lar',
                'Sektör Konuşmaları',
                'Mentörlük Programı'
              ].map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl font-mono font-bold text-[#534AB7]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg text-[#6B7280]">{activity}</span>
                </motion.div>
              ))}
            </div>

            {/* Right - Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-6"
            >
              <div className="sticky top-24 bg-[#111827] border border-[#374151] rounded-2xl p-8 accent-line">
                <div className="text-6xl text-[#534AB7] mb-4">"</div>
                <p className="text-xl text-[#6B7280] italic mb-6 leading-relaxed">
                  Burada yazdığım kod sadece ödev değil — gerçek bir ürün. 
                  Bu deneyim beni çok geliştirdi ve staj başvurularımda büyük fark yarattı.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#534AB7] to-[#7F77DD]" />
                  <div>
                    <div className="font-semibold">Ahmet Kaya</div>
                    <div className="text-sm text-[#6B7280]">Başkan · Web Kolu</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🔨', text: 'Yaparak öğren' },
                    { icon: '🤝', text: 'Birlikte büyü' },
                    { icon: '🚀', text: 'Canlıya al' },
                    { icon: '🌍', text: 'Açık kaynak' }
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <span>{value.icon}</span>
                      <span>{value.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
