// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from "https://deno.land/x/openai@v4.24.1/mod.ts";

console.log("Edge Function 'appeal-generation-flow' is up and running!");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize the OpenAI client with the API key from Supabase secrets
const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

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

    // --- AI PROMPT CONSTRUCTION ---
    const systemPrompt = `You are the "PenaltyPal Expert," a specialist AI assistant with deep knowledge of UK traffic and parking law, including the Traffic Management Act 2004. Your goal is to generate a professional, legally-sound, and compelling appeal letter based on the user's information. The letter must be formal, respectful, and addressed to the relevant issuing authority. Your final output MUST ONLY be the generated appeal letter itself, without any conversational text.`;

    const userPrompt = `
      Please generate a PCN appeal letter with the following details:
      - Vehicle Registration: ${requestData.pcnDetails.vehicleReg}
      - PCN Number: ${requestData.pcnDetails.pcnNumber}
      - Date of Contravention: ${requestData.pcnDetails.contraventionDate}
      - Issuing Authority: ${requestData.pcnDetails.issuingAuthority}
      - Stated Contravention: ${requestData.pcnDetails.contraventionReason}

      Here is my side of the story:
      "${requestData.userStory}"

      Based on these details, please write the strongest possible appeal letter.
    `;

    // --- AI STREAMING CALL ---
    const stream = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        stream: true,
    });

    // --- CREDIT DECREMENT LOGIC ---
    // Only decrement credits for freemium users, premium users have unlimited appeals
    if (subscription.plan === 'freemium') {
        const decrementCredits = async () => {
            const { error } = await supabaseClient.rpc('decrement_credits', { user_id_in: user.id });
            if (error) {
                console.error('Error decrementing credits for user:', user.id, error);
            } else {
                console.log('Successfully decremented credits for freemium user:', user.id);
            }
        };
        
        // Decrement credits in the background for freemium users
        decrementCredits();
    } else {
        console.log('Premium user - no credit decrement needed:', user.id);
    }

    // Return the stream to the client
    return new Response(stream.toReadableStream(), {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

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
