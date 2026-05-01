import { Save, Globe, Lock, Mail, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "../components/Button";

export function Settings() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Sistem Ayarları</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Değişiklikleri Kaydet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Sütun - Sosyal & İletişim */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* İletişim Bilgileri */}
          <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-default bg-surface/50">
              <div className="flex items-center gap-3 mb-1">
                <Globe className="w-5 h-5 text-[var(--brand-primary)]" />
                <h2 className="text-lg font-bold text-primary">Genel İletişim Bilgileri</h2>
              </div>
              <p className="text-sm text-muted">Sitenin footer ve iletişim kısımlarında görünecek bilgiler.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted" /> Resmi E-posta Adresi
                </label>
                <input type="email" defaultValue="ygk@comu.edu.tr" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-muted" /> WhatsApp Topluluk Linki
                </label>
                <input type="url" defaultValue="https://chat.whatsapp.com/ygk" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-default bg-surface/50">
              <h2 className="text-lg font-bold text-primary">Sosyal Medya Linkleri</h2>
              <p className="text-sm text-muted">Ziyaretçilerin kulübünüzü takip etmesi için yönlendirme bağlantıları.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-muted" /> Instagram URL
                </label>
                <input type="url" defaultValue="https://instagram.com/ygk_comu" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-muted" /> YouTube URL
                </label>
                <input type="url" defaultValue="https://youtube.com/ygk_comu" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-muted" /> LinkedIn URL
                </label>
                <input type="url" defaultValue="https://linkedin.com/company/ygk" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" />
              </div>
            </div>
          </div>

        </div>

        {/* Sağ Sütun - Güvenlik */}
        <div className="space-y-8">
          
          {/* Admin Bilgileri */}
          <div className="bg-page border border-default rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-default bg-surface/50">
              <div className="flex items-center gap-3 mb-1">
                <Lock className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-primary">Güvenlik</h2>
              </div>
              <p className="text-sm text-muted">Yönetici paneli giriş ayarları.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Mevcut Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-red-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Yeni Şifre</label>
                <input type="password" placeholder="Yeni şifrenizi girin" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-red-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Yeni Şifre (Tekrar)</label>
                <input type="password" placeholder="Yeni şifrenizi doğrulayın" className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-red-500" />
              </div>
              <div className="pt-2">
                <Button variant="secondary" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10">
                  Şifreyi Güncelle
                </Button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
