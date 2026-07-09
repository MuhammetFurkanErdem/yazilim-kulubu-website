import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';
import { withTimeout } from '@/utils/promise';
import { DatabaseError } from '@/components/shared/DatabaseError';

export function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await withTimeout<any>(
        supabase.from('profiles').select('*').order('created_at', { ascending: true }),
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {members.map((member, idx) => (
              <motion.div
                key={member.id}
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
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram_url && member.instagram_url.trim() !== '' && (
                      <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.github_url && member.github_url.trim() !== '' && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {members.length === 0 && !isLoading && (
            <div className="text-center text-muted font-medium py-12">
              Henüz ekip üyesi bulunmamaktadır.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}