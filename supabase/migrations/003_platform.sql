-- Artometrics platform: public profiles, member posts, social graph
-- Extends 001_product.sql + 002_tools.sql. Idempotent.

-- ---------------------------------------------------------------------------
-- Profiles: public identity
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists handle text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists profile_visibility text not null default 'public';
alter table public.profiles add column if not exists desks_interest text[] not null default '{}';

create unique index if not exists profiles_handle_unique
  on public.profiles (lower(handle))
  where handle is not null and length(trim(handle)) > 0;

drop policy if exists "profiles_select_public_handles" on public.profiles;
create policy "profiles_select_public_handles" on public.profiles
  for select using (
    auth.uid() = id
    or (
      handle is not null
      and length(trim(handle)) > 0
      and coalesce(profile_visibility, 'public') = 'public'
    )
  );

-- ---------------------------------------------------------------------------
-- Member posts (profile publish + magazine submit)
-- ---------------------------------------------------------------------------
create table if not exists public.member_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null default 'Untitled',
  body text not null default '',
  excerpt text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'published', 'submitted', 'accepted', 'rejected')),
  source_kind text
    check (source_kind is null or source_kind in ('twilda_journal', 'aftercare_journal', 'novel', 'freeform')),
  source_id uuid,
  slug text,
  published_at timestamptz,
  submitted_at timestamptz,
  sanity_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists member_posts_user_idx on public.member_posts (user_id, updated_at desc);
create index if not exists member_posts_status_idx on public.member_posts (status, published_at desc nulls last);
create unique index if not exists member_posts_slug_unique
  on public.member_posts (slug)
  where slug is not null;

alter table public.member_posts enable row level security;

drop policy if exists "member_posts_select" on public.member_posts;
create policy "member_posts_select" on public.member_posts
  for select using (
    auth.uid() = user_id
    or status in ('published', 'accepted')
  );

drop policy if exists "member_posts_insert_own" on public.member_posts;
create policy "member_posts_insert_own" on public.member_posts
  for insert with check (auth.uid() = user_id);

drop policy if exists "member_posts_update_own" on public.member_posts;
create policy "member_posts_update_own" on public.member_posts
  for update using (auth.uid() = user_id);

drop policy if exists "member_posts_delete_own" on public.member_posts;
create policy "member_posts_delete_own" on public.member_posts
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Comments (reports + member posts)
-- ---------------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  target_kind text not null check (target_kind in ('report', 'member_post')),
  target_id text not null,
  parent_id uuid references public.comments (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_target_idx on public.comments (target_kind, target_id, created_at);
create index if not exists comments_parent_idx on public.comments (parent_id);

alter table public.comments enable row level security;

drop policy if exists "comments_select_all" on public.comments;
create policy "comments_select_all" on public.comments
  for select using (true);

drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own" on public.comments
  for insert with check (auth.uid() = user_id);

drop policy if exists "comments_update_own" on public.comments;
create policy "comments_update_own" on public.comments
  for update using (auth.uid() = user_id);

drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own" on public.comments
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Follows
-- ---------------------------------------------------------------------------
create table if not exists public.follows (
  follower_id uuid not null references public.profiles (id) on delete cascade,
  following_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create index if not exists follows_following_idx on public.follows (following_id);

alter table public.follows enable row level security;

drop policy if exists "follows_select_all" on public.follows;
create policy "follows_select_all" on public.follows
  for select using (true);

drop policy if exists "follows_insert_own" on public.follows;
create policy "follows_insert_own" on public.follows
  for insert with check (auth.uid() = follower_id);

drop policy if exists "follows_delete_own" on public.follows;
create policy "follows_delete_own" on public.follows
  for delete using (auth.uid() = follower_id);

-- ---------------------------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('comment', 'follow', 'accepted', 'clap')),
  actor_id uuid references public.profiles (id) on delete set null,
  target_kind text,
  target_id text,
  body text not null default '',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx
  on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own" on public.notifications
  for select using (auth.uid() = user_id);

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own" on public.notifications
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Claps (lightweight engagement)
-- ---------------------------------------------------------------------------
create table if not exists public.claps (
  user_id uuid not null references public.profiles (id) on delete cascade,
  target_kind text not null check (target_kind in ('report', 'member_post')),
  target_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, target_kind, target_id)
);

create index if not exists claps_target_idx on public.claps (target_kind, target_id);

alter table public.claps enable row level security;

drop policy if exists "claps_select_all" on public.claps;
create policy "claps_select_all" on public.claps
  for select using (true);

drop policy if exists "claps_insert_own" on public.claps;
create policy "claps_insert_own" on public.claps
  for insert with check (auth.uid() = user_id);

drop policy if exists "claps_delete_own" on public.claps;
create policy "claps_delete_own" on public.claps
  for delete using (auth.uid() = user_id);
