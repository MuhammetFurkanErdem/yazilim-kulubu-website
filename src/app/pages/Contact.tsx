import { motion } from 'motion/react';
import { MapPin, Mail, Clock, Instagram, Linkedin, Youtube, Send, ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

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
      name: 'Instagram',
      handle: '@ygk_comu',
      icon: Instagram,
      color: '#E1306C',
      desc: 'Güncel haberler ve duyurular'
    },
    {
      name: 'YouTube',
      handle: 'youtube.com/@ygk_comu',
      icon: Youtube,
      color: '#FF0000',
      desc: 'Eğitim videoları ve etkinlik kayıtları'
    },
    {
      name: 'LinkedIn',
      handle: 'linkedin.com/company/ygk',
      icon: Linkedin,
      color: '#0A66C2',
      desc: 'Profesyonel ağımız'
    }
  ];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Main Layout */}
      <section className="pt-28 pb-24 px-8 lg:px-20 bg-page">
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
            className="col-span-1 lg:col-span-5 bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl relative"
          >
            {/* IDE Header */}
            <div className="flex items-center px-4 py-3 bg-[#E2E8F0] dark:bg-[#161b22] border-b border-slate-300 dark:border-slate-800">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 dark:border-transparent"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 dark:border-transparent"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 dark:border-transparent"></div>
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">~/contact/send-message.ts</div>
            </div>

            <div className="flex relative w-full">
              {/* Line Numbers */}
              <div className="hidden sm:flex absolute inset-y-0 left-0 w-12 flex-col items-end pr-3 text-slate-400 dark:text-slate-600 font-mono text-xs pt-8 pb-8 md:pt-10 md:pb-10 bg-[#E2E8F0]/30 dark:bg-[#161b22]/30 border-r border-slate-300 dark:border-slate-800 select-none opacity-50 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="leading-8">{i + 1}</div>
                ))}
              </div>

              {/* Form Content */}
              <div className="flex-1 pl-16 pr-8 py-8 md:pl-20 md:pr-10 md:py-10 relative z-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-200 mb-3">status: 200 OK</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mb-8 max-w-[320px]">
                      // Mesajınız ulaştı. En kısa sürede döneceğiz.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="secondary" className="font-bold border-slate-300 dark:border-slate-700 px-8 font-mono">
                      reset()
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                          <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">let</span> <span className="text-[#D85A30] dark:text-[#E27756]">firstName</span>: string;
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm"
                          placeholder="'Adınız'"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                          <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">let</span> <span className="text-[#D85A30] dark:text-[#E27756]">lastName</span>: string;
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm"
                          placeholder="'Soyadınız'"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                        <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">const</span> <span className="text-[#D85A30] dark:text-[#E27756]">email</span>: EmailAddress;
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm"
                        placeholder="'ornek@email.com'"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                        <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">let</span> <span className="text-[#D85A30] dark:text-[#E27756]">subject</span>: Topic;
                      </label>
                      <Select defaultValue="uyelik">
                        <SelectTrigger className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm h-auto">
                          <SelectValue placeholder="Konu Seçin" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#161b22] border-slate-300 dark:border-slate-700 font-mono text-sm shadow-xl rounded-lg overflow-hidden">
                          <SelectItem value="uyelik" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Üyelik Hakkında</SelectItem>
                          <SelectItem value="etkinlik" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Etkinlikler</SelectItem>
                          <SelectItem value="sponsorluk" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Sponsorluk Görüşmesi</SelectItem>
                          <SelectItem value="proje" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Proje İş Birliği</SelectItem>
                          <SelectItem value="medya" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Medya / Basın</SelectItem>
                          <SelectItem value="diger" className="focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-[var(--brand-primary)] cursor-pointer py-2.5">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                        <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">async function</span> <span className="text-[#D85A30] dark:text-[#E27756]">sendMessage</span>() {'{'}
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm resize-none mb-2"
                        rows={5}
                        required
                        placeholder="// Mesajınızı buraya detaylıca yazın..."
                      />
                      <div className="text-slate-600 dark:text-slate-400 font-mono text-xs">{'}'}</div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full rounded-lg py-4 font-bold shadow-md font-mono" size="lg">
                      {isSubmitting ? 'await send()...' : (
                        <div className="flex items-center justify-center">
                          execute() <Send className="w-4 h-4 ml-2" />
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
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
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                  alt="ÇOMÜ Terzioğlu Kampüsü"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 transition-all duration-700 group-hover:scale-110 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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