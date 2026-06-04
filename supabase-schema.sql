-- Run this in your Supabase SQL editor to set up the database

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  xp integer default 0,
  streak integer default 0,
  last_activity date,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Progress table: tracks completed lessons per user
create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  language text not null,
  lesson_id text not null,
  lesson_type text not null check (lesson_type in ('lesson', 'exercise')),
  completed_at timestamp with time zone default timezone('utc', now()),
  unique(user_id, language, lesson_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

-- Policies: users can only read/write their own data
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own progress" on public.progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.progress for insert with check (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
