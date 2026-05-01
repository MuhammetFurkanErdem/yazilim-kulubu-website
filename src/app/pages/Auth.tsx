import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import { NetworkBackground } from '../components/NetworkBackground';

export function Auth() {
  // isLogin true means Login form is visible (Overlay is on the right)
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background */}
      <NetworkBackground />
      
      {/* Back button */}
      <Link to="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-muted hover:text-white transition-colors font-bold text-sm bg-surface/50 backdrop-blur-md px-4 py-2 rounded-xl border border-default">
        <ArrowLeft className="w-4 h-4" /> Anasayfaya Dön
      </Link>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl h-[600px] bg-surface rounded-[2rem] shadow-dynamic border border-default overflow-hidden z-10 hidden md:block">
        
        {/* Left Side: Login Form */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ease-in-out z-10 ${isLogin ? 'opacity-100 translate-x-0 pointer-events-auto delay-300' : 'opacity-0 -translate-x-[20%] pointer-events-none'}`}>
           <div className="flex justify-center mb-6">
             <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-md bg-page border border-default">
               <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
             </div>
           </div>
           <h2 className="text-3xl font-black text-primary mb-2 text-center tracking-tight">Giriş Yap</h2>
           <p className="text-muted text-center mb-8 text-sm font-medium">Devam etmek için giriş yap.</p>
           
           <form className="space-y-4" onSubmit={e => e.preventDefault()}>
             <input type="email" placeholder="Email veya Kullanıcı Adı" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <input type="password" placeholder="Şifre" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <div className="flex justify-center pt-2">
               <a href="#" className="text-xs text-muted hover:text-[var(--brand-primary)] transition-colors font-medium">Şifreni mi unuttun?</a>
             </div>
             <div className="pt-2 flex justify-center">
               <Button variant="primary" className="w-full font-bold shadow-dynamic rounded-xl py-3.5 text-sm tracking-wide">GİRİŞ YAP</Button>
             </div>
           </form>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-12 transition-all duration-700 ease-in-out z-10 ${!isLogin ? 'opacity-100 translate-x-0 pointer-events-auto delay-300' : 'opacity-0 translate-x-[20%] pointer-events-none'}`}>
           <h2 className="text-3xl font-black text-primary mb-2 text-center tracking-tight">Hesap Oluştur</h2>
           <p className="text-muted text-center mb-8 text-sm font-medium">YGK topluluğuna katıl.</p>
           
           <form className="space-y-4" onSubmit={e => e.preventDefault()}>
             <input type="text" placeholder="Ad Soyad" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <input type="text" placeholder="Kullanıcı Adı" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <input type="email" placeholder="Email (@ogr.comu.edu.tr)" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <input type="password" placeholder="Şifre" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
             <div className="pt-4 flex justify-center">
               <Button variant="primary" className="w-full font-bold shadow-dynamic rounded-xl py-3.5 text-sm tracking-wide">ÜYE OL</Button>
             </div>
           </form>
        </div>

        {/* The Sliding Overlay */}
        <div className={`absolute top-0 left-0 w-1/2 h-full bg-[var(--brand-primary)] text-[var(--brand-text)] flex flex-col items-center justify-center px-12 transition-transform duration-700 ease-in-out z-20 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
           <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-text)]/20 to-transparent pointer-events-none" />
           
           <AnimatePresence mode="wait">
             {isLogin ? (
               <motion.div 
                 key="login-overlay"
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 50 }}
                 transition={{ duration: 0.4 }}
                 className="relative z-10 flex flex-col items-center text-center"
               >
                 <h2 className="text-4xl font-black mb-4 tracking-tight drop-shadow-md text-[var(--brand-text)]">Merhaba!</h2>
                 <p className="text-[var(--brand-text)]/90 font-medium mb-10 leading-relaxed text-sm px-4">
                   Henüz bir hesabın yok mu? Topluluğa katıl ve geleceği kodlamaya başla.
                 </p>
                 <button 
                   onClick={() => setIsLogin(false)}
                   className="px-12 py-3 rounded-xl border border-[var(--brand-text)] text-[var(--brand-text)] font-bold hover:bg-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-all shadow-sm tracking-wider text-sm"
                 >
                   ÜYE OL
                 </button>
               </motion.div>
             ) : (
               <motion.div 
                 key="signup-overlay"
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -50 }}
                 transition={{ duration: 0.4 }}
                 className="relative z-10 flex flex-col items-center text-center"
               >
                 <h2 className="text-4xl font-black mb-4 tracking-tight drop-shadow-md text-[var(--brand-text)]">Hoşgeldin!</h2>
                 <p className="text-[var(--brand-text)]/90 font-medium mb-10 leading-relaxed text-sm px-4">
                   Zaten bir hesabın var mı? Kişisel bilgilerinle giriş yapıp devam edebilirsin.
                 </p>
                 <button 
                   onClick={() => setIsLogin(true)}
                   className="px-12 py-3 rounded-xl border border-[var(--brand-text)] text-[var(--brand-text)] font-bold hover:bg-[var(--brand-text)] hover:text-[var(--brand-primary)] transition-all shadow-sm tracking-wider text-sm"
                 >
                   GİRİŞ YAP
                 </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Mobile Version (Vertical stacked, no sliding overlay) */}
      <div className="w-full max-w-md bg-surface rounded-[2rem] shadow-dynamic border border-default overflow-hidden z-10 block md:hidden mt-20 mb-8 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-md bg-page border border-default">
            <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
          </div>
        </div>
        <div className="flex bg-page rounded-xl p-1 mb-8 border border-default">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-surface shadow-sm text-primary' : 'text-muted'}`}
            onClick={() => setIsLogin(true)}
          >
            Giriş Yap
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-[var(--brand-primary)] shadow-sm text-[var(--brand-text)]' : 'text-muted'}`}
            onClick={() => setIsLogin(false)}
          >
            Üye Ol
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email veya Kullanıcı Adı" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <input type="password" placeholder="Şifre" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <div className="flex justify-center pt-2">
              <a href="#" className="text-xs text-muted hover:text-[var(--brand-primary)] transition-colors font-medium">Şifreni mi unuttun?</a>
            </div>
            <div className="pt-2">
              <Button variant="primary" className="w-full font-bold shadow-dynamic rounded-xl py-3.5 text-sm">GİRİŞ YAP</Button>
            </div>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Ad Soyad" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <input type="text" placeholder="Kullanıcı Adı" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <input type="password" placeholder="Şifre" className="w-full px-4 py-3 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 text-sm" />
            <div className="pt-2">
              <Button variant="primary" className="w-full font-bold shadow-dynamic rounded-xl py-3.5 text-sm">ÜYE OL</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
