import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';

export function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error("Etkinlik detayı çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[var(--brand-primary)] bg-page">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-mono text-muted">Etkinlik Detayları Yükleniyor...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-page">
        <h1 className="text-2xl font-bold text-primary">Etkinlik Bulunamadı</h1>
        <Link to="/etkinlikler" className="text-[var(--brand-primary)] hover:underline">Etkinliklere Dön</Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-page">
      {/* Clean Header */}
      <section className="relative mt-12 pt-12 pb-24 bg-surface border-b border-default overflow-hidden">
        {/* Subtle accent background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--brand-primary)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--brand-primary)]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8 lg:px-20">
          <Link to="/etkinlikler" className="inline-flex items-center gap-2 text-muted hover:text-[var(--brand-primary)] transition-colors font-bold text-sm mb-10">
            <ArrowLeft className="w-4 h-4" /> Etkinliklere Dön
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-page border border-default rounded-full text-xs font-bold text-muted shadow-sm">
                {event.type === 'past' ? 'Tamamlandı' : event.type === 'featured' ? 'Öne Çıkan' : 'Yaklaşan'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-10 tracking-tight leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted font-medium bg-page border border-default p-4 rounded-2xl max-w-fit shadow-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
                {formattedDate}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-default"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                {event.location || 'Belirtilmemiş'}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-default"></div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--brand-primary)]" />
                {event.capacity ? `${event.capacity} Kişi` : 'Sınırsız'} Kontenjan
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-8 lg:px-20 border-b border-default bg-page">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-xl md:text-2xl text-primary leading-relaxed font-medium">
            {event.description || 'Detaylı açıklama bulunmuyor.'}
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      {event.gallery_urls && event.gallery_urls.length > 0 && (
        <section className="py-24 px-8 lg:px-20 bg-page">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Etkinlik Galerisi</h2>
                <p className="text-muted font-medium">O günden geriye kalan güzel anılarımız</p>
              </div>
              <div className="w-12 h-12 bg-surface border border-default rounded-full flex items-center justify-center text-[var(--brand-primary)]">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.gallery_urls.map((photo: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group relative rounded-dynamic overflow-hidden border border-default bg-surface aspect-[4/3] shadow-sm hover:shadow-dynamic transition-all cursor-zoom-in"
                >
                  <img
                    src={photo}
                    alt={`${event.title} Anısı ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-110 transition-all duration-700 group-hover:scale-110 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold text-sm drop-shadow-md">
                    Görseli Büyüt
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
