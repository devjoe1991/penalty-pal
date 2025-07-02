import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BillingManager from "@/components/dashboard/BillingManager";

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

      {/* Billing Manager Component */}
      <div>
        <BillingManager currentPlan={currentPlan} currentCredits={currentCredits} />
      </div>
    </div>
  );
} 