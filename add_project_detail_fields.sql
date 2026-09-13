-- Proje detay sayfası (uzun açıklama + galeri) için gerekli yeni sütunlar.
-- Supabase SQL Editor üzerinde çalıştırın:

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS long_description text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS gallery_urls text[];
