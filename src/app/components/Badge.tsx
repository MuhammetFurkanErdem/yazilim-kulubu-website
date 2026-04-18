import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'brand' | 'web' | 'mobile' | 'game' | 'blockchain' | 'member' | 'neutral';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'brand', children, className = '' }: BadgeProps) {
  const variantClasses = {
    brand: 'bg-[#26215C] border-[#534AB7] text-[#CECBF6]',
    web: 'bg-[#26215C] border-[#534AB7] text-[#CECBF6]',
    mobile: 'bg-[#0a3d2f] border-[#1D9E75] text-[#8fead4]',
    game: 'bg-[#3d1f14] border-[#D85A30] text-[#f5c3ad]',
    blockchain: 'bg-[#3d2f0f] border-[#BA7517] text-[#f5d89e]',
    member: 'bg-[#3d1a28] border-[#D4537E] text-[#f5b7d1]',
    neutral: 'bg-[#374151] border-[#6B7280] text-[#9CA3AF]'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
