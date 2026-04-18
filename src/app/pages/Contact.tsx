import { motion } from 'motion/react';
import { MapPin, Mail, MessageCircle, Clock, Instagram, Linkedin, Github, Send, ChevronDown, ArrowRight } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';

export function Contact() {
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);

  const faqs = [
    {
      id: '1',
      question: 'Kulübe katılmak için ne gerekiyor?',
      answer: 'ÇOMÜ\'de kayıtlı bir öğrenci olman yeterli! İletişim formunu doldur veya Discord sunucumuza katıl.'
    },
    {
      id: '2',
      question: 'Üyelik ücretli mi?',
      answer: 'Hayır, kulüp üyeliği tamamen ücretsizdir. Tüm etkinlikler ve workshop\'lar da ücretsizdir.'
    },
    {
      id: '3',
      question: 'Yazılım bilmeden katılabilir miyim?',
      answer: 'Evet! Temel programlama bilgisi olanlar ve öğrenmek isteyenler için workshop\'larımız var.'
    },
    {
      id: '4',
      question: 'Sponsorluk için kiminle iletişime geçmeliyim?',
      answer: 'Sponsorluk teklifleri için ygk@comu.edu.tr adresine e-posta gönderebilirsiniz.'
    },
    {
      id: '5',
      question: 'Etkinliklere üye olmadan katılabilir miyim?',
      answer: 'Bazı açık etkinliklerimize herkes katılabilir. Detaylar için etkinlikler sayfasını ziyaret edin.'
    }
  ];

  const platforms = [
    {
      name: 'Discord',
      handle: 'discord.gg/ygkcomu',
      icon: MessageCircle,
      color: '#5865F2',
      desc: 'Ana iletişim kanalımız'
    },
    {
      name: 'GitHub',
      handle: 'github.com/ygk-comu',
      icon: Github,
      color: '#6B7280',
      desc: 'Açık kaynak projelerimiz'
    },
    {
      name: 'LinkedIn',
      handle: 'linkedin.com/company/ygk',
      icon: Linkedin,
      color: '#0A66C2',
      desc: 'Profesyonel ağımız'
    },
    {
      name: 'Instagram',
      handle: '@ygk_comu',
      icon: Instagram,
      color: '#E1306C',
      desc: 'Güncel haberler ve duyurular'
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
              Bizimle <span className="text-[#7F77DD]">İletişime Geç</span>
            </h1>
            <p className="text-lg text-[#6B7280] max-w-[720px] mx-auto leading-relaxed">
              Soru, öneri, iş birliği veya sadece merhaba demek için — buradayız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div className="bg-[#111827] border border-[#374151] rounded-2xl p-6 accent-line">
              <h3 className="text-xl font-bold mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7F77DD] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-[#6B7280] mb-1">Adres</div>
                    <div className="text-sm">Terzioğlu Kampüsü<br />17100 Merkez/Çanakkale</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#7F77DD] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-[#6B7280] mb-1">E-posta</div>
                    <div className="text-sm">ygk@comu.edu.tr</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#7F77DD] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-[#6B7280] mb-1">Discord</div>
                    <div className="text-sm">discord.gg/ygkcomu</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#7F77DD] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-[#6B7280] mb-1">Yanıt Süresi</div>
                    <div className="text-sm">1-2 iş günü</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-[#374151]">
                <div className="text-sm font-medium mb-4">Sosyal Medya</div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: MessageCircle, color: '#5865F2', href: '#' },
                    { icon: Github, color: '#6B7280', href: '#' },
                    { icon: Linkedin, color: '#0A66C2', href: '#' },
                    { icon: Instagram, color: '#E1306C', href: '#' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-[#374151] hover:bg-opacity-80 transition-all flex items-center justify-center group"
                      style={{ '--hover-color': social.color } as any}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-[#374151]">
                <div className="text-sm font-medium mb-4">Hızlı Bağlantılar</div>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-white transition-colors">
                    <ArrowRight className="w-3 h-3" />
                    Üyelik Başvurusu
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-white transition-colors">
                    <ArrowRight className="w-3 h-3" />
                    Proje Gönder
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-white transition-colors">
                    <ArrowRight className="w-3 h-3" />
                    Etkinlik Kaydı
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Middle Column - Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111827] border border-[#374151] rounded-2xl p-8 accent-line"
          >
            <h3 className="text-xl font-bold mb-6">Mesaj Gönder</h3>
            
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
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Konu</label>
                <select className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors">
                  <option>Üyelik</option>
                  <option>Etkinlik</option>
                  <option>Sponsorluk</option>
                  <option>Proje İş Birliği</option>
                  <option>Medya</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mesaj</label>
                <textarea
                  className="w-full px-4 py-3 bg-[#0D0D14] border border-[#374151] rounded-lg focus:border-[#534AB7] focus:outline-none transition-colors resize-none"
                  rows={6}
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <Button variant="primary" className="w-full" size="lg">
                Mesajı Gönder <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>

          {/* Right Column - Map & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Map Card */}
            <div className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden accent-line">
              <div className="h-48 bg-gradient-to-br from-[#374151] to-[#6B7280] flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white opacity-50" />
              </div>
              <div className="p-5">
                <div className="text-sm font-medium mb-2">ÇOMÜ Terzioğlu Kampüsü</div>
                <div className="text-xs text-[#6B7280] mb-3">17100 Merkez, Çanakkale</div>
                <Button variant="secondary" size="sm" className="w-full">
                  Haritada Aç
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#111827] border border-[#374151] rounded-2xl p-6 accent-line">
              <h3 className="text-lg font-bold mb-4">Sıkça Sorulan Sorular</h3>
              
              <Accordion.Root
                type="single"
                collapsible
                value={openFaq}
                onValueChange={setOpenFaq}
                className="space-y-3"
              >
                {faqs.map((faq) => (
                  <Accordion.Item
                    key={faq.id}
                    value={faq.id}
                    className="border border-[#374151] rounded-lg overflow-hidden"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-[#374151]/30 transition-colors">
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#6B7280] transition-transform ${
                            openFaq === faq.id ? 'rotate-180' : ''
                          }`}
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-4 pb-4 text-sm text-[#6B7280] leading-relaxed">
                      {faq.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-24 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-[42px] font-bold mb-4">Platformlarımız</h2>
            <p className="text-lg text-[#6B7280]">Bizi takip edin ve topluluğumuzun bir parçası olun</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {platforms.map((platform, idx) => (
              <motion.a
                key={idx}
                href={`https://${platform.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#111827] border border-[#374151] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:border-[#534AB7]"
                style={{ '--platform-color': platform.color } as any}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = platform.color;
                  e.currentTarget.style.boxShadow = `0 0 30px ${platform.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#374151] flex items-center justify-center mb-4 group-hover:bg-opacity-50 transition-colors">
                  <platform.icon className="w-6 h-6" style={{ color: platform.color }} />
                </div>
                <h3 className="font-semibold mb-1">{platform.name}</h3>
                <p className="text-xs text-[#6B7280] mb-2">{platform.desc}</p>
                <div className="text-xs font-mono text-[#7F77DD]">{platform.handle}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}