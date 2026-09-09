create extension if not exists pgcrypto;

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  organization text not null,
  role text not null,
  country text not null,
  attendance_category text not null,
  accessibility_needs text,
  created_at timestamptz not null default now()
);

create table if not exists partnership_inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  name text not null,
  email text not null,
  organization text not null,
  role text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  s3_key text not null unique,
  content_type text not null,
  caption text,
  created_at timestamptz not null default now()
);
