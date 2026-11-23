-- Funzo Cloud Gaming Hub Supabase Schema
-- Run this in your Supabase Dashboard -> SQL Editor

CREATE TABLE IF NOT EXISTS funzo_users (
  id TEXT PRIMARY KEY,
  auth_type TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  username TEXT NOT NULL,
  avatar_id TEXT DEFAULT 'fox',
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 120,
  iq INTEGER DEFAULT 105,
  coins INTEGER DEFAULT 100,
  streak INTEGER DEFAULT 1,
  arrow_level INTEGER DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE funzo_users ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo and player progress sync
CREATE POLICY "Public users can read funzo_users" 
ON funzo_users FOR SELECT 
USING (true);

CREATE POLICY "Public users can insert/update funzo_users" 
ON funzo_users FOR ALL 
USING (true)
WITH CHECK (true);
