import { Save, Globe, Lock, Mail, Instagram, Youtube, Linkedin, MessageCircle, Loader2 } from "lucide-react";
import { Button } from '@/components/shared/Button';
import { useState, useEffect } from "react";
import { supabase } from "@/api/config";

export function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    email: '',
    whatsapp: '',
    instagram: '',
    youtube: '',
    linkedin: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      
      if (data && data.length > 0) {
        const settingsMap: any = {};
        data.forEach(item => {
          settingsMap[item.key] = item.value;
        });
        setSettings({
          email: settingsMap['contact_email'] || 'ygk@comu.edu.tr',
          whatsapp: settingsMap['contact_whatsapp'] || '',
          instagram: settingsMap['social_instagram'] || '',
          youtube: settingsMap['social_youtube'] || '',
          linkedin: settingsMap['social_linkedin'] || ''
        });
      }
    } catch (error) {
      console.error("Ayarlar çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const updates = [
        { key: 'contact_email', value: settings.email },
        { key: 'contact_whatsapp', value: settings.whatsapp },
        { key: 'social_instagram', value: settings.instagram },
        { key: 'social_youtube', value: settings.youtube },
        { key: 'social_linkedin', value: settings.linkedin }
      ];

      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) throw error;
      
      alert("Ayarlar başarıyla kaydedildi!");
    } catch (error: any) {
      console.error("Ayarlar kaydedilemedi:", error);
      alert("Ayarlar kaydedilirken hata oluştu: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Şifreler uyuşmuyor!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;
      alert("Şifreniz başarıyla güncellendi!");
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error("Şifre güncellenemedi:", error);
      alert("Şifre güncellenirken hata oluştu: " + error.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted gap-4 font-mono">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
        <p>Ayarlar yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl font-mono">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="text-[var(--brand-primary)]">&gt;_</span> Sistem Ayarları
        </h1>
        <Button variant="primary" className="flex items-center gap-2 font-mono" onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
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
                <input 
                  type="email" 
                  value={settings.email} 
                  onChange={e => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-muted" /> WhatsApp Topluluk Linki
                </label>
                <input 
                  type="url" 
                  value={settings.whatsapp} 
                  onChange={e => setSettings({...settings, whatsapp: e.target.value})}
                  placeholder="https://chat.whatsapp.com/..." 
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" 
                />
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
                <input 
                  type="url" 
                  value={settings.instagram} 
                  onChange={e => setSettings({...settings, instagram: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-muted" /> YouTube URL
                </label>
                <input 
                  type="url" 
                  value={settings.youtube} 
                  onChange={e => setSettings({...settings, youtube: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-muted" /> LinkedIn URL
                </label>
                <input 
                  type="url" 
                  value={settings.linkedin} 
                  onChange={e => setSettings({...settings, linkedin: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-[var(--brand-primary)]" 
                />
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
                <label className="text-sm font-bold text-primary">Yeni Şifre</label>
                <input 
                  type="password" 
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  placeholder="Yeni şifrenizi girin" 
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-red-500" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-primary">Yeni Şifre (Tekrar)</label>
                <input 
                  type="password" 
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  placeholder="Yeni şifrenizi doğrulayın" 
                  className="w-full px-4 py-2.5 bg-surface border border-default rounded-xl text-sm focus:outline-none focus:border-red-500" 
                />
              </div>
              <div className="pt-2">
                <Button 
                  variant="secondary" 
                  onClick={handleChangePassword}
                  disabled={isChangingPassword || !passwordForm.newPassword}
                  className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10"
                >
                  {isChangingPassword ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </Button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
