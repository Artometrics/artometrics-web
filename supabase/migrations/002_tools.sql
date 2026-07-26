-- Artometrics tools: Twilda + Aftercare + reference pins
-- Extends 001_product.sql. Idempotent — safe to re-run.
-- Does NOT alter Stripe subscriptions shape from 001.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles: Twilda + Aftercare fields
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists pen_name text;
alter table public.profiles add column if not exists onboarding_completed boolean not null default false;
alter table public.profiles add column if not exists birth_date text;
alter table public.profiles add column if not exists birth_time text;
alter table public.profiles add column if not exists birth_place text;
alter table public.profiles add column if not exists timezone text;

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seed_name text;
begin
  seed_name := coalesce(
    new.raw_user_meta_data->>'display_name',
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );
  insert into public.profiles (id, email, full_name, display_name)
  values (new.id, new.email, seed_name, seed_name)
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    display_name = coalesce(public.profiles.display_name, excluded.display_name);
  insert into public.subscriptions (user_id, status)
  values (new.id, 'inactive')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Twilda: novels + structure
-- ---------------------------------------------------------------------------
create table if not exists public.novels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'Untitled Novel',
  author text not null default '',
  synopsis text not null default '',
  cover_kind text not null default 'gatsby',
  series_name text,
  is_template boolean not null default false,
  active_draft_id uuid,
  last_opened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.novels add column if not exists synopsis text not null default '';
alter table public.novels add column if not exists author text not null default '';
alter table public.novels add column if not exists cover_kind text not null default 'gatsby';
alter table public.novels add column if not exists series_name text;
alter table public.novels add column if not exists is_template boolean not null default false;
alter table public.novels add column if not exists active_draft_id uuid;
alter table public.novels add column if not exists last_opened_at timestamptz;

create index if not exists novels_user_id_idx on public.novels (user_id);
create index if not exists novels_last_opened_idx on public.novels (user_id, last_opened_at desc nulls last);

alter table public.novels enable row level security;

drop policy if exists "novels_select_own" on public.novels;
create policy "novels_select_own" on public.novels for select using (auth.uid() = user_id);
drop policy if exists "novels_insert_own" on public.novels;
create policy "novels_insert_own" on public.novels for insert with check (auth.uid() = user_id);
drop policy if exists "novels_update_own" on public.novels;
create policy "novels_update_own" on public.novels for update using (auth.uid() = user_id);
drop policy if exists "novels_delete_own" on public.novels;
create policy "novels_delete_own" on public.novels for delete using (auth.uid() = user_id);

create table if not exists public.novel_drafts (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  name text not null default 'Main',
  slug text not null default 'main',
  summary text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (novel_id, slug)
);

create index if not exists novel_drafts_novel_id_idx on public.novel_drafts (novel_id, sort_order);
alter table public.novel_drafts enable row level security;

drop policy if exists "novel_drafts_all_own" on public.novel_drafts;
create policy "novel_drafts_all_own" on public.novel_drafts
  for all using (
    exists (select 1 from public.novels n where n.id = novel_drafts.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = novel_drafts.novel_id and n.user_id = auth.uid())
  );

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'novels_active_draft_id_fkey') then
    alter table public.novels
      add constraint novels_active_draft_id_fkey
      foreign key (active_draft_id) references public.novel_drafts (id) on delete set null;
  end if;
end $$;

create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid references public.novel_drafts (id) on delete cascade,
  sort_order int not null default 0,
  title text not null default 'Chapter I',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.chapters add column if not exists draft_id uuid references public.novel_drafts (id) on delete cascade;
create index if not exists chapters_novel_id_idx on public.chapters (novel_id, sort_order);
create index if not exists chapters_draft_id_idx on public.chapters (draft_id, sort_order);
alter table public.chapters enable row level security;

drop policy if exists "chapters_all_own" on public.chapters;
create policy "chapters_all_own" on public.chapters
  for all using (
    exists (select 1 from public.novels n where n.id = chapters.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = chapters.novel_id and n.user_id = auth.uid())
  );

create table if not exists public.scenes (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  sort_order int not null default 0,
  title text not null default 'Scene 1',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists scenes_chapter_id_idx on public.scenes (chapter_id, sort_order);
alter table public.scenes enable row level security;

drop policy if exists "scenes_all_own" on public.scenes;
create policy "scenes_all_own" on public.scenes
  for all using (
    exists (
      select 1 from public.chapters c
      join public.novels n on n.id = c.novel_id
      where c.id = scenes.chapter_id and n.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.chapters c
      join public.novels n on n.id = c.novel_id
      where c.id = scenes.chapter_id and n.user_id = auth.uid()
    )
  );

create table if not exists public.codex_entries (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid references public.novel_drafts (id) on delete cascade,
  type text not null default 'other' check (type in ('character', 'location', 'lore', 'other')),
  name text not null,
  initials text not null default '??',
  tags jsonb not null default '[]'::jsonb,
  aliases jsonb not null default '[]'::jsonb,
  summary text not null default '',
  description text not null default '',
  mentions int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.codex_entries add column if not exists draft_id uuid references public.novel_drafts (id) on delete cascade;
create index if not exists codex_entries_novel_id_idx on public.codex_entries (novel_id);
alter table public.codex_entries enable row level security;

drop policy if exists "codex_all_own" on public.codex_entries;
create policy "codex_all_own" on public.codex_entries
  for all using (
    exists (select 1 from public.novels n where n.id = codex_entries.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = codex_entries.novel_id and n.user_id = auth.uid())
  );

create table if not exists public.snippets (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid references public.novel_drafts (id) on delete cascade,
  title text not null default '',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.snippets add column if not exists draft_id uuid references public.novel_drafts (id) on delete cascade;
alter table public.snippets enable row level security;

drop policy if exists "snippets_all_own" on public.snippets;
create policy "snippets_all_own" on public.snippets
  for all using (
    exists (select 1 from public.novels n where n.id = snippets.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = snippets.novel_id and n.user_id = auth.uid())
  );

create table if not exists public.chat_threads (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid references public.novel_drafts (id) on delete cascade,
  title text not null default 'Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.chat_threads add column if not exists draft_id uuid references public.novel_drafts (id) on delete cascade;
alter table public.chat_threads enable row level security;

drop policy if exists "chat_threads_all_own" on public.chat_threads;
create policy "chat_threads_all_own" on public.chat_threads
  for all using (
    exists (select 1 from public.novels n where n.id = chat_threads.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = chat_threads.novel_id and n.user_id = auth.uid())
  );

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.chat_threads (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null default '',
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

drop policy if exists "chat_messages_all_own" on public.chat_messages;
create policy "chat_messages_all_own" on public.chat_messages
  for all using (
    exists (
      select 1 from public.chat_threads t
      join public.novels n on n.id = t.novel_id
      where t.id = chat_messages.thread_id and n.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.chat_threads t
      join public.novels n on n.id = t.novel_id
      where t.id = chat_messages.thread_id and n.user_id = auth.uid()
    )
  );

create table if not exists public.draft_references (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid not null references public.novel_drafts (id) on delete cascade,
  source_draft_id uuid not null references public.novel_drafts (id) on delete cascade,
  source_type text not null check (source_type in ('codex', 'snippet', 'draft')),
  source_id uuid,
  note text not null default '',
  created_at timestamptz not null default now(),
  unique (draft_id, source_draft_id, source_type, source_id)
);

alter table public.draft_references enable row level security;

drop policy if exists "draft_references_all_own" on public.draft_references;
create policy "draft_references_all_own" on public.draft_references
  for all using (
    exists (select 1 from public.novels n where n.id = draft_references.novel_id and n.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.novels n where n.id = draft_references.novel_id and n.user_id = auth.uid())
  );

create table if not exists public.twilda_journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'Untitled',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists twilda_journal_user_updated_idx
  on public.twilda_journal_entries (user_id, updated_at desc);

alter table public.twilda_journal_entries enable row level security;

drop policy if exists "twilda_journal_select_own" on public.twilda_journal_entries;
create policy "twilda_journal_select_own" on public.twilda_journal_entries for select using (auth.uid() = user_id);
drop policy if exists "twilda_journal_insert_own" on public.twilda_journal_entries;
create policy "twilda_journal_insert_own" on public.twilda_journal_entries for insert with check (auth.uid() = user_id);
drop policy if exists "twilda_journal_update_own" on public.twilda_journal_entries;
create policy "twilda_journal_update_own" on public.twilda_journal_entries for update using (auth.uid() = user_id);
drop policy if exists "twilda_journal_delete_own" on public.twilda_journal_entries;
create policy "twilda_journal_delete_own" on public.twilda_journal_entries for delete using (auth.uid() = user_id);

create table if not exists public.storyboard_panels (
  id uuid primary key default gen_random_uuid(),
  novel_id uuid not null references public.novels (id) on delete cascade,
  draft_id uuid references public.novel_drafts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  sort_order int not null default 0,
  caption text not null default '',
  prompt text not null default '',
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists storyboard_panels_novel_draft_idx
  on public.storyboard_panels (novel_id, draft_id, sort_order);

alter table public.storyboard_panels enable row level security;

drop policy if exists "storyboard_select_own" on public.storyboard_panels;
create policy "storyboard_select_own" on public.storyboard_panels for select using (auth.uid() = user_id);
drop policy if exists "storyboard_insert_own" on public.storyboard_panels;
create policy "storyboard_insert_own" on public.storyboard_panels for insert with check (auth.uid() = user_id);
drop policy if exists "storyboard_update_own" on public.storyboard_panels;
create policy "storyboard_update_own" on public.storyboard_panels for update using (auth.uid() = user_id);
drop policy if exists "storyboard_delete_own" on public.storyboard_panels;
create policy "storyboard_delete_own" on public.storyboard_panels for delete using (auth.uid() = user_id);

-- Storage bucket for storyboard (ignore if storage schema missing in local SQL-only runs)
do $$
begin
  if exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'storyboard', 'storyboard', false, 5242880,
      array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    )
    on conflict (id) do update set
      public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Aftercare
-- ---------------------------------------------------------------------------
create table if not exists public.aftercare_journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text,
  body text not null default '',
  mood text,
  tags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists aftercare_journal_user_idx
  on public.aftercare_journal_entries (user_id, created_at desc);

alter table public.aftercare_journal_entries enable row level security;

drop policy if exists "aftercare_journal_all_own" on public.aftercare_journal_entries;
create policy "aftercare_journal_all_own" on public.aftercare_journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.tarot_pulls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  spread_type text not null,
  cards jsonb not null,
  interpretation text,
  question text,
  created_at timestamptz not null default now()
);

create index if not exists tarot_pulls_user_idx on public.tarot_pulls (user_id, created_at desc);
alter table public.tarot_pulls enable row level security;

drop policy if exists "tarot_pulls_all_own" on public.tarot_pulls;
create policy "tarot_pulls_all_own" on public.tarot_pulls
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.tracking_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null,
  value int,
  label text,
  notes text,
  logged_on text not null,
  created_at timestamptz not null default now()
);

create index if not exists tracking_logs_user_idx on public.tracking_logs (user_id, logged_on desc);
alter table public.tracking_logs enable row level security;

drop policy if exists "tracking_logs_all_own" on public.tracking_logs;
create policy "tracking_logs_all_own" on public.tracking_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.card_art_cache (
  id uuid primary key default gen_random_uuid(),
  card_id text not null unique,
  blob_key text not null,
  mime_type text default 'image/png',
  created_at timestamptz not null default now()
);

alter table public.card_art_cache enable row level security;

drop policy if exists "card_art_cache_select_all" on public.card_art_cache;
create policy "card_art_cache_select_all" on public.card_art_cache for select using (true);

drop policy if exists "card_art_cache_service_write" on public.card_art_cache;
-- Writes go through service role in Netlify functions; authenticated users read only.

-- ---------------------------------------------------------------------------
-- Reference pins (Gutenberg / WikiArt / Wikipedia)
-- ---------------------------------------------------------------------------
create table if not exists public.reference_pins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  source text not null check (source in ('gutenberg', 'wikiart', 'wikipedia')),
  external_id text not null,
  title text not null,
  url text,
  payload jsonb not null default '{}'::jsonb,
  novel_id uuid references public.novels (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (user_id, source, external_id)
);

create index if not exists reference_pins_user_idx on public.reference_pins (user_id, created_at desc);
alter table public.reference_pins enable row level security;

drop policy if exists "reference_pins_all_own" on public.reference_pins;
create policy "reference_pins_all_own" on public.reference_pins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Triggers + grants
-- ---------------------------------------------------------------------------
drop trigger if exists novels_updated_at on public.novels;
create trigger novels_updated_at before update on public.novels
  for each row execute function public.set_updated_at();

drop trigger if exists novel_drafts_updated_at on public.novel_drafts;
create trigger novel_drafts_updated_at before update on public.novel_drafts
  for each row execute function public.set_updated_at();

drop trigger if exists chapters_updated_at on public.chapters;
create trigger chapters_updated_at before update on public.chapters
  for each row execute function public.set_updated_at();

drop trigger if exists scenes_updated_at on public.scenes;
create trigger scenes_updated_at before update on public.scenes
  for each row execute function public.set_updated_at();

drop trigger if exists codex_updated_at on public.codex_entries;
create trigger codex_updated_at before update on public.codex_entries
  for each row execute function public.set_updated_at();

drop trigger if exists twilda_journal_updated_at on public.twilda_journal_entries;
create trigger twilda_journal_updated_at before update on public.twilda_journal_entries
  for each row execute function public.set_updated_at();

drop trigger if exists aftercare_journal_updated_at on public.aftercare_journal_entries;
create trigger aftercare_journal_updated_at before update on public.aftercare_journal_entries
  for each row execute function public.set_updated_at();

drop trigger if exists storyboard_updated_at on public.storyboard_panels;
create trigger storyboard_updated_at before update on public.storyboard_panels
  for each row execute function public.set_updated_at();

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, anon, authenticated, service_role;
grant all on all sequences in schema public to postgres, anon, authenticated, service_role;
