'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface BillingTabsProps {
  currentPlan: string;
  currentCredits: number;
}

export default function BillingTabs({ currentPlan, currentCredits }: BillingTabsProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("plans");

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'topup') {
      setActiveTab('topup');
    }
  }, [searchParams]);

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

  const creditPackages = [
    {
      name: '5 Credits',
      price: '£4.99',
      credits: 5,
      description: 'Perfect for a few more appeals',
      pricePerCredit: '£0.99',
      popular: false
    },
    {
      name: '10 Credits',
      price: '£8.99',
      credits: 10,
      description: 'Great value for regular users',
      pricePerCredit: '£0.89',
      popular: true
    },
    {
      name: '25 Credits',
      price: '£19.99',
      credits: 25,
      description: 'Best value for heavy usage',
      pricePerCredit: '£0.79',
      popular: false
    }
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        <TabsTrigger value="topup">Buy Credits</TabsTrigger>
      </TabsList>
      
      <TabsContent value="plans" className="space-y-6">
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
      </TabsContent>

      <TabsContent value="topup" className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Buy Additional Credits</h2>
          <p className="text-muted-foreground mb-6">
            Purchase additional credits to use with your Freemium plan. Credits never expire!
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {creditPackages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span>{pkg.name}</span>
                    </div>
                    <span className="text-2xl font-bold">{pkg.price}</span>
                  </CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-center">{pkg.credits}</p>
                    <p className="text-center text-muted-foreground">Credits</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {pkg.pricePerCredit} per credit
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">What you get:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{pkg.credits} AI-generated appeals</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Credits never expire</span>
                      </li>
                      <li className="flex items-center space-x-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Use anytime with Freemium plan</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                      Buy {pkg.credits} Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">💡 Tip: Consider upgrading to Premium!</h4>
            <p className="text-sm text-muted-foreground">
              If you need more than 10 appeals, our Premium Individual plan (£9.99/month) gives you unlimited appeals 
              plus advanced features like PCN image processing and priority support.
            </p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab('plans')}>
              View Premium Plans
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
} 