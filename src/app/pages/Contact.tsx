import { motion } from 'motion/react';
import { MapPin, Mail, MessageCircle, Clock, Instagram, Linkedin, Github, Send, ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';

export function Contact() {
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const faqs = [
    {
      id: '1',
      question: 'Kulübe katılmak için ne gerekiyor?',
      answer: 'ÇOMÜ\'de kayıtlı bir öğrenci olman yeterli! İletişim formunu doldur veya WhatsApp grubumuza katıl.'
    },
    {
      id: '2',
      question: 'Üyelik ücretli mi?',
      answer: 'Hayır, kulüp üyeliği tamamen ücretsizdir. Tüm etkinlikler ve workshop\'lar da aksi belirtilmedikçe ücretsizdir.'
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
      name: 'WhatsApp',
      handle: 'chat.whatsapp.com/ygk',
      icon: MessageCircle,
      color: '#25D366',
      desc: 'Ana iletişim kanalımız'
    },
    {
      name: 'GitHub',
      handle: 'github.com/ygk-comu',
      icon: Github,
      color: 'var(--text-primary)',
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
              Bizimle <span className="text-[var(--brand-primary)]">İletişime Geç</span>
            </h1>
            <p className="text-xl text-muted max-w-[720px] mx-auto leading-relaxed font-medium">
              Soru, öneri, iş birliği teklifleri veya sadece tanışmak için her zaman buradayız. Bize ulaşmaktan çekinmeyin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-3 space-y-6"
          >
            {/* Contact Card */}
            <div className="bg-surface border border-default rounded-dynamic p-8 shadow-dynamic">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">İletişim Bilgileri</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-page border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Adres</div>
                    <div className="text-sm font-medium text-primary">Terzioğlu Kampüsü<br />17100 Merkez/Çanakkale</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-page border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">E-posta</div>
                    <div className="text-sm font-medium text-primary">ygk@comu.edu.tr</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-page border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">WhatsApp</div>
                    <div className="text-sm font-medium text-primary">chat.whatsapp.com/ygk</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-page border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Yanıt Süresi</div>
                    <div className="text-sm font-medium text-primary">1-2 iş günü</div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-default">
                <div className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Hızlı Bağlantılar</div>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Üyelik Başvurusu
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Proje Gönder
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            className="col-span-1 lg:col-span-5 bg-surface border border-default rounded-dynamic p-8 md:p-10 shadow-dynamic relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--brand-primary)] rounded-full blur-[100px] opacity-10" />
            <h3 className="text-3xl font-bold mb-8 tracking-tight">Mesaj Gönder</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-3">Mesajınız Alındı!</h3>
                <p className="text-muted font-medium mb-8 max-w-[320px]">
                  Teşekkür ederiz. En kısa sürede sizinle iletişime geçeceğiz.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="secondary" className="font-bold border-default px-8">
                  Yeni Mesaj Gönder
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-primary">Ad</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-primary">Soyad</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-primary">E-posta</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-primary">Konu</label>
                  <select className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium text-primary">
                    <option>Üyelik Hakkında</option>
                    <option>Etkinlikler</option>
                    <option>Sponsorluk Görüşmesi</option>
                    <option>Proje İş Birliği</option>
                    <option>Medya / Basın</option>
                    <option>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-primary">Mesaj</label>
                  <textarea
                    className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 resize-none"
                    rows={6}
                    required
                    placeholder="Mesajınızı buraya detaylıca yazın..."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full rounded-xl py-4 font-bold shadow-dynamic" size="lg">
                  {isSubmitting ? 'Gönderiliyor...' : (
                    <>Mesajı Gönder <Send className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Column - Map & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 lg:col-span-4 space-y-6"
          >
            {/* Map Card */}
            <div className="bg-surface border border-default rounded-dynamic overflow-hidden shadow-dynamic group">
              <div className="h-48 bg-page relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                  alt="Kampüs Haritası"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 dark:grayscale dark:contrast-150 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--brand-primary)]/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                <div className="relative w-16 h-16 rounded-full bg-surface shadow-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-[var(--brand-primary)]" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-lg font-bold mb-1 text-primary">ÇOMÜ Terzioğlu Kampüsü</div>
                <div className="text-sm font-medium text-muted mb-6">17100 Merkez, Çanakkale / Türkiye</div>
                <Button variant="secondary" size="lg" className="w-full bg-elevated border-default font-bold hover:bg-page hover:border-primary">
                  Haritada Görüntüle
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-surface border border-default rounded-dynamic p-6 shadow-dynamic">
              <h3 className="text-xl font-bold mb-6 tracking-tight">Sıkça Sorulan Sorular</h3>

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
                    className="border border-default rounded-xl overflow-hidden bg-elevated data-[state=open]:border-[var(--brand-primary)] transition-colors"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-4 text-left text-sm font-bold hover:bg-page transition-colors group">
                        <span className="text-primary">{faq.question}</span>
                        <div className="w-6 h-6 rounded-full bg-page flex items-center justify-center border border-default group-hover:border-[var(--brand-primary)] transition-colors">
                          <ChevronDown
                            className={`w-4 h-4 text-muted group-hover:text-[var(--brand-primary)] transition-transform ${openFaq === faq.id ? 'rotate-180 text-[var(--brand-primary)]' : ''
                              }`}
                          />
                        </div>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-4 pb-4 pt-1 text-sm text-muted font-medium leading-relaxed bg-elevated">
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
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Platformlarımız</h2>
            <p className="text-xl text-muted font-medium">Bizi sosyal medyadan takip edin ve büyük topluluğumuzun bir parçası olun</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="group bg-elevated border border-default rounded-dynamic p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-dynamic flex flex-col items-center text-center"
                style={{ '--platform-color': platform.color } as any}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = platform.color;
                  if (document.documentElement.classList.contains('dark')) {
                    e.currentTarget.style.boxShadow = `0 10px 40px -10px ${platform.color}40`;
                  } else {
                    e.currentTarget.style.boxShadow = `0 10px 40px -10px ${platform.color}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl bg-surface border border-default flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ color: platform.color }}
                >
                  <platform.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{platform.name}</h3>
                <p className="text-sm font-medium text-muted mb-4">{platform.desc}</p>
                <div className="mt-auto px-4 py-2 bg-surface rounded-full text-xs font-bold font-mono tracking-wide border border-default transition-colors group-hover:border-[var(--platform-color)] group-hover:text-[var(--platform-color)]">
                  {platform.handle}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}