begin;

-- Keep delete access for existing files, but only allow new/renamed objects
-- with image extensions supported by the application.
drop policy if exists "Admins can manage club media" on storage.objects;

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
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp')
  and (select public.is_admin())
);

commit;
