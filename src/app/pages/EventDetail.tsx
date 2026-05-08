import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';

export function EventDetail() {
  const { id } = useParams();

  // Dummy data based on the route or ID. In a real app, this would be fetched from backend.
  const event = {
    name: "Kış Hackathon '24",
    type: "Hackathon",
    date: "15-16 Aralık 2024",
    location: "ÇOMÜ Kütüphane",
    attendees: 45,
    variant: "web",
    description: "48 saat boyunca aralıksız kod yazdığımız, yorulup pizzalara gömüldüğümüz ve sonunda birbirinden harika 10 farklı projenin ortaya çıktığı inanılmaz bir maratondu. Takımlar, kampüs içi ulaşım ve sürdürülebilirlik üzerine çözümler ürettiler.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
    ]
  };

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
                Tamamlandı
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-10 tracking-tight leading-tight">
              {event.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted font-medium bg-page border border-default p-4 rounded-2xl max-w-fit shadow-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--brand-primary)]" />
                {event.date}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-default"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                {event.location}
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-default"></div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--brand-primary)]" />
                {event.attendees} Katılımcı
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-8 lg:px-20 border-b border-default bg-page">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-xl md:text-2xl text-primary leading-relaxed font-medium">
            {event.description}
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
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
            {event.gallery.map((photo, idx) => (
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
                  alt={`${event.name} Anısı ${idx + 1}`}
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
    </div>
  );
}
