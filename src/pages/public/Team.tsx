import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Mail, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/api/config';
import { withTimeout } from '@/utils/promise';
import { DatabaseError } from '@/components/shared/DatabaseError';
import { Modal } from '@/components/shared/Modal';

type CardSize = 'xl' | 'lg' | 'md' | 'sm';

const CARD_STYLES: Record<CardSize, { card: string; name: string; position: string; padding: string; icon: string }> = {
  xl: { card: 'w-56 sm:w-72', name: 'text-base sm:text-xl', position: 'text-[11px] sm:text-sm', padding: 'p-4 sm:p-6', icon: 'w-4 h-4 sm:w-5 sm:h-5' },
  lg: { card: 'w-48 sm:w-60', name: 'text-sm sm:text-lg', position: 'text-[10px] sm:text-sm', padding: 'p-3.5 sm:p-5', icon: 'w-4 h-4 sm:w-[18px] sm:h-[18px]' },
  md: { card: 'w-40 sm:w-52', name: 'text-sm sm:text-base', position: 'text-[10px] sm:text-xs', padding: 'p-3 sm:p-4', icon: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
  sm: { card: 'w-full max-w-[300px]', name: 'text-base sm:text-lg', position: 'text-xs sm:text-sm', padding: 'p-5 sm:p-6', icon: 'w-4 h-4 sm:w-5 sm:h-5' },
};

function normalizeTr(value: string) {
  return (value || '').toLocaleLowerCase('tr-TR').trim();
}

/**
 * Serbest metin `position` alanından organizasyon şemasındaki katmanı çıkarır.
 * 1: Kulüp Başkanı, 2: Başkan Yardımcıları, 3: Kol Başkanları, 4: Yönetim Kurulu (geri kalan herkes)
 */
function classifyMember(member: any): 1 | 2 | 3 | 4 {
  const pos = normalizeTr(member.position);
  if (!pos) return 4;
  const hasBaskan = pos.includes('başkan');
  const hasYardimci = pos.includes('yardımc');
  const hasKol = pos.includes('kol');
  if (hasYardimci) return 2;
  if (hasBaskan && hasKol) return 3;
  if (hasBaskan) return 1;
  return 4;
}

function MemberCard({ member, size, index, fallbackLabel = 'Üye', onSelect }: { member: any; size: CardSize; index: number; fallbackLabel?: string; onSelect: (member: any) => void }) {
  const s = CARD_STYLES[size];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onSelect(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(member); } }}
      className={`${s.card} flex-shrink-0 flex flex-col bg-surface border border-default rounded-xl overflow-hidden shadow-sm group card-interactive cursor-pointer focus-ring`}
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
          <div className="text-2xl sm:text-4xl font-bold text-muted opacity-50">
            {(member.first_name?.[0] || '') + (member.last_name?.[0] || '')}
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className={`w-full ${s.padding} flex flex-col bg-surface flex-1`}>
        <h3 className={`${s.name} font-bold mb-1 font-mono tracking-tight text-primary truncate`}>{member.first_name} {member.last_name}</h3>
        <p className={`${s.position} font-mono font-bold text-[var(--brand-primary)] mb-3 sm:mb-5`}>{member.position || fallbackLabel}</p>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-3 sm:mb-5 mt-auto" />

        <div className="flex items-center gap-3 sm:gap-5">
          {member.linkedin_url && member.linkedin_url.trim() !== '' && (
            <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
              <Linkedin className={s.icon} />
            </a>
          )}
          {member.instagram_url && member.instagram_url.trim() !== '' && (
            <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
              <Instagram className={s.icon} />
            </a>
          )}
          {member.github_url && member.github_url.trim() !== '' && (
            <a href={member.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted hover:text-[var(--brand-primary)] icon-interactive">
              <Github className={s.icon} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TierRow({ members, size, showTrunk = true, fallbackLabel, onSelect }: { members: any[]; size: CardSize; showTrunk?: boolean; fallbackLabel?: string; onSelect: (member: any) => void }) {
  if (members.length === 0) return null;
  const isMulti = members.length > 1;
  return (
    <div className="flex flex-col items-center">
      {showTrunk && <div className="w-px h-8 sm:h-10 bg-[var(--brand-primary)]/30" />}
      <div className="relative flex items-start justify-center gap-4 sm:gap-10">
        {isMulti && <div className="absolute top-0 left-0 right-0 h-px bg-[var(--brand-primary)]/30" />}
        {members.map((m, idx) => (
          <div key={m.id} className="flex flex-col items-center">
            {isMulti && <div className="w-px h-6 sm:h-8 bg-[var(--brand-primary)]/30" />}
            <MemberCard member={m} size={size} index={idx} fallbackLabel={fallbackLabel} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);

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

  const president = members.filter(m => classifyMember(m) === 1);
  const vices = members.filter(m => classifyMember(m) === 2);
  const branchLeads = members.filter(m => classifyMember(m) === 3);
  const board = members.filter(m => classifyMember(m) === 4);

  return (
    <div className="min-h-screen bg-page transition-colors duration-300">
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-20 bg-page">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ekibimiz</h1>
            <p className="text-sm sm:text-base text-muted font-medium max-w-2xl mx-auto">
              Kulübümüzü yöneten ekibimizle organizasyon şemamız üzerinden tanışın.
            </p>
          </div>

          {members.length === 0 ? (
            <div className="text-center text-muted font-medium py-12">
              Henüz ekip üyesi bulunmamaktadır.
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <div className="min-w-full flex flex-col items-center px-2 pb-6">
                <TierRow members={president} size="xl" showTrunk={false} fallbackLabel="Kulüp Başkanı" onSelect={setSelectedMember} />
                <TierRow members={vices} size="lg" fallbackLabel="Başkan Yardımcısı" onSelect={setSelectedMember} />
                <TierRow members={branchLeads} size="md" fallbackLabel="Kol Başkanı" onSelect={setSelectedMember} />

                {board.length > 0 && (
                  <>
                    <div className="w-px h-8 sm:h-10 bg-[var(--brand-primary)]/30" />
                    <div className="text-center mb-8 sm:mb-10 max-w-xl px-4">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">Yönetim Kurulu</h2>
                      <p className="text-xs sm:text-sm text-muted font-medium">
                        Sosyal medya sorumlusu, tasarımcı, sponsorluk ekibi, developers ve organizasyon ekibinden oluşan yönetim kurulu üyelerimiz.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center w-full max-w-[1000px]">
                      {board.map((m, idx) => (
                        <MemberCard key={m.id} member={m} size="sm" index={idx} fallbackLabel="Yönetim Kurulu Üyesi" onSelect={setSelectedMember} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember ? `${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim() : ''}
      >
        {selectedMember && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface border border-default flex-shrink-0 flex items-center justify-center">
                {selectedMember.avatar_url ? (
                  <img src={selectedMember.avatar_url} alt={selectedMember.first_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-muted opacity-50">
                    {(selectedMember.first_name?.[0] || '') + (selectedMember.last_name?.[0] || '')}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-mono font-bold text-[var(--brand-primary)] text-sm">{selectedMember.position || 'Üye'}</p>
                {selectedMember.department && (
                  <p className="text-sm text-muted font-medium">{selectedMember.department}</p>
                )}
              </div>
            </div>

            {selectedMember.bio && selectedMember.bio.trim() !== '' && (
              <p className="text-sm text-primary leading-relaxed">{selectedMember.bio}</p>
            )}

            <div className="pt-4 border-t border-default space-y-3">
              <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">İletişim</div>

              {selectedMember.email && selectedMember.email.trim() !== '' && (
                <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{selectedMember.email}</span>
                </a>
              )}
              {selectedMember.linkedin_url && selectedMember.linkedin_url.trim() !== '' && (
                <a href={selectedMember.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{selectedMember.linkedin_url}</span>
                </a>
              )}
              {selectedMember.github_url && selectedMember.github_url.trim() !== '' && (
                <a href={selectedMember.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{selectedMember.github_url}</span>
                </a>
              )}
              {selectedMember.instagram_url && selectedMember.instagram_url.trim() !== '' && (
                <a href={selectedMember.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-surface border border-default flex items-center justify-center flex-shrink-0 text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-primary group-hover:text-[var(--brand-primary)] transition-colors break-all">{selectedMember.instagram_url}</span>
                </a>
              )}
              {!selectedMember.email && !selectedMember.linkedin_url && !selectedMember.github_url && !selectedMember.instagram_url && (
                <p className="text-sm text-muted">Henüz iletişim bilgisi eklenmemiş.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
