import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useState } from 'react';
import { supabase } from '@/api/config';

export function Join() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    grade: '1. Sınıf',
    branch: 'Web Geliştirme',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('applications').insert([
        {
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          department: `${formData.department} - ${formData.grade} (${formData.branch})`,
          message: formData.message,
          type: 'join',
          status: 'pending'
        }
      ]);

      if (error) throw error;

      alert("Başvurunuz başarıyla alındı! Ekibimiz sizinle iletişime geçecektir.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        grade: '1. Sınıf',
        branch: 'Web Geliştirme',
        message: ''
      });
    } catch (error: any) {
      console.error("Başvuru gönderilemedi:", error);
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-page transition-colors duration-300 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
          >
            Aramıza Katıl.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted font-medium max-w-[700px] mx-auto"
          >
            YGK'ya katıl, ilgi alanına göre bir kolda çalış ve hemen bugün gerçek projeler üretmeye başla.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          {/* Left - Benefits */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-8 bg-surface border border-default p-8 rounded-dynamic shadow-dynamic">
              <h2 className="text-2xl font-bold mb-4">Neden Katılmalısın?</h2>
              {[
                { icon: '🚀', text: 'Hemen projeye gir', desc: 'İlk haftadan itibaren aktif projelerde çalış.' },
                { icon: '🧠', text: 'Mentor desteği', desc: 'Deneyimli üyelerden birebir teknik destek al.' },
                { icon: '🎟️', text: 'Tüm etkinliklere ücretsiz', desc: 'Workshop ve hackathon\'lara öncelikli katıl.' },
                { icon: '🌐', text: 'GitHub organizasyonuna giriş', desc: 'Açık kaynak projelerimize doğrudan katkı sağla.' }
              ].map((perk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex gap-4 items-start"
                >
                  <div className="text-2xl flex-shrink-0 bg-page border border-default w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">{perk.icon}</div>
                  <div>
                    <div className="font-bold text-lg mb-1">{perk.text}</div>
                    <div className="text-muted font-medium text-sm">{perk.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 lg:col-span-7"
          >
            <div className="bg-surface border border-default shadow-dynamic rounded-dynamic p-8 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Ad</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Soyad</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Öğrenci E-postası</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                    placeholder="ornek@ogr.comu.edu.tr"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Bölüm</label>
                    <input
                      type="text"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60"
                      placeholder="Bilgisayar Müh."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Sınıf</label>
                    <select 
                      className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium text-primary"
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    >
                      <option>1. Sınıf</option>
                      <option>2. Sınıf</option>
                      <option>3. Sınıf</option>
                      <option>4. Sınıf</option>
                      <option>Hazırlık</option>
                      <option>Yüksek Lisans</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Kol Seçimi</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium text-primary"
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  >
                    <option>Web Geliştirme</option>
                    <option>Mobil Geliştirme</option>
                    <option>Oyun Geliştirme</option>
                    <option>Yapay Zeka / Veri Bilimi</option>
                    <option>Siber Güvenlik</option>
                    <option>Blockchain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Kendini Tanıt</label>
                  <textarea
                    className="w-full px-4 py-3.5 bg-page border border-default rounded-xl focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] focus:outline-none transition-all font-medium placeholder:text-muted/60 resize-none"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Neden YGK'ya katılmak istiyorsun? Hangi projelere ilgin var?"
                  />
                </div>

                <Button variant="primary" className="w-full rounded-xl py-4 font-bold shadow-dynamic" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Gönderiliyor...</>
                  ) : (
                    <>Başvuruyu Gönder <ArrowRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
