# Quick setup guide to update your app to use the new Supabase project

Write-Host "Supabase Project Migration - Quick Setup"
Write-Host "=========================================="
Write-Host ""

$NEW_PROJECT_URL = "https://hwnpbduxbaegnvadujck.supabase.co"
$OLD_PROJECT_URL = "https://lfmyjpnelfvpgdhfojwt.supabase.co"

Write-Host "1. Get your new project's anon key:"
Write-Host "   - Go to Supabase Dashboard > new project > Settings > API"
Write-Host "   - Copy the 'anon' public key"
Write-Host ""

Write-Host "2. Create .env.local at the root of your project (c:\Users\ZEDRUSE\Desktop\SITE FUTICOOP\Futicoop\.env.local):"
Write-Host ""
Write-Host "   VITE_SUPABASE_URL=$NEW_PROJECT_URL"
Write-Host "   VITE_SUPABASE_ANON_KEY=<paste your new anon key here>"
Write-Host ""

Write-Host "3. Restart your dev server:"
Write-Host "   - Kill current pnpm dev (Ctrl+C)"
Write-Host "   - Run: pnpm dev"
Write-Host ""

Write-Host "4. Deploy Edge Function to new project:"
Write-Host "   - Install supabase CLI if not already: npm i -g @supabase/supabase-cli"
Write-Host "   - Login: supabase login"
Write-Host "   - Get new project ref from: Supabase Dashboard > Settings > General > Project Reference"
Write-Host "   - Deploy: supabase functions deploy resolve-username-to-email --project-ref hwnpbduxbaegnvadujck"
Write-Host ""

Write-Host "5. Test:"
Write-Host "   - Go to http://localhost:8080/owner/register"
Write-Host "   - Create a new account"
Write-Host "   - Verify it appears in new project: Table Editor > profiles"
Write-Host "   - Go to http://localhost:8080/owner/login"
Write-Host "   - Login with username or email"
Write-Host ""

Write-Host "Done! Your app should now use the new Supabase project."
Write-Host ""
