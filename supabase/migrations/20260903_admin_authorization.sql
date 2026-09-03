begin;

-- Central authorization check used by all administrative RLS policies.
-- SECURITY DEFINER avoids recursive RLS evaluation on public.profiles.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.applications enable row level security;
alter table public.events enable row level security;
alter table public.page_views enable row level security;
alter table public.profiles enable row level security;
alter table public.project_members enable row level security;
alter table public.projects enable row level security;
alter table public.site_settings enable row level security;
alter table storage.objects enable row level security;

-- Remove the existing policies that treat every signed-in user as an admin.
drop policy if exists "Enable all for authenticated users on applications" on public.applications;
drop policy if exists "Enable all for authenticated users on events" on public.events;
drop policy if exists "Enable read access for all on events" on public.events;
drop policy if exists "Ziyaretciler sayfa goruntulemesi ekleyebilir" on public.page_views;
drop policy if exists "Sadece admin okuyabilir" on public.page_views;
drop policy if exists "Enable all for authenticated users on profiles" on public.profiles;
drop policy if exists "Enable read access for all on profiles" on public.profiles;
drop policy if exists "Enable all for authenticated users on project_members" on public.project_members;
drop policy if exists "Enable all for authenticated users on projects" on public.projects;
drop policy if exists "Enable read access for all on projects" on public.projects;
drop policy if exists "Enable all for authenticated users on site_settings" on public.site_settings;
drop policy if exists "Enable read access for all on site_settings" on public.site_settings;
drop policy if exists "Allow authenticated full access to storage" on storage.objects;
drop policy if exists "Allow public read access to storage" on storage.objects;

-- Make this migration safe to re-run.
drop policy if exists "Public can submit applications" on public.applications;
drop policy if exists "Admins can manage applications" on public.applications;
drop policy if exists "Public can read events" on public.events;
drop policy if exists "Admins can manage events" on public.events;
drop policy if exists "Visitors can record page views" on public.page_views;
drop policy if exists "Admins can read page views" on public.page_views;
drop policy if exists "Public can read profiles" on public.profiles;
drop policy if exists "Admins can manage profiles" on public.profiles;
drop policy if exists "Admins can manage project members" on public.project_members;
drop policy if exists "Public can read approved projects" on public.projects;
drop policy if exists "Admins can manage projects" on public.projects;
drop policy if exists "Public can read site settings" on public.site_settings;
drop policy if exists "Admins can manage site settings" on public.site_settings;
drop policy if exists "Public can read club media" on storage.objects;
drop policy if exists "Admins can manage club media" on storage.objects;

-- Remove broad default grants, including TRUNCATE/TRIGGER/REFERENCES.
revoke all privileges on table public.applications from anon, authenticated;
revoke all privileges on table public.events from anon, authenticated;
revoke all privileges on table public.page_views from anon, authenticated;
revoke all privileges on table public.profiles from anon, authenticated;
revoke all privileges on table public.project_members from anon, authenticated;
revoke all privileges on table public.projects from anon, authenticated;
revoke all privileges on table public.site_settings from anon, authenticated;
revoke all privileges on table storage.objects from anon, authenticated;

-- Exact table privileges required by the current application.
grant insert on table public.applications to anon;
grant select, insert, update, delete on table public.applications to authenticated;

grant select on table public.events to anon;
grant select, insert, update, delete on table public.events to authenticated;

grant insert on table public.page_views to anon;
grant select, insert on table public.page_views to authenticated;

grant select on table public.profiles to anon;
grant select, insert, update, delete on table public.profiles to authenticated;

grant select, insert, update, delete on table public.project_members to authenticated;

grant select on table public.projects to anon;
grant select, insert, update, delete on table public.projects to authenticated;

grant select on table public.site_settings to anon;
grant select, insert, update, delete on table public.site_settings to authenticated;

grant select on table storage.objects to anon, authenticated;
grant insert, update, delete on table storage.objects to authenticated;

-- Public forms may create only pending, recognized application types.
create policy "Public can submit applications"
on public.applications
for insert
to anon, authenticated
with check (
  status = 'pending'
  and type in ('contact', 'join', 'project')
);

create policy "Admins can manage applications"
on public.applications
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Public can read events"
on public.events
for select
to anon, authenticated
using (true);

create policy "Admins can manage events"
on public.events
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Visitors can record page views"
on public.page_views
for insert
to anon, authenticated
with check (true);

create policy "Admins can read page views"
on public.page_views
for select
to authenticated
using ((select public.is_admin()));

-- Public team pages currently read profile rows directly.
create policy "Public can read profiles"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "Admins can manage profiles"
on public.profiles
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can manage project members"
on public.project_members
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Public can read approved projects"
on public.projects
for select
to anon, authenticated
using (status = 'approved');

create policy "Admins can manage projects"
on public.projects
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "Admins can manage site settings"
on public.site_settings
for all
to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- Only the buckets used by this application are exposed.
create policy "Public can read club media"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('event-covers', 'project-images'));

create policy "Admins can manage club media"
on storage.objects
for all
to authenticated
using (
  bucket_id in ('event-covers', 'project-images')
  and (select public.is_admin())
)
with check (
  bucket_id in ('event-covers', 'project-images')
  and (select public.is_admin())
);

commit;
