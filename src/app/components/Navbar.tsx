import { Link, useLocation } from 'react-router';
import { Button } from './Button';
import { Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Ekibimiz', path: '/ekibimiz' },
    { name: 'Etkinlikler', path: '/etkinlikler' },
    { name: 'Projeler', path: '/projeler' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'h-20 bg-page/90 backdrop-blur-lg border-b border-default shadow-sm' 
        : 'h-28 bg-transparent border-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
            <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">Yazılım Geliştirme Kulübü</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium transition-colors hover:-translate-y-[1px] ${location.pathname === link.path
                  ? 'text-[var(--brand-primary)]'
                  : 'text-muted hover:text-primary'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-surface text-muted hover:text-primary transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Button asLink href="/katil" variant="primary" className="rounded-dynamic px-6 font-bold shadow-dynamic hidden sm:flex">
            Üye Ol
          </Button>
        </div>
      </div>
    </nav>
  );
}
