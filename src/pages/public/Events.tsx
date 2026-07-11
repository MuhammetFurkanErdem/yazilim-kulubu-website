import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Zap, Ticket, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { supabase } from '@/api/config';
import { withTimeout } from '@/utils/promise';
import { DatabaseError } from '@/components/shared/DatabaseError';

// Ticket Card Component for Upcoming Events
function TicketCard({ event }: { event: any }) {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString('tr-TR', { month: 'short' }).toUpperCase();
  const time = eventDate.toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit' });

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
            <div className="text-3xl font-black">{day}</div>
            <div className="text-[10px] font-bold tracking-widest uppercase">{month}</div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">{event.title}</h3>
            <p className="text-sm text-muted font-medium mb-4 line-clamp-2">{event.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location || 'Belirtilmemiş'}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {event.capacity ? `${event.capacity} Kişi` : 'Sınırsız'}</span>
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
        <div className="z-10 text-center flex flex-col items-center w-full">
          <div className="font-mono text-[10px] font-bold text-muted tracking-widest mb-4 hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            ADMIT ONE
          </div>
          {event.registration_url ? (
            <Button href={event.registration_url} target="_blank" rel="noopener noreferrer" variant="primary" size="sm" className="w-full shadow-dynamic font-bold">Kayıt Ol</Button>
          ) : (
            <Link to={`/etkinlikler/${event.id}`} className="w-full">
              <Button variant="secondary" size="sm" className="w-full shadow-sm font-bold bg-page border-default">İncele</Button>
            </Link>
          )}
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

  if (!events || events.length === 0) {
    return (
      <div className="text-center text-muted font-medium py-12">
        Geçmiş etkinlik bulunmamaktadır.
      </div>
    );
  }

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
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-page border-4 border-[var(--brand-primary)] z-20 shadow-[0_0_10px_var(--brand-primary)] group-hover:shadow-[0_0_20px_var(--brand-primary)] group-hover:scale-125 transition-all duration-300" />

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Event Card */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0">
                <Link to={`/etkinlikler/${event.id}`} className="block">
                  <div className="bg-surface border border-default rounded-dynamic overflow-hidden card-interactive shadow-sm p-2 flex flex-col group-hover:border-[var(--brand-primary)] transition-all">
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-page flex items-center justify-center">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="text-muted font-bold opacity-50">Görsel Yok</span>
                      )}
                    </div>
                    <div className="px-4 pb-2">
                      <h3 className="text-lg font-black text-primary line-clamp-2 transition-colors group-hover:text-[var(--brand-primary)]">{event.title}</h3>
                    </div>
                    <div className="px-4 pb-4 pt-2 mt-auto flex items-center justify-between text-xs font-bold text-muted">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[var(--brand-primary)]" /> {formattedDate}</span>
                      <span className="flex items-center gap-1 group-hover:text-[var(--brand-primary)] transition-colors">
                        Detaylar <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
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
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [featuredEvent, setFeaturedEvent] = useState<any>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await withTimeout<any>(
        supabase.from('events').select('*').order('date', { ascending: true }),
        5000
      );
      if (dbError) throw dbError;

      if (data) {
        const featured = data.find(e => e.type === 'featured');
        const upcoming = data.filter(e => e.type === 'upcoming');
        const past = data.filter(e => e.type === 'past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setFeaturedEvent(featured);
        setUpcomingEvents(upcoming);
        setPastEvents(past);

        if (featured && featured.date) {
          startCountdown(new Date(featured.date));
        }
      }
    } catch (err: any) {
      console.error("Etkinlikler çekilemedi:", err);
      setError("Bağlantı Hatası: Etkinlikler veritabanından yüklenemedi. Lütfen internet bağlantınızı veya API ayarlarını kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = (targetDate: Date) => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-[var(--brand-primary)]">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-mono text-muted">Etkinlikler Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-page pt-24 flex items-center justify-center">
        <DatabaseError message={error} onRetry={fetchEvents} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Featured Event (Büyük Etkinlik) */}
      {featuredEvent && (
        <section className="pt-28 pb-16 px-4 sm:px-8 lg:px-20 bg-page">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left - Details */}
              <div className="col-span-1 lg:col-span-6 flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-primary)]"></span>
                  </span>
                  <span className="text-sm font-bold text-[var(--brand-primary)] tracking-widest uppercase">
                    ÇOK YAKINDA ...
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">{featuredEvent.title}</h2>
                <p className="text-base sm:text-xl text-muted leading-relaxed font-medium mb-6 sm:mb-8">
                  {featuredEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)] flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-bold text-[10px] uppercase tracking-wider mb-0.5">Tarih / Saat</div>
                      <div className="font-bold text-primary">{new Date(featuredEvent.date).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)] flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-bold text-[10px] uppercase tracking-wider mb-0.5">Yer</div>
                      <div className="font-bold text-primary line-clamp-1">{featuredEvent.location || 'Belirtilmemiş'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-xl bg-surface border border-default flex items-center justify-center text-[var(--brand-primary)] flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-muted font-bold text-[10px] uppercase tracking-wider mb-0.5">Kontenjan</div>
                      <div className="font-bold text-primary">{featuredEvent.capacity ? `${featuredEvent.capacity} Kişi` : 'Sınırsız'}</div>
                    </div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-10">
                  <div className="text-[10px] text-muted font-bold tracking-widest mb-3 font-mono">GERİ SAYIM</div>
                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      { label: 'GÜN', value: countdown.days },
                      { label: 'SAAT', value: countdown.hours },
                      { label: 'DAK', value: countdown.mins },
                      { label: 'SAN', value: countdown.secs }
                    ].map((unit, idx) => (
                      <div key={idx} className="flex items-baseline gap-1.5 bg-surface border border-default px-4 py-2.5 rounded-xl shadow-sm">
                        <span className="text-2xl font-black font-mono text-primary">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-semibold text-muted font-mono">{unit.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {featuredEvent.registration_url && (
                    <Button href={featuredEvent.registration_url} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" className="w-full sm:w-auto px-8 rounded-xl shadow-dynamic font-bold">
                      Hemen Kayıt Ol <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  <Link to={`/etkinlikler/${featuredEvent.id}`} className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-surface hover:bg-elevated border-default">
                      Detayları İncele
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Poster Image */}
              <div className="col-span-1 lg:col-span-6 relative">
                <div className="relative rounded-dynamic overflow-hidden border border-default shadow-dynamic aspect-[4/3] bg-surface group">
                  {featuredEvent.image_url ? (
                    <img
                      src={featuredEvent.image_url}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted font-bold">Görsel Yok</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/20 to-transparent mix-blend-overlay"></div>

                  {/* Premium floating date badge on top-left of the poster image */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="inline-block bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 font-bold text-white tracking-widest text-xs shadow-2xl">
                      {new Date(featuredEvent.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }).toUpperCase()}
                    </div>
                  </div>
                </div>
                {/* Glow decoration behind image */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--brand-primary)] rounded-full blur-[80px] opacity-20 -z-10" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Upcoming Events Ticket Style */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-surface border-y border-default overflow-hidden">
          <div className="max-w-[1000px] mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">Yaklaşan Etkinlikler</h2>
              <p className="text-sm sm:text-base text-muted font-medium">Biletini al, yerini garantile.</p>
            </div>

            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <TicketCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">Geçmiş Etkinlikler</h2>
            <p className="text-sm sm:text-base text-muted font-medium">Başarıyla tamamladığımız ve iz bırakan etkinlikler</p>
          </div>

          {/* Animated Timeline */}
          <PastEventsTimeline events={pastEvents} />
        </div>
      </section>
    </div>
  );
}
