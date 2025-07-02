import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import BillingTabs from "@/components/dashboard/BillingTabs";

export default async function BillingPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch user's subscription info
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, status, credits")
    .eq("id", user.id)
    .single();

  const currentPlan = subscription?.plan ?? 'freemium';
  const currentCredits = subscription?.credits ?? 1;

  const plans = [
    {
      name: 'Freemium',
      price: '£0',
      description: 'Perfect for trying out PenaltyPal',
      credits: '1 Free Appeal',
      features: [
        '1 appeal generation',
        'Basic AI assistance',
        'PCN form filling',
        'Email support'
      ],
      limitations: [
        'Limited to 1 appeal',
        'No priority support',
        'No advanced features'
      ],
      current: currentPlan === 'freemium'
    },
    {
      name: 'Premium Individual',
      price: '£9.99',
      description: 'Unlimited appeals for individuals',
      credits: 'Unlimited Appeals',
      features: [
        'Unlimited appeal generations',
        'Advanced AI assistance',
        'PCN image processing',
        'Priority email support',
        'Appeal templates',
        'Success tracking'
      ],
      limitations: [],
      current: currentPlan === 'premium'
    },
    {
      name: 'Fleet Management',
      price: '£29.99',
      description: 'Perfect for businesses with multiple vehicles',
      credits: 'Unlimited Appeals',
      features: [
        'Everything in Premium',
        'Multi-vehicle management',
        'Team collaboration',
        'Advanced analytics',
        'Phone support',
        'Custom integrations'
      ],
      limitations: [],
      current: currentPlan === 'fleet'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and view billing information.
        </p>
      </div>

      {/* Current Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Your current plan and usage information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Plan</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={currentPlan === 'freemium' ? 'secondary' : 'default'}>
                  {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Credits Remaining</label>
              <p className="text-2xl font-bold mt-1">
                {currentPlan === 'freemium' ? currentCredits : '∞'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
              {plan.current && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge>Current Plan</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  <span className="text-2xl font-bold">{plan.price}</span>
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-primary">{plan.credits}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Features included:</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-muted-foreground">Limitations:</h4>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 text-red-500" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  {plan.current ? (
                    <Button disabled className="w-full">
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full" variant={plan.name === 'Freemium' ? 'outline' : 'default'}>
                      {plan.name === 'Freemium' ? 'Downgrade' : 'Upgrade to ' + plan.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing Information (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Payment method and billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Billing integration will be added in Phase 5.</p>
            <p className="text-sm mt-2">Contact support for any billing inquiries.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 