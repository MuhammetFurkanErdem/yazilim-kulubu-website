import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';

export function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error("Üyeler çekilemedi:", error);
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

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      {/* Leadership Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">Ekibimiz</h1>
            <p className="text-base sm:text-xl text-muted font-medium max-w-2xl mx-auto">
              Kulübümüzü ileriye taşıyan, projeler üreten ve topluluğumuzu büyüten harika ekibimizle tanışın.
            </p>
          </div>

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
                      className="absolute inset-0 w-full h-full object-cover filter contrast-110 transition-all duration-500 group-hover:scale-105 dark:grayscale dark:contrast-125 dark:group-hover:grayscale-0"
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
                    {member.linkedin_url ? (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    ) : (
                      <div className="w-5 h-5 text-muted opacity-20"><Linkedin className="w-5 h-5" /></div>
                    )}
                    {member.instagram_url ? (
                      <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Instagram className="w-5 h-5" />
                      </a>
                    ) : (
                      <div className="w-5 h-5 text-muted opacity-20"><Instagram className="w-5 h-5" /></div>
                    )}
                    {member.github_url ? (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
                        <Github className="w-5 h-5" />
                      </a>
                    ) : (
                      <div className="w-5 h-5 text-muted opacity-20"><Github className="w-5 h-5" /></div>
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