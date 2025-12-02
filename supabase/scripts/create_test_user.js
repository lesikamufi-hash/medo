/*
Create a test user in Supabase (server-side) with user_metadata fields.
Usage:
  - Set environment variables:
      SUPABASE_URL=https://xxxxx.supabase.co
      SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  - Run:
      node supabase/scripts/create_test_user.js --email test@example.com --password Secret123! --username testuser --firstName Test --lastName User

Notes:
- This script uses the Admin API (service role key). Keep the key secret.
- It will create a user and populate user_metadata so the trigger can read raw_user_meta_data and create a profile.
*/

const { createClient } = require('@supabase/supabase-js');
const argv = require('minimist')(process.argv.slice(2));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment variables.');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
  try {
    const email = argv.email || argv.e;
    const password = argv.password || argv.p;
    const username = argv.username || argv.u;
    const firstName = argv.firstName || argv.firstName || argv.f || '';
    const lastName = argv.lastName || argv.l || '';

    if (!email || !password || !username) {
      console.error('Missing required args: --email, --password, --username');
      process.exit(1);
    }

    const userMetadata = {
      username: username.toLowerCase(),
      first_name: firstName,
      last_name: lastName,
      initial_role_id: null // optional: you can set a role UUID here
    };

    const res = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: userMetadata,
    });

    if (res.error) {
      console.error('Error creating user:', res.error);
      process.exit(1);
    }

    console.log('Created user:', res.user);
    console.log('Wait a couple seconds and then check the profiles table in Supabase to confirm the trigger created the profile.');
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
