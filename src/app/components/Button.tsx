import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  asLink?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  href,
  asLink = false,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-[#534AB7] text-white hover:bg-[#7F77DD] hover:shadow-lg hover:shadow-[#534AB7]/30',
    secondary: 'bg-transparent border border-[#534AB7] text-[#7F77DD] hover:bg-[#534AB7]/10 hover:border-[#7F77DD]',
    ghost: 'bg-transparent text-[#6B7280] hover:text-white hover:bg-[#374151]',
    destructive: 'bg-[#D4183D] text-white hover:bg-[#B01435]'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (asLink && href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
