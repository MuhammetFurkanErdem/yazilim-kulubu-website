import { Link } from 'react-router';
import { Code2, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#374151]">
      <div className="max-w-[1280px] mx-auto px-20 py-16">
        <div className="grid grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#534AB7] rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">YGK</span>
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Çanakkale Onsekiz Mart Üniversitesi bünyesinde gerçek projeler, gerçek deneyim.
            </p>
          </div>

          {/* Keşfet */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Keşfet</h4>
            <ul className="space-y-2">
              <li><Link to="/projeler" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Projeler</Link></li>
              <li><Link to="/etkinlikler" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Etkinlikler</Link></li>
              <li><Link to="/ekibimiz" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Ekip</Link></li>
            </ul>
          </div>

          {/* Topluluk */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Topluluk</h4>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/ygkcomu" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Discord</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          {/* Kulüp */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Kulüp</h4>
            <ul className="space-y-2">
              <li><Link to="/hakkimizda" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link to="/ekibimiz" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">Üyelik</Link></li>
              <li><Link to="/iletisim" className="text-[13px] text-[#6B7280] hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#374151] flex items-center justify-between">
          <p className="text-[13px] text-[#6B7280]">
            © 2025 Yazılım Geliştirme Kulübü · ÇOMÜ
          </p>
          <p className="font-mono text-[13px] text-[#6B7280]">
            Built with ❤️ by YGK
          </p>
        </div>
      </div>
    </footer>
  );
}
