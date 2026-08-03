import React from 'react';
import { useHeicUrl } from '@/hooks/useHeicUrl';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
}

export function SmartImage({ src, alt = '', className = '', ...props }: SmartImageProps) {
  const displaySrc = useHeicUrl(src);

  return (
    <img
      src={displaySrc || src}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
