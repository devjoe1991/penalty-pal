'use client'

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// IMPORTANT: Replace these with the actual Price IDs you saved from Stripe
const priceIds = {
    premium_monthly: 'price_xxxxxxxxxxxxxx', // Your monthly premium price ID
    premium_yearly: 'price_yyyyyyyyyyyyyy',  // Your yearly premium price ID
};

interface BillingManagerProps {
    currentPlan: string;
    currentCredits: number;
}

export default function BillingManager({ currentPlan, currentCredits }: BillingManagerProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const supabase = createClient();

    const handleCheckout = async (priceId: string) => {
        setLoading(priceId);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("Not authenticated");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({ priceId, mode: 'subscription' }),
                }
            );

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            // Redirect to Stripe Checkout
            window.location.href = data.url;

        } catch (error: any) {
            toast.error(error.message);
            setLoading(null);
        }
    };

    const pricingPlans = [
        {
            tier: 'Free Trial',
            description: 'Perfect introduction with no risk',
            price: '£0',
            priceSuffix: '',
            features: [
                { text: '1 Free', highlight: 'Appeal Credit' },
                { text: 'Manage 1 Vehicle' },
                { text: 'Standard AI Analysis' },
                { text: 'Full Dashboard Access' },
            ],
            buttonText: currentPlan === 'freemium' ? 'Current Plan' : 'Already Used',
            isPopular: false,
            isCurrent: currentPlan === 'freemium',
            styles: {
                card: 'bg-slate-800/50 border-slate-700',
                button: 'bg-slate-700 hover:bg-slate-600',
                description: 'text-slate-400',
            },
            action: null // No checkout needed for freemium
        },
        {
            tier: 'Premium',
            description: 'Complete solution for total peace of mind',
            price: '£7.99',
            priceSuffix: '/mo',
            features: [
                { text: 'Unlimited', highlight: 'Appeal Generations' },
                { text: 'Manage up to 5 Vehicles' },
                { text: 'PCN Image Scanning' },
                { text: 'Advanced AI Analysis' },
                { text: 'Priority Support' },
            ],
            buttonText: currentPlan === 'premium' ? 'Current Plan' : 'Upgrade Monthly',
            isPopular: true,
            isCurrent: currentPlan === 'premium',
            styles: {
                card: 'bg-amber-900/20 border-amber-500 shadow-2xl shadow-amber-500/20',
                button: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
                description: 'text-amber-300',
            },
            action: () => handleCheckout(priceIds.premium_monthly)
        },
    ];

    return (
        <div className="space-y-8">
            {/* Pricing Plans */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 max-w-4xl">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className={cn("p-8 rounded-xl border flex flex-col h-full", plan.styles.card)}>
                            {plan.isPopular && (
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-white">{plan.tier}</h3>
                                    <span className="bg-amber-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</span>
                                </div>
                            )}
                            {!plan.isPopular && <h3 className="text-2xl font-bold text-white">{plan.tier}</h3>}
                            
                            {plan.isCurrent && (
                                <div className="mt-2">
                                    <span className="bg-green-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full">Current Plan</span>
                                </div>
                            )}
                            
                            <p className={cn("mt-2", plan.styles.description)}>{plan.description}</p>
                            
                            <div className="mt-6">
                                <span className="text-4xl lg:text-5xl font-extrabold text-white">{plan.price}</span>
                                {plan.priceSuffix && <span className="text-xl font-medium text-slate-400">{plan.priceSuffix}</span>}
                            </div>
                            
                            <ul className="mt-8 space-y-4 text-slate-300 flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 mt-1 text-green-400 flex-shrink-0" />
                                        <span>{feature.text} {feature.highlight && <span className="font-bold text-white">{feature.highlight}</span>}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <button 
                                onClick={plan.action || undefined}
                                disabled={plan.isCurrent || loading === priceIds.premium_monthly}
                                className={cn(
                                    "mt-8 w-full text-center font-semibold rounded-lg px-6 py-3 transition-all",
                                    plan.styles.button,
                                    (plan.isCurrent || loading === priceIds.premium_monthly) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {loading === priceIds.premium_monthly ? 'Processing...' : plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Annual Savings Option */}
            {currentPlan !== 'premium' && (
                <div className="max-w-4xl">
                    <div className="p-8 rounded-xl border bg-emerald-900/20 border-emerald-500 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-emerald-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full">Best Value</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Save with Annual Billing</h3>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className="text-4xl font-extrabold text-white">£79.99</span>
                                <span className="text-xl text-slate-400">/year</span>
                                <span className="bg-emerald-500 text-black text-sm font-bold px-2 py-1 rounded">Save £15.89</span>
                            </div>
                            <p className="text-emerald-300 mb-6">Get 2 months free with annual billing</p>
                            <ul className="space-y-2 text-slate-300 mb-8 max-w-md mx-auto">
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="w-4 h-4 text-green-400" />
                                    <span>All Premium features included</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="w-4 h-4 text-green-400" />
                                    <span>Equivalent to £6.66/month</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="w-4 h-4 text-green-400" />
                                    <span>Cancel anytime</span>
                                </li>
                            </ul>
                            <button 
                                onClick={() => handleCheckout(priceIds.premium_yearly)}
                                disabled={loading === priceIds.premium_yearly}
                                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg px-8 py-3 transition-all disabled:opacity-50"
                            >
                                {loading === priceIds.premium_yearly ? 'Processing...' : 'Upgrade Yearly & Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Call-to-Action for Free Trial Users */}
            {currentPlan === 'freemium' && currentCredits === 0 && (
                <div className="max-w-4xl">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30">
                        <div className="text-center">
                            <h4 className="text-xl font-bold text-white mb-2">🎉 You've experienced the power of PenaltyPal!</h4>
                            <p className="text-amber-200 mb-4">
                                Ready to get unlimited appeals for less than the cost of a single fine?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button 
                                    onClick={() => handleCheckout(priceIds.premium_monthly)}
                                    disabled={loading === priceIds.premium_monthly}
                                    className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg px-6 py-3 transition-all disabled:opacity-50"
                                >
                                    {loading === priceIds.premium_monthly ? 'Processing...' : 'Start Premium Trial'}
                                </button>
                                <button 
                                    onClick={() => handleCheckout(priceIds.premium_yearly)}
                                    disabled={loading === priceIds.premium_yearly}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg px-6 py-3 transition-all disabled:opacity-50"
                                >
                                    {loading === priceIds.premium_yearly ? 'Processing...' : 'Save with Annual'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 