begin;

-- A profile may belong to an authentication account without being intended
-- for publication on the public team page.
alter table public.profiles
  add column if not exists is_public boolean;

update public.profiles
set is_public = true
where is_public is null;

alter table public.profiles
  alter column is_public set default true,
  alter column is_public set not null;

-- A parameterless, fixed-return RPC exposes only the fields needed by the
-- public team page. SECURITY DEFINER is required because the base table will
-- no longer be readable by visitors; the empty search path prevents object
-- shadowing attacks.
drop view if exists public.team_members_public;
drop function if exists public.get_public_team_members();

create function public.get_public_team_members()
returns table (
  public_id text,
  display_order bigint,
  first_name text,
  last_name text,
  "position" text,
  avatar_url text,
  linkedin_url text,
  instagram_url text,
  github_url text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    pg_catalog.md5(p.id::text) as public_id,
    row_number() over (order by p.created_at nulls last, p.id) as display_order,
    p.first_name::text,
    p.last_name::text,
    p.position::text,
    p.avatar_url::text,
    p.linkedin_url::text,
    p.instagram_url::text,
    p.github_url::text
  from public.profiles as p
  where p.is_public = true
    and p.first_name is not null
    and p.last_name is not null
  order by p.created_at nulls last, p.id;
$$;

revoke all on function public.get_public_team_members()
from public, anon, authenticated;

grant execute on function public.get_public_team_members()
to anon, authenticated;

-- Remove direct public access to the base table. Authenticated users retain
-- the SQL privilege, but the existing admin-only RLS policy decides who can
-- actually read or modify profile rows.
drop policy if exists "Public can read profiles" on public.profiles;

revoke select on table public.profiles from public, anon, authenticated;
grant select on table public.profiles to authenticated;

commit;
