grant usage on schema public to authenticated;

grant select, insert, update on table public.users
to authenticated;