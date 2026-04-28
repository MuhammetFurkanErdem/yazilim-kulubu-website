import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'brand' | 'web' | 'mobile' | 'game' | 'blockchain' | 'member' | 'neutral';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'brand', children, className = '' }: BadgeProps) {
  const variantClasses = {
    brand: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-[#26215C] dark:border-[#534AB7] dark:text-[#CECBF6]',
    web: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-[#26215C] dark:border-[#534AB7] dark:text-[#CECBF6]',
    mobile: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-[#0a3d2f] dark:border-[#1D9E75] dark:text-[#8fead4]',
    game: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-[#3d1f14] dark:border-[#D85A30] dark:text-[#f5c3ad]',
    blockchain: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-[#3d2f0f] dark:border-[#BA7517] dark:text-[#f5d89e]',
    member: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-[#3d1a28] dark:border-[#D4537E] dark:text-[#f5b7d1]',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-[#374151] dark:border-[#6B7280] dark:text-[#9CA3AF]'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
