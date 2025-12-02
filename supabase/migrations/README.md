This folder contains SQL migrations and helper scripts for Supabase.

Files:
- 20251202_init_schema.sql
  - Creates `roles` and `profiles` tables (if they don't exist).
  - Adds correct foreign keys (`profiles.user_id` -> `auth.users(id)`, `profiles.role_id` -> `public.roles(id)`).
  - Creates indexes for `user_id` and case-insensitive `username` lookup.
  - Seeds `owner` and `admin` roles if missing.
  - Creates `handle_new_user` trigger: on new `auth.users` it upserts a `profiles` row using `raw_user_meta_data` fields: `username`, `first_name`, `last_name`, and `initial_role_id`.

How to apply
1) Open Supabase Dashboard → your project → SQL Editor → New Query.
2) Copy the entire contents of `20251202_init_schema.sql` and Run.

Or use the Supabase CLI:
1) Install and login: `supabase login`.
2) Deploy the SQL:
   supabase db query <  supabase/migrations/20251202_init_schema.sql --project-ref <your-project-ref>

Notes
- The migration uses `pgcrypto` for `gen_random_uuid()`; the script enables the extension if not present.
- The trigger uses `ON CONFLICT (user_id) DO UPDATE` so it won't create duplicate profiles for same auth user.
- If you have existing malformed constraints in `profiles`, the migration attempts to drop a likely-bad `profiles_id_fkey` first.

After applying
- Test by creating a new user via your app. Then run:
  SELECT * FROM public.profiles ORDER BY updated_at DESC LIMIT 5;
- If you need to deploy the Edge Function `resolve-username-to-email`, use the Supabase Functions tools (or the Dashboard Functions page).
