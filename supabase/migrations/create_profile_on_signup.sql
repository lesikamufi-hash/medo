-- Trigger to automatically create a profile when a new user signs up
-- This trigger extracts custom user metadata (username, first_name, last_name, initial_role_id)
-- from auth.users and saves them to the profiles table

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  role_id UUID;
BEGIN
  -- Extract the initial_role_id from raw_user_meta_data, default to owner role if not provided
  role_id := COALESCE(
    (NEW.raw_user_meta_data->>'initial_role_id')::UUID,
    (SELECT id FROM public.roles WHERE name = 'owner' LIMIT 1)
  );

  -- Insert the new profile with user data
  INSERT INTO public.profiles (
    id,
    user_id,
    username,
    first_name,
    last_name,
    role_id,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    role_id,
    NOW()
  );

  RETURN NEW;
EXCEPTION WHEN others THEN
  -- Log the error but don't fail the trigger
  RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Drop the trigger if it already exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
