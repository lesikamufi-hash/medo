-- Migration: Confirm all emails and assign admin role to user 'niska'
-- Run this in Supabase Dashboard > SQL Editor (New Query)
-- NOTE: This performs privileged updates. Ensure you run it in your project SQL Editor.

-- 1) Ensure the 'admin' role exists
INSERT INTO public.roles (id, name)
SELECT gen_random_uuid(), 'admin'
WHERE NOT EXISTS (SELECT 1 FROM public.roles WHERE name = 'admin');

-- 2) Confirm all users' emails (set email_confirmed_at)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- 3) Assign admin role to user with username 'niska' (case-insensitive).
-- If profile for the user doesn't exist, create it.
DO $$
DECLARE
  admin_role uuid;
  target_user_id uuid;
  profile_exists int;
BEGIN
  -- get or create admin role id
  SELECT id INTO admin_role FROM public.roles WHERE name = 'admin' LIMIT 1;
  IF admin_role IS NULL THEN
    INSERT INTO public.roles (id, name) VALUES (gen_random_uuid(), 'admin') RETURNING id INTO admin_role;
  END IF;

  -- Try find profile by username 'niska'
  SELECT p.user_id INTO target_user_id FROM public.profiles p WHERE lower(p.username) = 'niska' LIMIT 1;

  -- If not found, try find auth user by email starting with niska@
  IF target_user_id IS NULL THEN
    SELECT id INTO target_user_id FROM auth.users WHERE email ILIKE 'niska@%' LIMIT 1;
  END IF;

  -- If still not found, try to match raw_user_meta_data username in auth.users
  IF target_user_id IS NULL THEN
    SELECT id INTO target_user_id FROM auth.users WHERE lower(raw_user_meta_data->>'username') = 'niska' LIMIT 1;
  END IF;

  IF target_user_id IS NULL THEN
    RAISE NOTICE 'No user found with username or email like ''niska''. Aborting admin assignment.';
    RETURN;
  END IF;

  SELECT COUNT(*) INTO profile_exists FROM public.profiles WHERE user_id = target_user_id;

  IF profile_exists = 0 THEN
    INSERT INTO public.profiles (id, user_id, username, created_at, updated_at, role_id)
    VALUES (gen_random_uuid(), target_user_id, 'niska', NOW(), NOW(), admin_role);
  ELSE
    UPDATE public.profiles SET role_id = admin_role, updated_at = NOW() WHERE user_id = target_user_id;
  END IF;

  RAISE NOTICE 'Assigned admin role to user_id %', target_user_id;
END;
$$;

-- End of script
