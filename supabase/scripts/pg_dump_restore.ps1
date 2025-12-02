<#
PowerShell helper to dump a Postgres DB and restore into another.
Prerequisites:
- Install PostgreSQL client tools (pg_dump and pg_restore) and make sure they're in PATH.
- Get full connection strings for source and target (Supabase provides them in Project > Settings > Database > Connection string).

Usage example (PowerShell):
  $env:PGPASSWORD = "source_db_password"
  .\supabase\scripts\pg_dump_restore.ps1 -SourceConn "postgres://source_user@source_host:5432/postgres" -DumpFile ".\dumpfile.dump"
  # then restore
  $env:PGPASSWORD = "target_db_password"
  .\supabase\scripts\pg_dump_restore.ps1 -Restore -DumpFile ".\dumpfile.dump" -TargetConn "postgres://target_user@target_host:5432/postgres"

Be careful: restoring a full dump can overwrite existing objects. Prefer to restore into a fresh project or use --schema-only / --table flags to limit restore.
#>

param(
  [string]$SourceConn,
  [string]$TargetConn,
  [string]$DumpFile = "./dumpfile.dump",
  [switch]$Restore
)

function Run-Command($cmd) {
  Write-Host ">" $cmd
  $proc = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -Command $cmd" -NoNewWindow -Wait -PassThru
  if ($proc.ExitCode -ne 0) { throw "Command failed with exit code $($proc.ExitCode)" }
}

try {
  if (-not $Restore) {
    if (-not $SourceConn) { throw "SourceConn required for dump mode" }
    Write-Host "Dumping source DB to $DumpFile ..."
    # pg_dump command: custom format, no owner, no ACL to be compatible with Supabase restore
    $cmd = "pg_dump --format=custom --no-owner --no-acl --dbname=\"$SourceConn\" -f \"$DumpFile\""
    Run-Command $cmd
    Write-Host "Dump completed: $DumpFile"
  } else {
    if (-not $TargetConn) { throw "TargetConn required for restore mode" }
    if (-not (Test-Path $DumpFile)) { throw "Dump file not found: $DumpFile" }
    Write-Host "Restoring $DumpFile into target DB ..."
    # Restore command: --clean to drop objects before creating; --no-owner to avoid owner changes
    $cmd = "pg_restore --clean --no-owner --dbname=\"$TargetConn\" \"$DumpFile\""
    Run-Command $cmd
    Write-Host "Restore completed into target DB"
  }
} catch {
  Write-Error $_.Exception.Message
  exit 1
}
