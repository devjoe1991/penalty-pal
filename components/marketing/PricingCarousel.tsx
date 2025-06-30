'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    buttonText: 'Get Started for Free',
    buttonLink: '/signup',
    isPopular: false,
    styles: {
      card: 'bg-slate-800/50 border-slate-700',
      button: 'bg-slate-700 hover:bg-slate-600',
      description: 'text-slate-400',
    }
  },
  {
    tier: 'Premium',
    description: 'For high-volume drivers.',
    price: '£7.99',
    priceSuffix: '/mo',
    features: [
      { text: '5 Appeal Credits', highlight: 'per month' },
      { text: 'Manage up to 5 Vehicles' },
      { text: 'All Pay-as-you-go features' },
      { text: 'Priority Support' },
    ],
    buttonText: 'Upgrade Now',
    buttonLink: '/signup',
    isPopular: true,
    styles: {
        card: 'bg-amber-900/20 border-amber-500 shadow-2xl shadow-amber-500/20',
        button: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
        description: 'text-amber-300',
    }
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
      { text: 'Discount on credit packs' },
    ],
    buttonText: 'Buy Credits',
    buttonLink: '/signup',
    isPopular: false,
    styles: {
        card: 'bg-sky-900/20 border-sky-700',
        button: 'bg-sky-600 hover:bg-sky-500',
        description: 'text-sky-300',
    }
  },
  {
    tier: 'Fleet',
    description: 'For businesses & professionals.',
    price: "Let's Talk",
    priceSuffix: '',
    features: [
      { text: 'Unlimited Vehicles' },
      { text: 'Custom Credit Pools' },
      { text: 'Advanced Fleet Dashboard' },
      { text: 'Dedicated Account Manager' },
    ],
    buttonText: 'Contact Sales',
    buttonLink: '#',
    isPopular: false,
    styles: {
        card: 'bg-slate-800/50 border-slate-700',
        button: 'bg-slate-700 hover:bg-slate-600',
        description: 'text-slate-400',
    }
  },
];

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => (
  <button
    className={`h-3 w-3 rounded-full mx-1 transition-colors ${
      selected ? 'bg-amber-400' : 'bg-slate-600'
    }`}
    type="button"
    onClick={onClick}
  />
);


export function PricingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
  })
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    emblaApi && emblaApi.scrollTo(index)
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial state
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);


  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden -ml-4" ref={emblaRef}>
        <div className="flex">
          {pricingPlans.map((plan, index) => (
            <div className="flex-[0_0_75%] min-w-0 ml-4" key={index}>
              <div className={cn("p-8 rounded-xl border flex flex-col h-full", plan.styles.card)}>
                {plan.isPopular && (
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-white">{plan.tier}</h3>
                        <span className="bg-amber-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</span>
                    </div>
                )}
                {!plan.isPopular && <h3 className="text-2xl font-bold text-white">{plan.tier}</h3>}
                
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
                <a href={plan.buttonLink} className={cn("mt-8 w-full text-center font-semibold rounded-lg px-6 py-3 transition-all", plan.styles.button)}>
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {pricingPlans.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
} 