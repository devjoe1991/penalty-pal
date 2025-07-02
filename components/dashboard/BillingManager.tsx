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
    credits_1_pack: 'price_1Pzzzzzzzzzzzzzz', // Your 1-credit pack price ID
    credits_3_pack: 'price_1Paaaaaaaaaaaaaa'  // Your 3-credit pack price ID
};

interface BillingManagerProps {
    currentPlan: string;
    currentCredits: number;
}

export default function BillingManager({ currentPlan, currentCredits }: BillingManagerProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const supabase = createClient();

    const handleCheckout = async (priceId: string, mode: 'subscription' | 'payment') => {
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
                    body: JSON.stringify({ priceId, mode }),
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
            tier: 'Freemium',
            description: 'A perfect introduction.',
            price: '£0',
            priceSuffix: '',
            features: [
                { text: '1 Free', highlight: 'Appeal Credit' },
                { text: 'Manage 1 Vehicle' },
                { text: 'Standard AI Analysis' },
                { text: 'Dashboard & Tracking' },
            ],
            buttonText: currentPlan === 'freemium' ? 'Current Plan' : 'Downgrade',
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
            description: 'For high-volume drivers.',
            price: '£7.99',
            priceSuffix: '/mo',
            features: [
                { text: '5 Appeal Credits', highlight: 'per month' },
                { text: 'Manage up to 5 Vehicles' },
                { text: 'PCN Image Scanning' },
                { text: 'Priority Support' },
            ],
            buttonText: currentPlan === 'premium' ? 'Current Plan' : 'Upgrade Now',
            isPopular: true,
            isCurrent: currentPlan === 'premium',
            styles: {
                card: 'bg-amber-900/20 border-amber-500 shadow-2xl shadow-amber-500/20',
                button: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
                description: 'text-amber-300',
            },
            action: () => handleCheckout(priceIds.premium_monthly, 'subscription')
        },
        {
            tier: 'Pay As You Go',
            description: 'For the occasional driver.',
            price: '£9.99',
            priceSuffix: '/credit',
            features: [
                { text: 'All Freemium features' },
                { text: 'Manage up to 2 Vehicles' },
                { text: 'Unlock', highlight: 'PCN Image Scanning' },
                { text: 'Credits never expire' },
            ],
            buttonText: 'Buy 1 Credit',
            isPopular: false,
            isCurrent: false,
            styles: {
                card: 'bg-sky-900/20 border-sky-700',
                button: 'bg-sky-600 hover:bg-sky-500',
                description: 'text-sky-300',
            },
            action: () => handleCheckout(priceIds.credits_1_pack, 'payment')
        },
    ];

    return (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
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
                        disabled={plan.isCurrent || loading === plan.tier}
                        className={cn(
                            "mt-8 w-full text-center font-semibold rounded-lg px-6 py-3 transition-all",
                            plan.styles.button,
                            (plan.isCurrent || loading === plan.tier) && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {loading === plan.tier ? 'Processing...' : plan.buttonText}
                    </button>
                </div>
            ))}

            {/* Credit Packs Section */}
            <div className="col-span-full mt-8">
                <h3 className="text-2xl font-bold text-white mb-6">Buy Additional Credits</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* 1 Credit Pack */}
                    <div className="p-6 rounded-xl border bg-sky-900/20 border-sky-700">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-bold text-white">1 Credit Pack</h4>
                            <span className="text-3xl font-extrabold text-white">£9.99</span>
                        </div>
                        <p className="text-sky-300 mb-4">Perfect for a single appeal</p>
                        <ul className="space-y-2 text-slate-300 mb-6">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-400" />
                                <span>1 AI-generated appeal</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-400" />
                                <span>Credit never expires</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => handleCheckout(priceIds.credits_1_pack, 'payment')}
                            disabled={loading === priceIds.credits_1_pack}
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-3 transition-all disabled:opacity-50"
                        >
                            {loading === priceIds.credits_1_pack ? 'Processing...' : 'Buy 1 Credit'}
                        </button>
                    </div>

                    {/* 3 Credit Pack */}
                    <div className="p-6 rounded-xl border bg-sky-900/20 border-sky-700 relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-green-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full">Best Value</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-bold text-white">3 Credit Pack</h4>
                            <span className="text-3xl font-extrabold text-white">£24.99</span>
                        </div>
                        <p className="text-sky-300 mb-4">Save £5 with this bundle</p>
                        <ul className="space-y-2 text-slate-300 mb-6">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-400" />
                                <span>3 AI-generated appeals</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-400" />
                                <span>Credits never expire</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-green-400" />
                                <span>Save £5 vs individual</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => handleCheckout(priceIds.credits_3_pack, 'payment')}
                            disabled={loading === priceIds.credits_3_pack}
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-3 transition-all disabled:opacity-50"
                        >
                            {loading === priceIds.credits_3_pack ? 'Processing...' : 'Buy 3 Credits'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 