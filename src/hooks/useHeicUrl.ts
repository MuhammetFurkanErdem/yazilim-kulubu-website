import { useState, useEffect } from 'react';
import heic2any from 'heic2any';

// Memory cache for converted HEIC URLs so we don't re-convert the same URL twice
const heicCache = new Map<string, string>();

export function useHeicUrl(src: string | null | undefined): string {
  const [displayUrl, setDisplayUrl] = useState<string>(src || '');

  useEffect(() => {
    if (!src) {
      setDisplayUrl('');
      return;
    }

    const isHeicUrl = src.toLowerCase().includes('.heic') || src.toLowerCase().includes('.heif');
    if (!isHeicUrl) {
      setDisplayUrl(src);
      return;
    }

    // Check memory cache
    if (heicCache.has(src)) {
      setDisplayUrl(heicCache.get(src)!);
      return;
    }

    // Convert remote HEIC URL to displayable JPEG blob URL
    let isMounted = true;
    fetch(src)
      .then(res => res.blob())
      .then(blob => heic2any({ blob, toType: 'image/jpeg', quality: 0.85 }))
      .then(converted => {
        const resultBlob = Array.isArray(converted) ? converted[0] : converted;
        const objectUrl = URL.createObjectURL(resultBlob);
        heicCache.set(src, objectUrl);
        if (isMounted) setDisplayUrl(objectUrl);
      })
      .catch(err => {
        console.error('Remote HEIC conversion error:', err);
        if (isMounted) setDisplayUrl(src);
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  return displayUrl;
}
