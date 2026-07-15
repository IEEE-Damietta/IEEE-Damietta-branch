create table public.events (
    id bigint generated always as identity primary key,

    title text not null,
    slug text not null unique,
    description text,

    category text,

    image text,

    location_type text,
    location_details text,

    start_date timestamptz not null,
    end_date timestamptz,

    registration_deadline timestamptz,

    capacity bigint,

    is_published boolean not null default false,

    status text not null default 'draft',

    instructor_name text,

    event_link text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

create index idx_events_slug on public.events(slug);
create index idx_events_category on public.events(category);
create index idx_events_status on public.events(status);
create index idx_events_start_date on public.events(start_date);

create policy "Public read events"
on public.events
for select
to public
using (true);

grant select on public.events to anon, authenticated;