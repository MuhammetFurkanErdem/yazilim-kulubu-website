import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Zap } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Events() {
  const [countdown, setCountdown] = useState({ days: 12, hours: 8, mins: 34, secs: 22 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Admin panelinden gelecek "Öne Çıkan Etkinlik" verisi
  const heroEvent = {
    isActive: true, // Admin bunu kapatırsa bu alan ekrandan tamamen kalkar
    title: "İlkbahar Hackathon '25",
    description: "24 saat sürecek yoğun kodlama maratonunda takımınla birlikte gerçek dünya problemlerine çözüm üret. Ödüller, mentor desteği ve bol kahve ile dolu bir hafta sonu seni bekliyor!",
    date: "15-16 Nisan 2025",
    location: "Terzioğlu Kampüsü",
    capacity: "60 Kişi",
    duration: "24 Saat",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
    badge: "Kayıtlar Açık",
    tag: "Öne Çıkan Hackathon",
    shortDate: "15-16 NİSAN"
  };

  // Yaklaşan etkinlikler. Eğer admin yeni etkinlik eklemezse boş ([]) kalır ve bölüm gizlenir.
  const upcomingEvents: any[] = [];

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Featured Event (Büyük Etkinlik) - Admin panelinden isActive=true ise gösterilir */}
      {heroEvent.isActive && (
        <section className="pt-24 pb-12 px-8 lg:px-20 bg-page">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface border border-[var(--brand-primary)] rounded-dynamic overflow-hidden shadow-sm"
            >
              {/* Left - Details */}
              <div className="col-span-1 lg:col-span-7 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">{heroEvent.badge}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full text-xs font-bold mb-4 border border-[var(--brand-primary)]/20">
                  <Zap className="w-3.5 h-3.5" />
                  {heroEvent.tag}
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{heroEvent.title}</h2>
                <p className="text-base text-muted leading-relaxed font-medium mb-8">
                  {heroEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-sm bg-page border border-default rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-medium text-[10px] uppercase tracking-wider mb-0.5">Tarih</div>
                      <div className="font-bold text-primary">{heroEvent.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm bg-page border border-default rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-medium text-[10px] uppercase tracking-wider mb-0.5">Yer</div>
                      <div className="font-bold text-primary">{heroEvent.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm bg-page border border-default rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-medium text-[10px] uppercase tracking-wider mb-0.5">Kontenjan</div>
                      <div className="font-bold text-primary">{heroEvent.capacity}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm bg-page border border-default rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-medium text-[10px] uppercase tracking-wider mb-0.5">Süre</div>
                      <div className="font-bold text-primary">{heroEvent.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Mini Countdown */}
                <div className="bg-elevated border border-[var(--brand-primary)]/30 rounded-2xl p-4 mb-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[80px] opacity-10" />
                  <div className="text-[10px] text-muted font-bold tracking-widest mb-3 font-mono">GERİ SAYIM</div>
                  <div className="flex items-center gap-2 md:gap-4">
                    {[
                      { label: 'GÜN', value: countdown.days },
                      { label: 'SAAT', value: countdown.hours },
                      { label: 'DAK', value: countdown.mins },
                      { label: 'SAN', value: countdown.secs }
                    ].map((unit, idx) => (
                      <div key={idx} className="flex-1 text-center bg-surface border border-default rounded-xl py-2 shadow-sm z-10">
                        <div className="text-xl font-black font-mono text-primary mb-0.5">
                          {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] text-muted font-bold tracking-widest uppercase">{unit.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 z-10 relative">
                  <Button variant="primary" size="md" className="w-full sm:w-auto px-6 rounded-xl shadow-dynamic font-bold">
                    Hemen Kayıt Ol <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="secondary" size="md" className="w-full sm:w-auto px-6 rounded-xl font-bold bg-elevated hover:bg-page">
                    Detayları İncele
                  </Button>
                </div>
              </div>

              {/* Right - Poster Image */}
              <div className="col-span-1 lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                <img
                  src={heroEvent.image}
                  alt={heroEvent.title}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 dark:contrast-150"
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                  <div className="inline-block bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 font-bold text-white tracking-widest text-xs shadow-2xl">
                    {heroEvent.shortDate}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Upcoming Events - Admin yaklaşan etkinlik eklemezse bu bölüm görünmez */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Yaklaşan Etkinlikler</h2>
              <p className="text-xl text-muted font-medium">Önümüzdeki haftalarda düzenlenecek buluşmalar</p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 bg-elevated border border-default rounded-dynamic p-6 hover:-translate-y-1 transition-all duration-300 hover:border-[var(--brand-primary)] shadow-sm hover:shadow-dynamic"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 w-24 h-24 bg-page border border-default rounded-2xl flex flex-col items-center justify-center transition-colors group-hover:border-[var(--brand-primary)]">
                    <div className="text-3xl font-black text-primary">{event.date.day}</div>
                    <div className="text-xs font-bold text-[var(--brand-primary)] tracking-widest">{event.date.month}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    <Badge variant={event.variant as any} className="mb-3">{event.badge}</Badge>
                    <h3 className="text-2xl font-bold mb-2 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-base text-muted font-medium mb-4">{event.desc}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-page border border-default rounded-lg">
                        <Clock className="w-4 h-4 text-[var(--brand-primary)]" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-page border border-default rounded-lg">
                        <MapPin className="w-4 h-4 text-[var(--brand-primary)]" /> {event.location}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-page border border-default rounded-lg">
                        <Users className="w-4 h-4 text-[var(--brand-primary)]" /> {event.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <Button variant="primary" className="w-full md:w-auto px-8 rounded-xl font-bold mt-4 md:mt-0 shadow-dynamic">
                    Kayıt Ol
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Geçmiş Etkinlikler</h2>
            <p className="text-xl text-muted font-medium">Başarıyla tamamladığımız ve iz bırakan etkinlikler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'kis-hackathon-24',
                name: 'Kış Hackathon \'24',
                type: 'Hackathon',
                date: 'Aralık 2024',
                attendees: 45,
                variant: 'web',
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600'
              },
              {
                id: 'ai-ml-workshop',
                name: 'AI/ML Workshop Serisi',
                type: 'Workshop',
                date: 'Kasım 2024',
                attendees: 60,
                variant: 'mobile',
                image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600'
              },
              {
                id: 'open-source-gunu',
                name: 'Open Source Günü',
                type: 'Talk',
                date: 'Ekim 2024',
                attendees: 80,
                variant: 'game',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
              }
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface border border-default rounded-dynamic overflow-hidden card-interactive shadow-dynamic group"
              >
                <Link to={`/etkinlikler/${event.id}`} className="block h-full">
                  <div className="relative h-56 bg-page overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover filter contrast-110 dark:grayscale dark:contrast-150 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-page via-page/40 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white shadow-sm">
                        Tamamlandı
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                      <div className="text-2xl font-black text-primary drop-shadow-md">{event.name}</div>
                      <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge variant={event.variant as any} className="mb-4 shadow-sm">{event.type}</Badge>
                    <div className="flex items-center justify-between text-sm font-medium text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[var(--brand-primary)]" />
                        {event.attendees} katılımcı
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
