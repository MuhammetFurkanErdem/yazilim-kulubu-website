import { Link } from 'react-router';
import { Code2, Github, Linkedin, Instagram, MessageCircle, Youtube } from 'lucide-react';

export function Footer() {
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
            <div className="text-sm font-medium text-muted flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span>Çanakkale Onsekiz Mart Üniversitesi</span>
              <span className="hidden sm:inline text-default">•</span>
              <a href="mailto:ygk@comu.edu.tr" className="hover:text-[var(--brand-primary)] transition-colors">ygk@comu.edu.tr</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="https://chat.whatsapp.com/ygk" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-page border border-default flex items-center justify-center text-muted hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all" title="WhatsApp Grubu">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/ygk_comu" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-page border border-default flex items-center justify-center text-muted hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/ygk_comu" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-page border border-default flex items-center justify-center text-muted hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/ygk" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-page border border-default flex items-center justify-center text-muted hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
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
