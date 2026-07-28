-- Studio generators MVP: sample packs + color palettes (cloud mirror of local storage)
-- Apply after 003_platform.sql. Idempotent.

create table if not exists public.sample_packs (
  id text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'Untitled pack',
  source_uri text,
  duration_sec double precision not null default 0,
  synth jsonb not null default '{}'::jsonb,
  clips jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sample_packs_user_id_idx on public.sample_packs (user_id);
create index if not exists sample_packs_updated_idx on public.sample_packs (user_id, updated_at desc);

alter table public.sample_packs enable row level security;

drop policy if exists "sample_packs_select_own" on public.sample_packs;
create policy "sample_packs_select_own" on public.sample_packs
  for select using (auth.uid() = user_id);

drop policy if exists "sample_packs_insert_own" on public.sample_packs;
create policy "sample_packs_insert_own" on public.sample_packs
  for insert with check (auth.uid() = user_id);

drop policy if exists "sample_packs_update_own" on public.sample_packs;
create policy "sample_packs_update_own" on public.sample_packs
  for update using (auth.uid() = user_id);

drop policy if exists "sample_packs_delete_own" on public.sample_packs;
create policy "sample_packs_delete_own" on public.sample_packs
  for delete using (auth.uid() = user_id);

create table if not exists public.color_palettes (
  id text primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'My palette',
  season_id text,
  colors jsonb not null default '[]'::jsonb,
  undertone text,
  depth text,
  clarity text,
  source_image_uri text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists color_palettes_user_id_idx on public.color_palettes (user_id);
create index if not exists color_palettes_updated_idx on public.color_palettes (user_id, updated_at desc);

alter table public.color_palettes enable row level security;

drop policy if exists "color_palettes_select_own" on public.color_palettes;
create policy "color_palettes_select_own" on public.color_palettes
  for select using (auth.uid() = user_id);

drop policy if exists "color_palettes_insert_own" on public.color_palettes;
create policy "color_palettes_insert_own" on public.color_palettes
  for insert with check (auth.uid() = user_id);

drop policy if exists "color_palettes_update_own" on public.color_palettes;
create policy "color_palettes_update_own" on public.color_palettes
  for update using (auth.uid() = user_id);

drop policy if exists "color_palettes_delete_own" on public.color_palettes;
create policy "color_palettes_delete_own" on public.color_palettes
  for delete using (auth.uid() = user_id);
