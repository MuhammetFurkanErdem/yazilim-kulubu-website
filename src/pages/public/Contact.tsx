import { motion } from 'motion/react';
import { MapPin, Mail, Clock, Instagram, Linkedin, Youtube, Send, ChevronDown, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/api/config';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'uyelik',
    message: ''
  });

  const [settings, setSettings] = useState({
    email: 'ygk@comu.edu.tr',
    instagram: 'instagram.com/ygk_comu',
    youtube: 'youtube.com/@ygk_comu',
    linkedin: 'linkedin.com/company/ygk'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('site_settings').select('*');
        if (error) throw error;

        if (data && data.length > 0) {
          const settingsMap: any = {};
          data.forEach(item => {
            settingsMap[item.key] = item.value;
          });
          setSettings(prev => ({
            email: settingsMap['contact_email'] || prev.email,
            instagram: settingsMap['social_instagram'] || prev.instagram,
            youtube: settingsMap['social_youtube'] || prev.youtube,
            linkedin: settingsMap['social_linkedin'] || prev.linkedin
          }));
        }
      } catch (error) {
        console.error("İletişim ayarları çekilemedi:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const subjectMap: Record<string, string> = {
        'uyelik': 'Üyelik Hakkında',
        'etkinlik': 'Etkinlikler',
        'sponsorluk': 'Sponsorluk Görüşmesi',
        'proje': 'Proje İş Birliği',
        'medya': 'Medya / Basın',
        'diger': 'Diğer'
      };

      const finalMessage = `[Konu: ${subjectMap[formData.subject]}]\n\n${formData.message}`;

      const { error } = await supabase.from('applications').insert([
        {
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: finalMessage,
          type: 'contact',
          status: 'pending'
        }
      ]);

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Mesaj gönderilemedi:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const platforms = [
    {
      name: 'Instagram',
      handle: settings.instagram.replace('https://', '').replace('www.', ''),
      url: settings.instagram.startsWith('http') ? settings.instagram : `https://${settings.instagram}`,
      icon: Instagram,
      color: '#E1306C',
      desc: 'Güncel haberler ve duyurular'
    },
    {
      name: 'YouTube',
      handle: settings.youtube.replace('https://', '').replace('www.', ''),
      url: settings.youtube.startsWith('http') ? settings.youtube : `https://${settings.youtube}`,
      icon: Youtube,
      color: '#FF0000',
      desc: 'Eğitim videoları ve etkinlik kayıtları'
    },
    {
      name: 'LinkedIn',
      handle: settings.linkedin.replace('https://', '').replace('www.', ''),
      url: settings.linkedin.startsWith('http') ? settings.linkedin : `https://${settings.linkedin}`,
      icon: Linkedin,
      color: '#0A66C2',
      desc: 'Profesyonel ağımız'
    }
  ];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      <section className="pt-28 pb-16 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-3 space-y-6"
          >
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
                    <div className="text-sm font-medium text-primary">{settings.email}</div>
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

              <div className="mt-8 pt-8 border-t border-default">
                <div className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Hızlı Bağlantılar</div>
                <div className="space-y-3">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfuwWAWqtpjasdHr9SyZfBZt1LrPGmc2y80bfLXY1H-f7Hsrg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Üyelik Başvurusu
                  </a>
                  <a href="/projeler" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Proje Gönder
                  </a>
                  <a href="/etkinlikler" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-[var(--brand-primary)] transition-colors group">
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
                    <Button onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ firstName: '', lastName: '', email: '', subject: 'uyelik', message: '' });
                    }} variant="secondary" className="font-bold border-slate-300 dark:border-slate-700 px-8 font-mono">
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
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white dark:bg-[#161b22] border border-slate-300 dark:border-slate-700 rounded-lg focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-mono text-sm text-slate-800 dark:text-slate-200 shadow-sm"
                        placeholder="'ornek@email.com'"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-xs font-mono mb-2 text-slate-600 dark:text-slate-400 transition-colors group-focus-within:text-[var(--brand-primary)]">
                        <span className="text-[var(--brand-primary)] dark:text-[#b490ff]">let</span> <span className="text-[#D85A30] dark:text-[#E27756]">subject</span>: Topic;
                      </label>
                      <Select value={formData.subject} onValueChange={(val) => setFormData({ ...formData, subject: val })}>
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
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="// Mesajınızı buraya detaylıca yazın..."
                      />
                      <div className="text-slate-600 dark:text-slate-400 font-mono text-xs">{'}'}</div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} variant="primary" className="w-full rounded-lg py-4 font-bold shadow-md font-mono" size="lg">
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> await send()...</>
                      ) : (
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
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
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
                <a href="https://maps.app.goo.gl/3wJjQ8z6L8p3g1pZ8" target="_blank" rel="noreferrer" className="w-full">
                  <Button variant="secondary" size="lg" className="w-full bg-elevated border-default font-bold hover:bg-page hover:border-[var(--brand-primary)]">
                    Haritada Görüntüle
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Platformlarımız</h2>
            <p className="text-base sm:text-xl text-muted font-medium">Bizi sosyal medyadan takip edin ve büyük topluluğumuzun bir parçası olun</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <motion.a
                key={idx}
                href={platform.url}
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
                <div className="w-full max-w-full mt-auto px-4 py-2 bg-surface rounded-full text-xs font-bold font-mono tracking-wide border border-default transition-colors group-hover:border-[var(--platform-color)] group-hover:text-[var(--platform-color)] truncate">
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