-- Enable pgcrypto extension for UUID generation if not already enabled
create extension if not exists "pgcrypto";

-- Events catalogue
create table if not exists public.events (
  id text primary key,
  name text not null,
  description text,
  date timestamptz not null,
  type text not null,
  created_at timestamptz default now()
);

-- Seed the Project Showcase events (Day 1 and Day 2)
insert into public.events (id, name, description, date, type)
values (
  'project_showcase_community_2025',
  'Project Showcase - Day 1',
  'A focused community showcase where squads present their latest builds and research.',
  '2025-03-15T14:00:00Z',
  'Community'
),
(
  'project_showcase_community_2025_day2',
  'Project Showcase - Day 2',
  'Overflow day for additional project presentations.',
  '2025-03-16T14:00:00Z',
  'Community'
)
on conflict (id) do update
set name = excluded.name,
    description = excluded.description,
    date = excluded.date,
    type = excluded.type;

-- Registrations table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  name text not null,
  reg_no text not null,
  department text not null,
  year text not null,
  section text not null,
  clan text not null,
  email text not null,
  project_title text not null,
  description text not null,
  category text not null,
  slot text,
  created_at timestamptz default now()
);

alter table public.registrations
  add column if not exists email text;

create unique index if not exists registrations_event_reg_unique
  on public.registrations(event_id, reg_no);

-- Optional slot catalogue for random assignment
create table if not exists public.event_slots (
  id uuid primary key default gen_random_uuid(),
  event_id text not null references public.events(id) on delete cascade,
  slot_label text not null,
  assigned_registration uuid references public.registrations(id),
  unique (event_id, slot_label)
);

alter table public.event_slots
  drop constraint if exists event_slots_assigned_registration_fkey;

alter table public.event_slots
  add constraint event_slots_assigned_registration_fkey
    foreign key (assigned_registration)
    references public.registrations(id)
    on delete set null;

insert into public.event_slots (event_id, slot_label)
values
  ('project_showcase_community_2025', 'Slot 01'),
  ('project_showcase_community_2025', 'Slot 02'),
  ('project_showcase_community_2025', 'Slot 03'),
  ('project_showcase_community_2025', 'Slot 04'),
  ('project_showcase_community_2025', 'Slot 05'),
  ('project_showcase_community_2025', 'Slot 06'),
  ('project_showcase_community_2025', 'Slot 07'),
  ('project_showcase_community_2025', 'Slot 08'),
  ('project_showcase_community_2025', 'Slot 09'),
  ('project_showcase_community_2025', 'Slot 10'),
  ('project_showcase_community_2025', 'Slot 11'),
  ('project_showcase_community_2025', 'Slot 12'),
  ('project_showcase_community_2025', 'Slot 13'),
  ('project_showcase_community_2025', 'Slot 14'),
  ('project_showcase_community_2025', 'Slot 15'),
  ('project_showcase_community_2025', 'Slot 16'),
  ('project_showcase_community_2025', 'Slot 17'),
  ('project_showcase_community_2025', 'Slot 18'),
  ('project_showcase_community_2025', 'Slot 19'),
  ('project_showcase_community_2025', 'Slot 20'),
  ('project_showcase_community_2025_day2', 'Slot 01'),
  ('project_showcase_community_2025_day2', 'Slot 02'),
  ('project_showcase_community_2025_day2', 'Slot 03'),
  ('project_showcase_community_2025_day2', 'Slot 04'),
  ('project_showcase_community_2025_day2', 'Slot 05'),
  ('project_showcase_community_2025_day2', 'Slot 06'),
  ('project_showcase_community_2025_day2', 'Slot 07'),
  ('project_showcase_community_2025_day2', 'Slot 08'),
  ('project_showcase_community_2025_day2', 'Slot 09'),
  ('project_showcase_community_2025_day2', 'Slot 10'),
  ('project_showcase_community_2025_day2', 'Slot 11'),
  ('project_showcase_community_2025_day2', 'Slot 12'),
  ('project_showcase_community_2025_day2', 'Slot 13'),
  ('project_showcase_community_2025_day2', 'Slot 14'),
  ('project_showcase_community_2025_day2', 'Slot 15'),
  ('project_showcase_community_2025_day2', 'Slot 16'),
  ('project_showcase_community_2025_day2', 'Slot 17'),
  ('project_showcase_community_2025_day2', 'Slot 18'),
  ('project_showcase_community_2025_day2', 'Slot 19'),
  ('project_showcase_community_2025_day2', 'Slot 20')
on conflict (event_id, slot_label) do nothing;

-- Automatically assign an available slot before storing each registration
create or replace function public.assign_random_slot()
returns trigger
language plpgsql
as $$
declare
  selected_slot record;
  target_event_id text;
begin
  if new.slot is not null then
    return new;
  end if;

  -- Try Day 1 first
  target_event_id := 'project_showcase_community_2025';
  
  select id, slot_label, event_id
  into selected_slot
  from public.event_slots
  where event_id = target_event_id
    and assigned_registration is null
  order by random()
  limit 1
  for update skip locked;

  -- If Day 1 is full, try Day 2
  if selected_slot is null then
    target_event_id := 'project_showcase_community_2025_day2';
    
    select id, slot_label, event_id
    into selected_slot
    from public.event_slots
    where event_id = target_event_id
      and assigned_registration is null
    order by random()
    limit 1
    for update skip locked;
  end if;

  -- If both days are full, raise error
  if selected_slot is null then
    raise exception 'No slots remaining for Project Showcase (both days full)'
      using errcode = 'P0001';
  end if;

  -- Update the registration with the correct event_id and slot
  new.event_id := selected_slot.event_id;
  new.slot := selected_slot.slot_label;

  return new;
end;
$$;

-- Link the slot after registration is committed
create or replace function public.link_slot_to_registration()
returns trigger
language plpgsql
as $$
begin
  update public.event_slots
  set assigned_registration = new.id
  where event_id = new.event_id
    and slot_label = new.slot
    and assigned_registration is null;

  return new;
end;
$$;

drop trigger if exists registrations_assign_slot on public.registrations;
drop trigger if exists registrations_link_slot on public.registrations;

create trigger registrations_assign_slot
before insert on public.registrations
for each row
execute function public.assign_random_slot();

create trigger registrations_link_slot
after insert on public.registrations
for each row
execute function public.link_slot_to_registration();
