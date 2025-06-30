// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Edge Function 'appeal-generation-flow' is up and running!");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Create a Supabase client with the Auth context of the user.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 2. Get the user from the session.
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      console.error('User not found:', userError);
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }
    
    // 3. Get the user's subscription and credit details.
    const { data: subscription, error: subError } = await supabaseClient
      .from('subscriptions')
      .select('plan, credits')
      .single()

    if (subError || !subscription) {
      console.error('Subscription not found for user:', user.id, subError);
      return new Response(JSON.stringify({ error: 'Could not find user subscription.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    // 4. Implement the Freemium limit check.
    if (subscription.plan === 'freemium' && subscription.credits <= 0) {
      console.log('Freemium user has no credits remaining:', user.id);
      return new Response(JSON.stringify({ error: 'You have used your free appeal. Please upgrade to continue.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 402, // 402 Payment Required is a fitting status code
      })
    }

    const requestData = await req.json()
    console.log("User authorized. Received data:", requestData);
    
    // Placeholder for next steps (AI logic)
    // We have the user's plan and know they have credits.
    // Next we will call the LLM and then decrement their credits.

    return new Response(JSON.stringify({ message: "User is authorized and has credits. AI logic pending." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/appeal-generation-flow' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
