import { Link, useLocation } from 'react-router';
import { Button } from '@/components/shared/Button';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menu = mobileMenuRef.current;
    document.body.style.overflow = 'hidden';

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const animationFrame = window.requestAnimationFrame(() => {
      menu?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menu) return;
      const focusableElements = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Anasayfa', path: '/' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Ekibimiz', path: '/ekibimiz' },
    { name: 'Etkinlikler', path: '/etkinlikler' },
    { name: 'Projeler', path: '/projeler' },
    { name: 'İletişim', path: '/iletisim' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'h-20 bg-page/90 backdrop-blur-lg border-b border-default shadow-sm'
        : 'h-28 bg-transparent border-transparent'
        }`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex min-h-[44px] items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm flex-shrink-0">
              <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <span className="text-base xl:text-xl font-bold text-primary tracking-tight">
              <span className="sm:hidden">YGK</span>
              <span className="hidden sm:inline">Yazılım Geliştirme Kulübü</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`inline-flex min-h-[44px] items-center text-base font-medium nav-link-animated ${location.pathname === link.path
                  ? 'text-[var(--brand-primary)] active'
                  : 'text-muted hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="touch-target inline-flex items-center justify-center rounded-full hover:bg-surface text-muted icon-interactive focus-ring"
                aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            {/* Hamburger — only on mobile */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileOpen(true)}
              className="xl:hidden touch-target inline-flex items-center justify-center rounded-xl hover:bg-surface text-muted hover:text-primary transition-colors focus-ring"
              aria-label="Menüyü Aç"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigasyon"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-[340px] flex flex-col bg-page border-l border-default shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-default">
          <Link to="/" className="flex min-h-[44px] items-center gap-2" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="YGK Logo" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-bold text-primary text-sm leading-tight">Yazılım Geliştirme<br />Kulübü</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="touch-target inline-flex items-center justify-center rounded-full hover:bg-surface text-muted hover:text-primary transition-colors cursor-pointer focus-ring"
            aria-label="Menüyü Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${idx * 40}ms` : '0ms' }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 focus-ring ${location.pathname === link.path
                ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
                : 'text-primary hover:bg-surface hover:text-[var(--brand-primary)]'
                } ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
            >
              {location.pathname === link.path && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] flex-shrink-0" />
              )}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-6 py-6 border-t border-default">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-surface text-muted hover:text-primary transition-colors font-semibold text-sm focus-ring"
            >
              {theme === 'dark'
                ? <><Sun className="w-5 h-5" /> Açık Tema</>
                : <><Moon className="w-5 h-5" /> Koyu Tema</>
              }
            </button>
          )}
        </div>
      </div>
    </>
  );
}
