import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Users, Clock, Zap } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useState, useEffect } from 'react';

export function Events() {
  const [filter, setFilter] = useState('all');
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

  const filters = [
    { id: 'all', label: 'Tümü', icon: null },
    { id: 'hackathon', label: 'Hackathon', icon: '⚡' },
    { id: 'workshop', label: 'Workshop', icon: '⚙' },
    { id: 'talk', label: 'Talk', icon: '🎙' },
    { id: 'social', label: 'Sosyal', icon: '🤝' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-20 grid-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#534AB7] rounded-full blur-[120px] opacity-10" />
        
        <div className="relative z-10 max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[64px] font-bold mb-6">
              <span className="text-[#7F77DD]">Etkinlikler</span> & Buluşmalar
            </h1>
            <p className="text-lg text-[#6B7280] max-w-[720px] mx-auto leading-relaxed">
              Workshop'lardan hackathon'lara, sektör konuşmalarından sosyal etkinliklere kadar tüm aktivitelerimiz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-20 border-b border-[#374151]">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.id
                  ? 'bg-[#534AB7] text-white'
                  : 'bg-[#111827] border border-[#374151] text-[#6B7280] hover:border-[#534AB7]'
              }`}
            >
              {f.icon && <span className="mr-2">{f.icon}</span>}
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative grid grid-cols-12 gap-8 bg-[#111827] border border-[#534AB7]/30 rounded-2xl overflow-hidden accent-line"
          >
            {/* Left - Details */}
            <div className="col-span-7 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-500 font-medium">Kayıtlar Açık</span>
              </div>

              <Badge variant="web" className="mb-4">
                <Zap className="w-3 h-3" />
                Hackathon
              </Badge>

              <h2 className="text-4xl font-bold mb-4">İlkbahar Hackathon '25</h2>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                24 saat sürecek yoğun kodlama maratonunda takımınla birlikte gerçek dünya problemlerine çözüm üret.
                Ödüller, mentor desteği ve bol kahve ile dolu bir hafta sonu seni bekliyor!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-[#7F77DD]" />
                  <div>
                    <div className="text-[#6B7280]">Tarih</div>
                    <div className="font-medium">15-16 Nisan 2025</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#7F77DD]" />
                  <div>
                    <div className="text-[#6B7280]">Yer</div>
                    <div className="font-medium">Terzioğlu Kampüsü</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-5 h-5 text-[#7F77DD]" />
                  <div>
                    <div className="text-[#6B7280]">Kontenjan</div>
                    <div className="font-medium">60 kişi</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-[#7F77DD]" />
                  <div>
                    <div className="text-[#6B7280]">Süre</div>
                    <div className="font-medium">24 saat</div>
                  </div>
                </div>
              </div>

              {/* Mini Countdown */}
              <div className="bg-[#0D0D14] rounded-xl p-4 mb-6">
                <div className="text-xs text-[#6B7280] mb-2 font-mono">GERİ SAYIM</div>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'GÜN', value: countdown.days },
                    { label: 'SAAT', value: countdown.hours },
                    { label: 'DAK', value: countdown.mins },
                    { label: 'SAN', value: countdown.secs }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div className="text-2xl font-bold font-mono text-[#7F77DD]">
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-[#6B7280] font-mono">{unit.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="primary" size="lg">
                  Kayıt Ol <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="lg">
                  Detayları Gör
                </Button>
              </div>
            </div>

            {/* Right - Poster */}
            <div className="col-span-5 relative bg-gradient-to-br from-[#1a0f3c] to-[#26215C] flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-4 leading-tight">
                  İlkbahar<br />
                  <span className="text-[#7F77DD]">Hackathon</span><br />
                  '25
                </div>
                <div className="inline-block bg-[#0D0D14] rounded-lg px-4 py-2 font-mono text-sm">
                  15-16 NİSAN
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 px-20 bg-[#111827]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="text-[42px] font-bold mb-4">Yaklaşan Etkinlikler</h2>
            <p className="text-lg text-[#6B7280]">Önümüzdeki haftalarda düzenlenecek aktiviteler</p>
          </div>

          <div className="space-y-4">
            {[
              {
                date: { day: '22', month: 'MAR' },
                badge: 'Workshop',
                variant: 'web',
                title: 'Next.js & Supabase ile Full Stack Web',
                desc: 'Modern web geliştirme araçlarıyla production-ready uygulama geliştirmeyi öğren',
                time: '18:00',
                location: 'Online - Zoom',
                capacity: '40 kişi'
              },
              {
                date: { day: '28', month: 'MAR' },
                badge: 'Talk',
                variant: 'neutral',
                title: 'Kariyer Konuşması: Yazılımcı Olarak İlk Yılım',
                desc: 'Sektörde çalışan mezunlarımızdan tecrübe paylaşımı',
                time: '19:00',
                location: 'Amfi 3',
                capacity: '100 kişi'
              },
              {
                date: { day: '05', month: 'NİS' },
                badge: 'Workshop',
                variant: 'mobile',
                title: 'Flutter ile Mobil Uygulama Geliştirme',
                desc: 'Cross-platform mobil uygulama geliştirmenin temellerini öğren',
                time: '14:00',
                location: 'Lab 2',
                capacity: '30 kişi'
              },
              {
                date: { day: '12', month: 'NİS' },
                badge: 'Sosyal',
                variant: 'neutral',
                title: 'YGK Kahve Buluşması',
                desc: 'Rahat bir ortamda sohbet, networking ve oyun',
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
                className="group flex items-center gap-6 bg-[#111827] border border-[#374151] rounded-2xl p-6 hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 hover:border-[#534AB7]"
              >
                {/* Date Box */}
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#534AB7] to-[#7F77DD] rounded-xl flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">{event.date.day}</div>
                  <div className="text-xs font-mono">{event.date.month}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Badge variant={event.variant as any} className="mb-2">{event.badge}</Badge>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#7F77DD] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-3">{event.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {event.capacity}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <Button variant="secondary" size="sm">
                  Kayıt Ol
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <h2 className="text-[42px] font-bold mb-4">Geçmiş Etkinlikler</h2>
            <p className="text-lg text-[#6B7280]">Başarıyla tamamladığımız etkinlikler</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Kış Hackathon \'24', type: 'Hackathon', date: 'Aralık 2024', attendees: 45, variant: 'web' },
              { name: 'AI/ML Workshop Serisi', type: 'Workshop', date: 'Kasım 2024', attendees: 60, variant: 'mobile' },
              { name: 'Open Source Günü', type: 'Talk', date: 'Ekim 2024', attendees: 80, variant: 'game' }
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#534AB7] to-[#7F77DD] flex items-center justify-center p-6">
                  <div className="absolute top-4 right-4">
                    <Badge variant="neutral">Past Event</Badge>
                  </div>
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-2">{event.name}</div>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant={event.variant as any} className="mb-3">{event.type}</Badge>
                  <div className="text-sm text-[#6B7280] mb-2">{event.date}</div>
                  <div className="text-sm text-[#6B7280]">
                    <Users className="w-4 h-4 inline mr-1" />
                    {event.attendees} katılımcı
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
