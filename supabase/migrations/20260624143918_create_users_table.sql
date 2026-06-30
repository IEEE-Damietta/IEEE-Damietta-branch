create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,

  first_name text not null,
  last_name text not null,

  phone text,
  national_id text unique,
  university_id text unique,

  faculty text not null check (
    faculty in ('engineering', 'cs', 'other')
  ),

  academic_year text not null check (
    academic_year in (
      'first',
      'second',
      'third',
      'fourth',
      'fifth'
    )
  ),

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can view own profile"
on public.users
for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.users
for insert
with check (auth.uid() = id);