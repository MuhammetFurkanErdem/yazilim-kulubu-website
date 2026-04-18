import { Link, useLocation } from 'react-router';
import { Button } from './Button';
import { Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Ekibimiz', path: '/ekibimiz' },
    { name: 'Etkinlikler', path: '/etkinlikler' },
    { name: 'Projeler', path: '/projeler' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-page/80 backdrop-blur-lg border-b border-default transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[var(--brand-primary)] rounded-dynamic flex items-center justify-center transition-transform group-hover:scale-105">
            <Code2 className="w-6 h-6 text-[var(--brand-text)]" />
          </div>
          <span className="text-lg font-bold text-primary tracking-tight">Yazılım Geliştirme Kulübü</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:-translate-y-[1px] ${location.pathname === link.path
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
          <Button variant="primary" className="rounded-dynamic px-6 font-bold shadow-dynamic hidden sm:flex">
            Üye Ol
          </Button>
        </div>
      </div>
    </nav>
  );
}
