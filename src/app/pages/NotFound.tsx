import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 grid-bg relative overflow-hidden">
      {/* Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#534AB7] rounded-full blur-[150px] opacity-10" />
      
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 */}
          <div className="mb-8">
            <div className="text-[180px] font-bold leading-none font-mono bg-gradient-to-r from-white via-[#7F77DD] to-white bg-clip-text text-transparent">
              404
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
          <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            <br />
            Belki de kodda bir bug var... 🐛
          </p>

          {/* Code Block */}
          <div className="bg-[#08080f] border border-[#534AB7]/30 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
            <pre className="font-mono text-sm">
              <code>
                <span className="text-[#7F77DD]">if</span>{' '}
                <span className="text-white">(</span>
                <span className="text-white">pageNotFound</span>
                <span className="text-white">) {'{'}</span>
                {'\n  '}
                <span className="text-[#1D9E75]">console</span>
                <span className="text-white">.</span>
                <span className="text-[#BA7517]">error</span>
                <span className="text-white">(</span>
                <span className="text-[#D85A30]">'404: Not Found'</span>
                <span className="text-white">);</span>
                {'\n  '}
                <span className="text-[#7F77DD]">return</span>{' '}
                <span className="text-[#1D9E75]">goHome</span>
                <span className="text-white">();</span>
                {'\n'}
                <span className="text-white">{'}'}</span>
              </code>
            </pre>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" size="lg" asLink href="/">
              <Home className="w-5 h-5" />
              Anasayfaya Dön
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
              Geri Dön
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-[#374151]">
            <p className="text-sm text-[#6B7280] mb-4">Belki bunları arıyordunuz?</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link to="/projeler" className="text-[#7F77DD] hover:text-white transition-colors">
                Projeler
              </Link>
              <span className="text-[#374151]">•</span>
              <Link to="/etkinlikler" className="text-[#7F77DD] hover:text-white transition-colors">
                Etkinlikler
              </Link>
              <span className="text-[#374151]">•</span>
              <Link to="/ekibimiz" className="text-[#7F77DD] hover:text-white transition-colors">
                Ekibimiz
              </Link>
              <span className="text-[#374151]">•</span>
              <Link to="/iletisim" className="text-[#7F77DD] hover:text-white transition-colors">
                İletişim
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
