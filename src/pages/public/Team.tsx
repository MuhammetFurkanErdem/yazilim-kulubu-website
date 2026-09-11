import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';
import { withTimeout } from '@/utils/promise';
import { DatabaseError } from '@/components/shared/DatabaseError';
import { Button } from '@/components/shared/Button';

type PublicTeamMember = {
  public_id: string;
  display_order: number;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  github_url: string | null;
};

export function Team() {
  const [members, setMembers] = useState<PublicTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await withTimeout<{
        data: PublicTeamMember[] | null;
        error: any;
      }>(
        supabase.rpc('get_public_team_members'),
        5000
      );
      if (dbError) throw dbError;
      setMembers(data || []);
    } catch (err: any) {
      console.error("Üyeler çekilemedi:", err);
      setError("Bağlantı Hatası: Ekip üyeleri veritabanından yüklenemedi. Lütfen internet bağlantınızı veya API ayarlarını kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-[var(--brand-primary)] bg-page">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-mono text-muted">Ekibimiz Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-page pt-24 flex items-center justify-center">
        <DatabaseError message={error} onRetry={fetchMembers} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Leadership Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">Ekibimiz</h1>
            <p className="text-base sm:text-lg text-muted font-medium max-w-2xl mx-auto">
              Kulübün çalışmalarını birlikte yürüten üretken ekiple tanış.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {members.map((member, idx) => (
              <motion.div
                key={member.public_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="w-full max-w-[380px] flex flex-col bg-surface border border-default rounded-xl overflow-hidden shadow-sm group"
              >
                {/* Photo Side */}
                <div className="w-full aspect-square relative overflow-hidden bg-page flex items-center justify-center">
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={`${member.first_name} ${member.last_name}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-muted opacity-50">
                      {(member.first_name?.[0] || '') + (member.last_name?.[0] || '')}
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="w-full p-6 flex flex-col bg-surface flex-1">
                  <h3 className="text-xl font-bold mb-1 font-mono tracking-tight text-primary">{member.first_name} {member.last_name}</h3>
                  <p className="text-sm font-mono font-bold text-[var(--brand-primary)] dark:text-[#b490ff] mb-5">{member.position || 'Üye'}</p>

                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-5 mt-auto" />

                  <div className="flex items-center gap-5">
                    {member.linkedin_url && member.linkedin_url.trim() !== '' && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`${member.first_name ?? ''} ${member.last_name ?? ''} LinkedIn profili`.trim()} className="touch-target inline-flex items-center justify-center rounded-xl text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram_url && member.instagram_url.trim() !== '' && (
                      <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" aria-label={`${member.first_name ?? ''} ${member.last_name ?? ''} Instagram profili`.trim()} className="touch-target inline-flex items-center justify-center rounded-xl text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.github_url && member.github_url.trim() !== '' && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer" aria-label={`${member.first_name ?? ''} ${member.last_name ?? ''} GitHub profili`.trim()} className="touch-target inline-flex items-center justify-center rounded-xl text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {members.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted font-medium mb-5">Ekip bilgileri yakında burada yayınlanacak.</p>
              <Button href="https://docs.google.com/forms/d/e/1FAIpQLSfuwWAWqtpjasdHr9SyZfBZt1LrPGmc2y80bfLXY1H-f7Hsrg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
                Bize Katıl
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
