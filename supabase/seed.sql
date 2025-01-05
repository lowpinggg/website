-- supabase/seed/seed.sql

-- Create the storage bucket
insert into storage.buckets (id, name, public)
values ('posters', 'posters', true)
on conflict do nothing;

-- Create a policy to allow public read access
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'posters' );

-- Clear existing events
TRUNCATE TABLE events CASCADE;

-- Insert ARAM event 1
INSERT INTO events (
    date,
    game,
    name,
    poster_url,
    price,
    time,
    type,
    slug
) VALUES (
    '2024-06-15',
    'League of Legends',
    'ARAM Tournament June 2024',
    '/storage/v1/object/public/posters/s3.png',
    25.00,
    '18:00',
    'tft',
    'aram-tournament-june-2024'
);

-- Insert ARAM event 2
INSERT INTO events (
    date,
    game,
    name,
    poster_url,
    price,
    time,
    type,
    slug
) VALUES (
    '2024-01-20',
    'League of Legends',
    'ARAM Tournament January 2024',
    '/storage/v1/object/public/posters/s2.png',
    25.00,
    '18:00',
    'tft',
    'aram-tournament-january-2024'
);

-- Insert TFT event
INSERT INTO events (
    date,
    game,
    name,
    poster_url,
    price,
    time,
    type,
    slug
) VALUES (
    '2025-03-15',
    'Teamfight Tactics',
    'TFT Tournament Mars 2025',
    '/storage/v1/object/public/posters/dummy.png',
    25.00,
    '19:00',
    'tft',
    'tft-tournament-mars-2024'
);