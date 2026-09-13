-- Ekip üyesi kartlarına tıklanabilir detay modalı eklemek için gerekli yeni sütunlar.
-- Supabase SQL Editor üzerinde çalıştırın:

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;
