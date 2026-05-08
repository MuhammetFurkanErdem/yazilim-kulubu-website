import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'brand' | 'web' | 'mobile' | 'game' | 'blockchain' | 'member' | 'neutral';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'brand', children, className = '' }: BadgeProps) {
  const variantClasses = {
    brand: 'text-[var(--brand-primary)] border-l-[var(--brand-primary)] bg-[var(--brand-primary)]/5',
    web: 'text-blue-500 border-l-blue-500 bg-blue-500/5',
    mobile: 'text-emerald-500 border-l-emerald-500 bg-emerald-500/5',
    game: 'text-orange-500 border-l-orange-500 bg-orange-500/5',
    blockchain: 'text-yellow-500 border-l-yellow-500 bg-yellow-500/5',
    member: 'text-pink-500 border-l-pink-500 bg-pink-500/5',
    neutral: 'text-muted border-l-default bg-surface'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-transparent border-l-2 text-[10px] font-bold uppercase tracking-widest font-mono shadow-sm backdrop-blur-sm ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
