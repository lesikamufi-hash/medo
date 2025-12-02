# Migration script: Export old Supabase DB and import into new project
# Prerequisites: pg_dump and pg_restore must be in PATH (install PostgreSQL client tools)
# Usage:
#   1. Set your passwords in the script or pass as env vars
#   2. Run: .\supabase\scripts\migrate_db.ps1

# OLD PROJECT (source)
# Get from: Supabase Dashboard > Project Settings > Database > Connection string
$OLD_DB_URL = "postgresql://postgres:[OLD_PASSWORD]@db.lfmyjpnelfvpgdhfojwt.supabase.co:5432/postgres"

# NEW PROJECT (target)
# Get from: Supabase Dashboard > Project Settings > Database > Connection string
$NEW_DB_URL = "postgresql://postgres:[NEW_PASSWORD]@db.hwnpbduxbaegnvadujck.supabase.co:5432/postgres"

$DUMP_FILE = ".\supabase_migration_$(Get-Date -Format 'yyyyMMdd_HHmmss').dump"

Write-Host "==============================================="
Write-Host "Supabase DB Migration Script"
Write-Host "==============================================="
Write-Host ""
Write-Host "IMPORTANT: Before running this:"
Write-Host "1. Replace [OLD_PASSWORD] with your old project's DB password"
Write-Host "2. Replace [NEW_PASSWORD] with your new project's DB password"
Write-Host "3. Ensure pg_dump and pg_restore are installed and in PATH"
Write-Host "4. The new project should ideally be empty (restore will --clean)"
Write-Host ""

# Verify URLs are configured
if ($OLD_DB_URL -match '\[OLD_PASSWORD\]' -or $NEW_DB_URL -match '\[NEW_PASSWORD\]') {
  Write-Error "ERROR: Update OLD_PASSWORD and NEW_PASSWORD in this script before running!"
  exit 1
}

Write-Host "Checking if pg_dump and pg_restore are available..."
$pg_dump_check = Get-Command pg_dump -ErrorAction SilentlyContinue
$pg_restore_check = Get-Command pg_restore -ErrorAction SilentlyContinue

if (-not $pg_dump_check -or -not $pg_restore_check) {
  Write-Error "ERROR: pg_dump or pg_restore not found in PATH."
  Write-Host "Install PostgreSQL client tools and add them to your PATH."
  exit 1
}

Write-Host "✓ pg_dump and pg_restore found"
Write-Host ""

# Step 1: Export
Write-Host "STEP 1: Exporting old database to $DUMP_FILE ..."
Write-Host "Command: pg_dump --format=custom --no-owner --no-acl --compress=9 ..."
Write-Host ""

$env:PGPASSWORD = ($OLD_DB_URL -split 'postgres:')[1] -split '@' | Select-Object -First 1
try {
  & pg_dump --format=custom --no-owner --no-acl --compress=9 --dbname=$OLD_DB_URL -f $DUMP_FILE
  if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Export successful: $DUMP_FILE"
    $file_size = (Get-Item $DUMP_FILE).Length / 1MB
    Write-Host "  File size: $([Math]::Round($file_size, 2)) MB"
  } else {
    Write-Error "Export failed with exit code $LASTEXITCODE"
    exit 1
  }
} catch {
  Write-Error "Export error: $_"
  exit 1
}

Write-Host ""
Write-Host "STEP 2: Restoring into new database ..."
Write-Host "Command: pg_restore --clean --no-owner ..."
Write-Host ""

$env:PGPASSWORD = ($NEW_DB_URL -split 'postgres:')[1] -split '@' | Select-Object -First 1
try {
  & pg_restore --clean --no-owner --verbose --dbname=$NEW_DB_URL $DUMP_FILE
  if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Restore successful"
  } else {
    Write-Host "⚠ Restore completed with exit code $LASTEXITCODE (may be non-fatal, check output above)"
  }
} catch {
  Write-Error "Restore error: $_"
  exit 1
}

Write-Host ""
Write-Host "==============================================="
Write-Host "Migration Complete!"
Write-Host "==============================================="
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Verify data in new project: Supabase > Table Editor > profiles"
Write-Host "2. Update your app's env vars to point to new project:"
Write-Host "   VITE_SUPABASE_URL=https://hwnpbduxbaegnvadujck.supabase.co"
Write-Host "   VITE_SUPABASE_ANON_KEY=<new project's anon key>"
Write-Host "3. Deploy Edge Functions to new project (resolve-username-to-email)"
Write-Host "4. Test registration and login in your app"
Write-Host ""
Write-Host "Cleanup: You can delete $DUMP_FILE after verifying everything works"
Write-Host ""
