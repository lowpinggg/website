-- Create event_type enum
CREATE TYPE event_type AS ENUM ('tft');

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    date TEXT NOT NULL,
    game TEXT NOT NULL,
    name TEXT NOT NULL,
    poster_url TEXT,
    price NUMERIC NOT NULL,
    time TEXT NOT NULL,
    type event_type NOT NULL
);

-- Create event_registrations table
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    discord TEXT NOT NULL,
    email TEXT NOT NULL,
    event_id UUID NOT NULL,
    name TEXT NOT NULL,
    payment_id TEXT NOT NULL,
    rank TEXT NOT NULL,
    riot_id TEXT NOT NULL,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(id)
);