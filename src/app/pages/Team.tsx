import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Globe, Smartphone, Gamepad2, Link2, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';

export function Team() {
  const leadership = [
    {
      name: 'Ahmet Kaya',
      role: 'Başkan',
      branch: 'Web Kolu',
      year: '3. Sınıf',
      bio: 'Full-stack geliştirme ve açık kaynak projelere tutkuyla katkı sağlayan bir öğrenciyim. YGK\'yı kuran ekibin bir parçası olmaktan gurur duyuyorum.',
      funFact: '☕ Günde 5 kahve içerim ve kod yazarken lo-fi müzik dinlerim',
      github: '#',
      linkedin: '#',
      email: 'ahmet@ygk.com'
    },
    {
      name: 'Büşra Yılmaz',
      role: 'Başkan Yardımcısı',
      branch: 'AI/ML',
      year: '4. Sınıf',
      bio: 'Yapay zeka ve makine öğrenmesi alanında çalışıyorum. Özellikle doğal dil işleme ve görüntü tanıma projelerine odaklanıyorum.',
      funFact: '🎨 Boş zamanlarımda dijital illüstrasyon yapıyorum',
      github: '#',
      linkedin: '#',
      email: 'busra@ygk.com'
    },
    {
      name: 'Mert Çelik',
      role: 'Genel Sekreter',
      branch: 'Mobil Kolu',
      year: '3. Sınıf',
      bio: 'Flutter ile cross-platform mobil uygulamalar geliştiriyorum. Kullanıcı deneyimi ve performans optimizasyonu konularına özel ilgi duyuyorum.',
      funFact: '🏃 Her sabah 6\'da koşuya çıkarım ve kod yazarken ayakta dururum',
      github: '#',
      linkedin: '#',
      email: 'mert@ygk.com'
    }
  ];

  const branchLeaders = [
    {
      name: 'Selin Erdoğan',
      branch: 'Web',
      specialty: 'DevOps',
      icon: Globe,
      color: '#534AB7',
      variant: 'web'
    },
    {
      name: 'Kerem Arslan',
      branch: 'Mobil',
      specialty: 'Flutter',
      icon: Smartphone,
      color: '#1D9E75',
      variant: 'mobile'
    },
    {
      name: 'Deniz Yıldız',
      branch: 'Oyun',
      specialty: 'Unity',
      icon: Gamepad2,
      color: '#D85A30',
      variant: 'game'
    },
    {
      name: 'Ece Kara',
      branch: 'Blockchain',
      specialty: 'Solidity',
      icon: Link2,
      color: '#BA7517',
      variant: 'blockchain'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-20 grid-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#534AB7] rounded-full blur-[120px] opacity-10" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[64px] font-bold mb-6">
              Ekibimizle <span className="text-[#7F77DD]">Tanışın</span>
            </h1>
            <p className="text-lg text-[#6B7280] max-w-[720px] mx-auto leading-relaxed">
              Kulübümüzü yöneten ve büyüten tutkulu öğrencilerle tanışın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="text-[42px] font-bold mb-4">Yönetim Kurulu</h2>
            <p className="text-lg text-[#6B7280]">Kulübümüzün vizyonunu belirleyen liderler</p>
          </div>

          <div className="space-y-8">
            {leadership.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`grid grid-cols-12 gap-8 bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden hover:border-[#534AB7] transition-all duration-300 ${
                  idx === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className={`p-8 ${idx === 1 ? 'col-span-7' : 'col-span-7'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-1 w-4 bg-[#7F77DD] rounded" />
                    <span className="text-xs font-mono text-[#7F77DD] tracking-wider uppercase">{member.role}</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-3">{member.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="web">{member.branch}</Badge>
                    <span className="text-sm text-[#6B7280]">{member.year}</span>
                  </div>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="bg-[#374151] rounded-xl p-4 mb-6">
                    <p className="text-sm text-[#9CA3AF]">{member.funFact}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={member.linkedin}
                      className="flex items-center gap-2 px-4 py-2 bg-[#374151] hover:bg-[#0A66C2] text-sm rounded-full transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href={member.github}
                      className="flex items-center gap-2 px-4 py-2 bg-[#374151] hover:bg-[#6B7280] text-sm rounded-full transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#374151] hover:bg-[#534AB7] text-sm rounded-full transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      E-posta
                    </a>
                  </div>
                </div>

                {/* Photo Side */}
                <div className={`${idx === 1 ? 'col-span-5 order-first' : 'col-span-5'} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#534AB7] to-[#7F77DD]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-[#111827] flex items-center justify-center">
                      <span className="text-5xl font-bold text-[#7F77DD]">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Leaders */}
      <section className="py-24 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-[42px] font-bold mb-4">Kol Liderleri</h2>
            <p className="text-lg text-[#6B7280]">Her kolun teknik liderliğini yapan üyelerimiz</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {branchLeaders.map((leader, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-[#374151] rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300 hover:border-[#534AB7]"
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, ${leader.color}, transparent 180deg, ${leader.color})`
                    }}
                  />
                  <div className="absolute inset-1 rounded-full bg-[#111827] flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: leader.color }}>
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                <Badge variant={leader.variant as any} className="mb-3">
                  <leader.icon className="w-3 h-3" />
                  {leader.branch}
                </Badge>

                <h3 className="font-semibold mb-1">{leader.name}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{leader.specialty}</p>

                <div className="flex items-center justify-center gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#6B7280] transition-colors flex items-center justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#0A66C2] transition-colors flex items-center justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-lg bg-[#374151] hover:bg-[#534AB7] transition-colors flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-12 gap-12">
            {/* Left - Benefits */}
            <div className="col-span-5">
              <h2 className="text-[42px] font-bold mb-6">Senin kolun hangisi?</h2>
              <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                YGK'ya katıl, ilgi alanına göre bir kolda çalış ve gerçek projeler geliştir.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '🚀', text: 'Hemen projeye gir', desc: 'İlk haftadan itibaren aktif projelerde çalış' },
                  { icon: '🧠', text: 'Mentor desteği', desc: 'Deneyimli üyelerden birebir destek al' },
                  { icon: '🎟️', text: 'Tüm etkinliklere ücretsiz', desc: 'Workshop ve hackathon\'lara öncelikli katıl' },
                  { icon: '🌐', text: 'GitHub organizasyonuna giriş', desc: 'Açık kaynak projelerimize katkı sağla' }
                ].map((perk, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="text-2xl flex-shrink-0">{perk.icon}</div>
                    <div>
                      <div className="font-semibold mb-1">{perk.text}</div>
                      <div className="text-sm text-[#6B7280]">{perk.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-7"
            >
              <div className="bg-[#111827] border border-[#374151] rounded-2xl p-8 accent-line">
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ad</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors"
                        placeholder="Adınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Soyad</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors"
                        placeholder="Soyadınız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Öğrenci E-postası</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors"
                      placeholder="ornek@ogr.comu.edu.tr"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bölüm</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors"
                        placeholder="Bilgisayar Müh."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sınıf</label>
                      <select className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors">
                        <option>1. Sınıf</option>
                        <option>2. Sınıf</option>
                        <option>3. Sınıf</option>
                        <option>4. Sınıf</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Kol Seçimi</label>
                    <select className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors">
                      <option>Web Geliştirme</option>
                      <option>Mobil Geliştirme</option>
                      <option>Oyun Geliştirme</option>
                      <option>Blockchain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Kendini Tanıt</label>
                    <textarea
                      className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors resize-none"
                      rows={4}
                      placeholder="Neden YGK'ya katılmak istiyorsun? Hangi projelere ilgin var?"
                    />
                  </div>

                  <Button variant="primary" className="w-full" size="lg">
                    Başvuruyu Gönder <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}