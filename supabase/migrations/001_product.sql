-- Artometrics product schema: profiles, subscriptions, saves, member episodes

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'inactive',
  plan_tier text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_articles (
  user_id uuid not null references public.profiles (id) on delete cascade,
  article_slug text not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, article_slug)
);

create table if not exists public.member_episodes (
  slug text primary key,
  title text not null,
  html_content text not null,
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_status_idx on public.subscriptions (status);
create index if not exists saved_articles_user_idx on public.saved_articles (user_id);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.saved_articles enable row level security;
alter table public.member_episodes enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "saved_articles_select_own"
  on public.saved_articles for select
  using (auth.uid() = user_id);

create policy "saved_articles_insert_own"
  on public.saved_articles for insert
  with check (auth.uid() = user_id);

create policy "saved_articles_delete_own"
  on public.saved_articles for delete
  using (auth.uid() = user_id);

-- Member episode HTML is served via Netlify Functions (service role), not direct client reads.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  insert into public.subscriptions (user_id, status)
  values (new.id, 'inactive')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();
