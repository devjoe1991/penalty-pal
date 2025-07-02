// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Stripe } from '../_shared/stripe.ts'

console.log("Hello from Functions!")

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const signingSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET') as string;

// Create a Supabase admin client to bypass RLS for server-to-server updates
const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Use the Service Role Key for admin rights
);

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, signingSecret, undefined, Stripe.createSubtleCryptoProvider());
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(err.message, { status: 400 });
  }

  try {
    const session = event.data.object as any;
    const customerId = session.customer;

    switch (event.type) {
        case 'checkout.session.completed':
            // For one-time payments (credit packs)
            if (session.mode === 'payment') {
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                const priceId = lineItems.data[0].price?.id;
                let creditsToAdd = 0;

                // IMPORTANT: Use the Price IDs you saved in the previous task
                if (priceId === 'price_1Pzzzzzzzzzzzzzz') creditsToAdd = 1; // Replace with your 1-credit pack Price ID
                if (priceId === 'price_1Paaaaaaaaaaaaaa') creditsToAdd = 3; // Replace with your 3-credit pack Price ID
                
                if (creditsToAdd > 0) {
                    const { data: sub } = await supabaseAdmin.from('subscriptions').select('id, credits').eq('stripe_customer_id', customerId).single();
                    if (sub) {
                       await supabaseAdmin.from('subscriptions').update({ credits: sub.credits + creditsToAdd }).eq('id', sub.id);
                    }
                }
            }
            // For subscriptions, the 'invoice.paid' event is more reliable for updates.
            break;

        case 'invoice.paid':
            // For new subscriptions or renewals
            const subscriptionDetails = await stripe.subscriptions.retrieve(session.subscription);
            
            await supabaseAdmin
                .from('subscriptions')
                .update({
                    plan: 'premium', // Hardcode to premium as it's our only subscription
                    status: 'active',
                    credits: 5, // Reset credits on renewal
                    current_period_end: new Date(subscriptionDetails.current_period_end * 1000).toISOString(),
                    stripe_subscription_id: subscriptionDetails.id
                })
                .eq('stripe_customer_id', customerId);
            break;

        case 'customer.subscription.deleted':
            // Handle cancellations at the end of the billing period
             await supabaseAdmin
                .from('subscriptions')
                .update({ status: 'canceled', plan: 'freemium' })
                .eq('stripe_customer_id', customerId);
            break;
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (err) {
    console.error("Error processing webhook event:", err.message);
    return new Response(err.message, { status: 400 });
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
