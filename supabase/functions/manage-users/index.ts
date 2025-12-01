import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No Authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  )

  let user;
  try {
    const { data: { user: authUser }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !authUser) {
      throw new Error(userError?.message || 'User not found')
    }
    user = authUser
  } catch (e: any) {
    return new Response(JSON.stringify({ error: `Unauthorized: ${e.message}` }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Check if the authenticated user has the 'admin' role
  const { data: profile, error: profileError } = await supabaseClient
    .from('profiles')
    .select('role:roles(name)')
    .eq('id', user.id)
    .single()

  if (profileError || profile?.role?.name !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden: User does not have admin role' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Create a Supabase client with the service role key for admin operations
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const { pathname } = new URL(req.url)
    const pathSegments = pathname.split('/').filter(Boolean)

    if (req.method === 'GET' && pathSegments.includes('manage-users')) {
      // List all users with their roles
      const { data: profiles, error } = await supabaseAdmin
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          username, -- Include username
          role:roles(name)
        `)

      if (error) throw error

      // Also fetch emails from auth.users (requires service role)
      const { data: authUsers, error: authUsersError } = await supabaseAdmin.auth.admin.listUsers()
      if (authUsersError) throw authUsersError

      const usersWithEmails = profiles.map(profile => {
        const authUser = authUsers.users.find(au => au.id === profile.id)
        return {
          ...profile,
          email: authUser?.email,
          created_at: authUser?.created_at,
        }
      })

      return new Response(JSON.stringify(usersWithEmails), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const body = await req.json()

    if (req.method === 'POST' && pathSegments.includes('role')) {
      const { userId, roleName } = body

      const { data: roleData, error: roleError } = await supabaseAdmin
        .from('roles')
        .select('id')
        .eq('name', roleName)
        .single()

      if (roleError || !roleData) throw new Error(`Role '${roleName}' not found.`)

      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ role_id: roleData.id })
        .eq('id', userId)

      if (error) throw error

      return new Response(JSON.stringify({ message: `User role updated to ${roleName}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if (req.method === 'DELETE' && pathSegments.includes('manage-users') && pathSegments.length === 4) {
      const userIdToDelete = pathSegments[3]

      const { error } = await supabaseAdmin.auth.admin.deleteUser(userIdToDelete)

      if (error) throw error

      return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})