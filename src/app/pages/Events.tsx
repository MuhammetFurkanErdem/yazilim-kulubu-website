import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Zap, Ticket } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

// Ticket Card Component for Upcoming Events
function TicketCard({ event }: { event: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, rotateZ: 0.5 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col md:flex-row group w-full cursor-pointer shadow-sm hover:shadow-dynamic"
    >
      {/* Left side (Main content) */}
      <div className="bg-surface border-2 border-default md:border-r-0 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-6 md:p-8 flex-1 relative overflow-hidden transition-colors group-hover:border-[var(--brand-primary)]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 w-20 h-20 bg-page border border-default rounded-2xl flex flex-col items-center justify-center text-primary group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors">
            <div className="text-3xl font-black">{event.date.day}</div>
            <div className="text-[10px] font-bold tracking-widest uppercase">{event.date.month}</div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">{event.title}</h3>
            <p className="text-sm text-muted font-medium mb-4 line-clamp-2">{event.desc}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {event.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Divider Seam (Hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-between items-center w-8 bg-transparent relative z-10 overflow-visible">
        {/* Top notch */}
        <div className="w-8 h-4 bg-page rounded-b-full absolute top-[-2px] border-b-2 border-x-2 border-default group-hover:border-[var(--brand-primary)] transition-colors z-20"></div>
        {/* Dashed line */}
        <div className="w-0.5 h-full border-l-2 border-dashed border-default group-hover:border-[var(--brand-primary)] transition-colors mt-4 mb-4"></div>
        {/* Bottom notch */}
        <div className="w-8 h-4 bg-page rounded-t-full absolute bottom-[-2px] border-t-2 border-x-2 border-default group-hover:border-[var(--brand-primary)] transition-colors z-20"></div>
      </div>

      {/* Mobile horizontal divider */}
      <div className="md:hidden flex h-6 relative bg-surface border-x-2 border-default group-hover:border-[var(--brand-primary)] transition-colors items-center overflow-hidden">
        <div className="w-4 h-6 bg-page rounded-r-full absolute left-[-2px] border-r-2 border-y-2 border-default group-hover:border-[var(--brand-primary)] z-20"></div>
        <div className="w-full h-0.5 border-t-2 border-dashed border-default group-hover:border-[var(--brand-primary)] mx-4"></div>
        <div className="w-4 h-6 bg-page rounded-l-full absolute right-[-2px] border-l-2 border-y-2 border-default group-hover:border-[var(--brand-primary)] z-20"></div>
      </div>

      {/* Right side (Stub) */}
      <div className="bg-elevated border-2 border-default md:border-l-0 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-6 w-full md:w-48 flex flex-col justify-center items-center relative overflow-hidden group-hover:border-[var(--brand-primary)] transition-colors">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Ticket className="w-32 h-32 rotate-45" />
        </div>
        <div className="z-10 text-center flex flex-col items-center">
          <div className="font-mono text-[10px] font-bold text-muted tracking-widest mb-4 hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            ADMIT ONE
          </div>
          <Button href={event.formUrl} variant="primary" size="sm" className="w-full shadow-dynamic font-bold">Kayıt Ol</Button>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline Component for Past Events
function PastEventsTimeline({ events }: { events: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* Track line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-default rounded-full md:-translate-x-1/2" />

      {/* Glowing animated line */}
      <motion.div
        className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-[var(--brand-primary)] rounded-full md:-translate-x-1/2 origin-top shadow-[0_0_15px_var(--brand-primary)] z-10"
        style={{ scaleY }}
      />

      <div className="space-y-24">
        {events.map((event, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-page border-4 border-[var(--brand-primary)] z-20 shadow-[0_0_10px_var(--brand-primary)]" />

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Event Card */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0">
                <Link to={`/etkinlikler/${event.id}`} className="block group">
                  <div className="bg-surface border border-default rounded-dynamic overflow-hidden card-interactive shadow-sm p-2 flex flex-col group-hover:border-[var(--brand-primary)] transition-all">
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="absolute inset-0 w-full h-full object-cover filter contrast-110 transition-all duration-700 group-hover:scale-105 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-black text-white drop-shadow-md">{event.name}</h3>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-1 flex items-center justify-between text-sm font-bold text-muted">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[var(--brand-primary)]" /> {event.date}</span>
                      <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[var(--brand-primary)]" /> {event.attendees}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

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
    shortDate: "15-16 NİSAN",
    formUrl: "https://docs.google.com/forms/d/1zcZzwQPrOmVgNlYhAB67zGUrl1K_m7w06Ru05-RB-8k/edit"
  };

  // Yaklaşan etkinlikler. Test edebilmemiz için örnek bilet datası ekledim.
  const upcomingEvents: any[] = [
    {
      title: "Yazılım Mimarisinin Temelleri",
      desc: "Microservices ve monolithic mimariler arasındaki farklar. Hangisini ne zaman seçmeliyiz?",
      date: { day: '28', month: 'NİS' },
      time: "19:00",
      location: "Teknopark",
      capacity: "40 Kişi",
      badge: "Yakında",
      variant: "web",
      formUrl: "https://docs.google.com/forms/d/1zcZzwQPrOmVgNlYhAB67zGUrl1K_m7w06Ru05-RB-8k/edit"
    },
    {
      title: "Oyun Motorlarına Giriş",
      desc: "Unity ile ilk oyununu yap. Temel C# ve fizik motoru prensipleri.",
      date: { day: '05', month: 'MAY' },
      time: "17:00",
      location: "Bilgisayar Müh. Lab",
      capacity: "30 Kişi",
      badge: "Yeni",
      variant: "game",
      formUrl: "https://docs.google.com/forms/d/1zcZzwQPrOmVgNlYhAB67zGUrl1K_m7w06Ru05-RB-8k/edit"
    }
  ];

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
                  <Button href={heroEvent.formUrl} variant="primary" size="md" className="w-full sm:w-auto px-6 rounded-xl shadow-dynamic font-bold">
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
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 transition-all duration-700 group-hover:scale-105 dark:grayscale dark:contrast-125 hover:grayscale-0 dark:hover:grayscale-0"
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

      {/* Upcoming Events Ticket Style */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-24 px-8 lg:px-20 bg-surface border-y border-default overflow-hidden">
          <div className="max-w-[1000px] mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Yaklaşan Etkinlikler</h2>
              <p className="text-xl text-muted font-medium">Biletini al, yerini garantile.</p>
            </div>

            <div className="space-y-8">
              {upcomingEvents.map((event, idx) => (
                <TicketCard key={idx} event={event} />
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

          {/* Animated Timeline */}
          <PastEventsTimeline events={[
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
          ]} />
        </div>
      </section>
    </div>
  );
}
