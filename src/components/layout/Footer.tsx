import { Link } from 'react-router';
import { Code2, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';

export function Footer() {
  const [settings, setSettings] = useState({
    email: 'yazilimgelistirmecomu@gmail.com',
    instagram: 'https://www.instagram.com/comuyazilimgelistirme/?hl=tr',
    youtube: 'https://www.youtube.com/@comuyazilimgelistirme',
    linkedin: 'https://www.linkedin.com/company/%C3%A7om%C3%BC-yaz%C4%B1l%C4%B1m-geli%C5%9Ftirme-kul%C3%BCb%C3%BC/'
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
        console.error("Footer ayarları çekilemedi:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-surface border-t border-default transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">

          {/* Brand & Info */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <span className="text-lg font-bold text-primary tracking-tight">Yazılım Geliştirme Kulübü</span>
            </Link>
            <div className="text-sm font-medium text-muted">
              Çanakkale Onsekiz Mart Üniversitesi
            </div>
          </div>

          {/* Contact & Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-muted hover:text-[var(--brand-primary)] transition-colors font-mono text-sm font-semibold">
              <Mail className="w-5 h-5" />
              {settings.email.split('@')[0]}
            </a>
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-[var(--brand-primary)] transition-colors font-mono text-sm font-semibold">
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
            <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-[var(--brand-primary)] transition-colors font-mono text-sm font-semibold">
              <Youtube className="w-5 h-5" />
              YouTube
            </a>
            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-[var(--brand-primary)] transition-colors font-mono text-sm font-semibold">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-default flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-muted">
            © {new Date().getFullYear()} YGK. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 text-xs font-semibold text-muted">
            <Link to="/hakkimizda" className="hover:text-[var(--brand-primary)] transition-colors">Hakkımızda</Link>
            <Link to="/etkinlikler" className="hover:text-[var(--brand-primary)] transition-colors">Etkinlikler</Link>
            <Link to="/iletisim" className="hover:text-[var(--brand-primary)] transition-colors">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
