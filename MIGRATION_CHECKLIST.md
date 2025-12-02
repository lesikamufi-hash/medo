# Step-by-step migration checklist

## Prerequisites
- [ ] PostgreSQL client tools installed (`pg_dump`, `pg_restore`)
- [ ] Access to old Supabase project (connection string with password)
- [ ] Access to new Supabase project (connection string with password)
- [ ] New project created and accessible

## Step 1: Get Connection Strings
- [ ] Old project connection string
  - Supabase Dashboard (old project) > Settings > Database > Connection string (URI)
  - Format: `postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres`

- [ ] New project connection string
  - Supabase Dashboard (new project) > Settings > Database > Connection string (URI)
  - Format: `postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres`

## Step 2: Export & Import Database
- [ ] Edit `supabase/scripts/migrate_db.ps1`:
  - Replace `[OLD_PASSWORD]` with old project DB password
  - Replace `[NEW_PASSWORD]` with new project DB password
  - Keep the connection URLs as-is (they're already set for your projects)

- [ ] Run the migration script from PowerShell:
  ```powershell
  cd "C:\Users\ZEDRUSE\Desktop\SITE FUTICOOP\Futicoop"
  .\supabase\scripts\migrate_db.ps1
  ```

- [ ] Verify dump succeeded (check file size > 0)
- [ ] Verify restore succeeded (no fatal errors)

## Step 3: Deploy Migration SQL (if not already in dump)
- [ ] Open new project in Supabase SQL Editor
- [ ] Run `supabase/migrations/20251202_init_schema.sql` to ensure triggers/constraints are correct
- [ ] Verify no errors

## Step 4: Update App Configuration
- [ ] Get new project's anon key from Dashboard > Settings > API > anon public key
- [ ] Create or edit `.env.local` in project root:
  ```
  VITE_SUPABASE_URL=https://hwnpbduxbaegnvadujck.supabase.co
  VITE_SUPABASE_ANON_KEY=<your new anon key>
  ```

- [ ] Restart dev server: `pnpm dev`

## Step 5: Deploy Edge Function
- [ ] Install supabase CLI: `npm i -g @supabase/supabase-cli`
- [ ] Login: `supabase login`
- [ ] Get new project ref from Dashboard > Settings > General
- [ ] Deploy function:
  ```powershell
  supabase functions deploy resolve-username-to-email --project-ref hwnpbduxbaegnvadujck
  ```

- [ ] Verify no errors

## Step 6: Test
- [ ] Go to http://localhost:8080/owner/register
- [ ] Register a new owner with username
- [ ] Check new project in Table Editor > profiles (should see new row)
- [ ] Go to http://localhost:8080/owner/login
- [ ] Login with username and password
- [ ] Should redirect to /owner/dashboard

## Step 7: Clean Up
- [ ] Delete dump file: `supabase_migration_*.dump`
- [ ] (Optional) Decommission old Supabase project if satisfied with migration

## Notes
- Dump file is created with compression level 9 (smaller file size)
- Restore uses `--clean` (drops objects before creating new ones)
- If restore has warnings, they're often non-fatal (check output for critical errors)
- If profiles table has issues, re-run `20251202_init_schema.sql` on new project
