
-- Shadow Dream Log - Database Schema (Postgres/Supabase)

create extension if not exists "uuid-ossp";

-- Users
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  display_name text,
  created_at timestamptz default now()
);

-- Lookups
create table if not exists locations (id serial primary key, name text unique not null);
create table if not exists triggers (id serial primary key, name text unique not null);
create table if not exists intent_modes (id serial primary key, name text unique not null);
create table if not exists control_types (id serial primary key, name text unique not null);
create table if not exists portals (id serial primary key, name text unique not null);
create table if not exists feelings (id serial primary key, name text unique not null);
create table if not exists emotions_after (id serial primary key, name text unique not null);
create table if not exists tags (id serial primary key, name text unique not null);

-- Dream Logs
create table if not exists dream_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  dream_date date not null,
  wake_time time,
  summary text,
  narrative text,
  location_id int references locations(id),
  vivid_score smallint check (vivid_score between 1 and 5),
  scene_stability smallint check (scene_stability between 1 and 5),
  energy_after smallint check (energy_after between -2 and 2),
  lucid_mode smallint check (lucid_mode in (0,1,2)) default 0,
  control_type_id int references control_types(id),
  intent_mode_id int references intent_modes(id),
  portal_id int references portals(id),
  stabilise_method text,
  shadow_signal text,
  outcome_insight text,
  micro_action text,
  emotion_during_id int references feelings(id),
  emotion_after_id int references emotions_after(id),
  created_at timestamptz default now()
);

create index if not exists idx_dream_logs_user_date on dream_logs(user_id, dream_date desc);

-- Dream Log Triggers (1–N per dream)
create table if not exists dream_log_triggers (
  id uuid primary key default uuid_generate_v4(),
  dream_log_id uuid not null references dream_logs(id) on delete cascade,
  trigger_id int not null references triggers(id)
);
create index if not exists idx_dlt_log on dream_log_triggers(dream_log_id);

-- Characters per dream
create table if not exists dream_log_characters (
  id uuid primary key default uuid_generate_v4(),
  dream_log_id uuid not null references dream_logs(id) on delete cascade,
  label text not null,
  is_shadow boolean default false
);
create index if not exists idx_dlc_log on dream_log_characters(dream_log_id);

-- Tags (N—N)
create table if not exists dream_log_tags (
  dream_log_id uuid not null references dream_logs(id) on delete cascade,
  tag_id int not null references tags(id),
  primary key (dream_log_id, tag_id)
);
