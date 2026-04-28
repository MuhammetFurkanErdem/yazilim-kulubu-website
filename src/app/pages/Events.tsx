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



  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 flex flex-col items-center justify-center overflow-hidden border-b border-default">
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjYWFhIiBmaWxsLW9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+')", maskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)' }} />
        
        <div className="relative z-10 max-w-[900px] mx-auto text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              <span className="text-[var(--brand-primary)]">Etkinlikler</span> <br className="hidden md:block" /> & Buluşmalar
            </h1>
            <p className="text-xl text-muted max-w-[720px] mx-auto leading-relaxed font-medium">
              Workshop'lardan hackathon'lara, sektör konuşmalarından sosyal etkinliklere kadar teknolojiyi bir araya getiren tüm aktivitelerimiz.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Featured Event */}
      <section className="py-24 px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface border border-[var(--brand-primary)] rounded-dynamic overflow-hidden shadow-dynamic"
          >
            {/* Left - Details */}
            <div className="col-span-1 lg:col-span-7 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-bold uppercase tracking-wider">Kayıtlar Açık</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] rounded-full text-xs font-bold mb-6 border border-[var(--brand-primary)]/20">
                <Zap className="w-3.5 h-3.5" />
                Öne Çıkan Hackathon
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">İlkbahar Hackathon '25</h2>
              <p className="text-lg text-muted leading-relaxed font-medium mb-10">
                24 saat sürecek yoğun kodlama maratonunda takımınla birlikte gerçek dünya problemlerine çözüm üret.
                Ödüller, mentor desteği ve bol kahve ile dolu bir hafta sonu seni bekliyor!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-4 text-sm bg-page border border-default rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-muted font-medium text-xs uppercase tracking-wider mb-0.5">Tarih</div>
                    <div className="font-bold text-primary">15-16 Nisan 2025</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm bg-page border border-default rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-muted font-medium text-xs uppercase tracking-wider mb-0.5">Yer</div>
                    <div className="font-bold text-primary">Terzioğlu Kampüsü</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm bg-page border border-default rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-muted font-medium text-xs uppercase tracking-wider mb-0.5">Kontenjan</div>
                    <div className="font-bold text-primary">60 Kişi</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm bg-page border border-default rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-muted font-medium text-xs uppercase tracking-wider mb-0.5">Süre</div>
                    <div className="font-bold text-primary">24 Saat</div>
                  </div>
                </div>
              </div>

              {/* Mini Countdown */}
              <div className="bg-elevated border border-[var(--brand-primary)]/30 rounded-2xl p-6 mb-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[80px] opacity-10" />
                <div className="text-xs text-muted font-bold tracking-widest mb-4 font-mono">GERİ SAYIM</div>
                <div className="flex items-center gap-4 md:gap-8">
                  {[
                    { label: 'GÜN', value: countdown.days },
                    { label: 'SAAT', value: countdown.hours },
                    { label: 'DAK', value: countdown.mins },
                    { label: 'SAN', value: countdown.secs }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex-1 text-center bg-surface border border-default rounded-xl py-3 shadow-sm">
                      <div className="text-3xl font-black font-mono text-primary mb-1">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-muted font-bold tracking-widest uppercase">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 rounded-xl shadow-dynamic font-bold">
                  Hemen Kayıt Ol <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-elevated hover:bg-page">
                  Detayları İncele
                </Button>
              </div>
            </div>

            {/* Right - Poster Image */}
            <div className="col-span-1 lg:col-span-5 relative min-h-[400px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" 
                alt="Hackathon" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 dark:contrast-150"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                <div className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-xl tracking-tighter">
                  İlkbahar<br />
                  <span className="text-[var(--brand-primary)]">Hackathon</span><br />
                  '25
                </div>
                <div className="inline-block bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 font-bold text-white tracking-widest text-sm shadow-2xl">
                  15-16 NİSAN
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Yaklaşan Etkinlikler</h2>
            <p className="text-xl text-muted font-medium">Önümüzdeki haftalarda düzenlenecek buluşmalar</p>
          </div>

          <div className="space-y-6">
            {[
              {
                date: { day: '22', month: 'MAR' },
                badge: 'Workshop',
                variant: 'web',
                title: 'Next.js & Supabase ile Full Stack Web',
                desc: 'Modern web geliştirme araçlarıyla production-ready uygulama geliştirmeyi öğren.',
                time: '18:00',
                location: 'Online - Zoom',
                capacity: '40 kişi'
              },
              {
                date: { day: '28', month: 'MAR' },
                badge: 'Talk',
                variant: 'neutral',
                title: 'Kariyer Konuşması: Yazılımcı Olarak İlk Yılım',
                desc: 'Sektörde çalışan mezunlarımızdan doğrudan tecrübe paylaşımı.',
                time: '19:00',
                location: 'Amfi 3',
                capacity: '100 kişi'
              },
              {
                date: { day: '05', month: 'NİS' },
                badge: 'Workshop',
                variant: 'mobile',
                title: 'Flutter ile Mobil Uygulama Geliştirme',
                desc: 'Cross-platform mobil uygulama geliştirmenin temellerini öğren, ilk uygulamanı yap.',
                time: '14:00',
                location: 'Lab 2',
                capacity: '30 kişi'
              },
              {
                date: { day: '12', month: 'NİS' },
                badge: 'Sosyal',
                variant: 'neutral',
                title: 'YGK Kahve Buluşması',
                desc: 'Rahat bir ortamda sohbet, tanışma, networking ve bolca kutu oyunu.',
                time: '16:00',
                location: 'Kampüs Kafeterya',
                capacity: 'Sınırsız'
              }
            ].map((event, idx) => (
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
                className="bg-surface border border-default rounded-dynamic overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-dynamic group"
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
