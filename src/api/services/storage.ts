import { supabase } from '../config';
import heic2any from 'heic2any';

export const storageService = {
  // Convert HEIC / HEIF to JPEG if needed
  async processImage(file: File): Promise<File> {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif') || 
                   file.type === 'image/heic' || 
                   file.type === 'image/heif';

    if (!isHeic) return file;

    return new Promise<File>((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const newName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
              resolve(new File([blob], newName, { type: 'image/jpeg' }));
              return;
            }
            this.fallbackHeic2Any(file).then(resolve);
          }, 'image/jpeg', 0.88);
          return;
        }
        this.fallbackHeic2Any(file).then(resolve);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        this.fallbackHeic2Any(file).then(resolve);
      };

      img.src = url;
    });
  },

  async fallbackHeic2Any(file: File): Promise<File> {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.88
      });
      const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
      return new File([resultBlob], newFileName, { type: 'image/jpeg' });
    } catch (err) {
      console.error('HEIC dönüşüm hatası:', err);
      return file;
    }
  },

  // Dosya Yükleme (Örn: bucket = 'project-images' veya 'event-covers')
  async uploadImage(bucket: string, file: File, path?: string) {
    // Check & convert HEIC to JPEG
    const processedFile = await this.processImage(file);

    const fileExt = processedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, processedFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;
    
    // Yüklenen dosyanın public (herkese açık) URL'ini al
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Dosya Silme
  async deleteImage(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  }
};
