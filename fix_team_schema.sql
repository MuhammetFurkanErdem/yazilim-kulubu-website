-- Supabase SQL Editor üzerinde bu sorguyu çalıştırarak ekip üyesi ekleme ve silme kısıtlamalarını çözebilirsiniz:

-- 1. profiles tablosunun auth.users(id) üzerindeki zorunluluğunu kaldırın (böylece auth hesabı olmayan ekip üyeleri de eklenebilir):
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. Profil silindiğinde etkinlik ve projelerin silinmesini engellemek için foreign key bağlarını düzenleyin:
ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_created_by_fkey;
ALTER TABLE public.events ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_created_by_fkey;
ALTER TABLE public.projects ADD CONSTRAINT projects_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.project_members DROP CONSTRAINT IF EXISTS project_members_profile_id_fkey;
ALTER TABLE public.project_members ADD CONSTRAINT project_members_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
