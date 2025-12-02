-- Migration: Initialize roles and profiles schema + trigger to create profiles on signup
-- Run this in Supabase SQL Editor (Project > SQL Editor > New Query) or via supabase CLI

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DROP any problematic FK on profiles.id if it exists (safe in new projects)
ALTER TABLE IF EXISTS public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Create roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create profiles table with proper columns and constraints
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  username text,
  first_name text,
  last_name text,
  avatar_url text,
  role_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add correct foreign key: profiles.user_id -> auth.users(id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'profiles_user_id_fkey' AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END
$$;

-- Add foreign key for role_id -> roles.id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'profiles_role_id_fkey' AND table_schema = 'public'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_role_id_fkey
      FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE SET NULL;
  END IF;
END
$$;

-- Indexes for performance and case-insensitive username lookup
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username_lower ON public.profiles( lower(username) );
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_unique_lower ON public.profiles (lower(username)) WHERE username IS NOT NULL;

-- Seed common roles if missing
INSERT INTO public.roles (id, name)
SELECT gen_random_uuid(), r
FROM (VALUES ('owner'), ('admin')) AS v(r)
WHERE NOT EXISTS (SELECT 1 FROM public.roles WHERE name = v.r);

-- Trigger function: create or update profile when a new auth.user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  role_id UUID;
  username_value TEXT;
  first_name_value TEXT;
  last_name_value TEXT;
BEGIN
  -- Extract values from raw_user_meta_data
  username_value := NULLIF(NEW.raw_user_meta_data->>'username', '');
  first_name_value := NULLIF(NEW.raw_user_meta_data->>'first_name', '');
  last_name_value := NULLIF(NEW.raw_user_meta_data->>'last_name', '');

  -- Extract the initial_role_id from raw_user_meta_data, default to owner
  role_id := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'initial_role_id','')::UUID,
    (SELECT id FROM public.roles WHERE name = 'owner' LIMIT 1)
  );

  -- Upsert: if a profile for this user_id exists, update basic fields; otherwise insert
  INSERT INTO public.profiles (user_id, username, first_name, last_name, role_id, created_at, updated_at)
  VALUES (NEW.id, username_value, first_name_value, last_name_value, role_id, NOW(), NOW())
  ON CONFLICT (user_id) DO UPDATE
    SET username = COALESCE(EXCLUDED.username, public.profiles.username),
        first_name = COALESCE(EXCLUDED.first_name, public.profiles.first_name),
        last_name = COALESCE(EXCLUDED.last_name, public.profiles.last_name),
        role_id = COALESCE(EXCLUDED.role_id, public.profiles.role_id),
        updated_at = NOW();

  RETURN NEW;
EXCEPTION WHEN others THEN
  -- Don't block user creation if profile creation fails; log a warning
  RAISE WARNING 'handle_new_user failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- Install trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- End of migration
