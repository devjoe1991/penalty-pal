import React from 'react';
import { Bot, ShieldCheck, Zap, BarChart, Check } from 'lucide-react';
import { PricingCarousel } from '@/components/marketing/PricingCarousel';

// I'm using inline SVGs for icons to keep this self-contained.
// In your actual project, you would import these from 'lucide-react'.
const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Bot {...props} />
);
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ShieldCheck {...props} />
);
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Zap {...props} />
);
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <BarChart {...props} />
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Check {...props} />
);

// Mock AI Chat Component for Hero Section
const MockAIChat = () => {
  return (
    <div className="mt-12 lg:mt-0 lg:ml-8 w-full max-w-md mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-amber-500/10">
      <div className="p-4 border-b border-slate-700">
        <p className="text-sm font-semibold text-slate-200">AI Appeal Assistant</p>
      </div>
      <div className="p-4 space-y-4 text-sm h-80 overflow-y-auto">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-amber-500/20 p-2 rounded-full"><BotIcon className="w-5 h-5 text-amber-400" /></div>
          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
            <p className="text-slate-300">Hello! I'm here to help you contest your fine. Please tell me the PCN number from your ticket.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-amber-600 rounded-lg p-3 max-w-[80%]">
            <p className="text-black font-medium">Hi, it's IX12345678.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-amber-500/20 p-2 rounded-full"><BotIcon className="w-5 h-5 text-amber-400" /></div>
          <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
            <p className="text-slate-300">Thank you. Now, in your own words, please tell me what happened. Were the signs unclear? Was there an emergency?</p>
          </div>
        </div>
         <div className="flex justify-end">
          <div className="bg-amber-600 rounded-lg p-3 max-w-[80%]">
            <p className="text-black font-medium">The parking bay markings were completely faded and there were no visible signs indicating it was a permit-only zone.</p>
          </div>
        </div>
      </div>
       <div className="p-4 border-t border-slate-700">
        <div className="w-full bg-slate-800 rounded-lg p-2 animate-pulse text-slate-500">Generating appeal...</div>
      </div>
    </div>
  );
};

// Main Export Component
export default function LandingPage() {
  const features = [
    {
      icon: <BotIcon className="w-8 h-8 text-amber-400" />,
      title: "AI-Powered Appeals",
      description: "Our AI analyzes thousands of successful cases and UK traffic law to craft the strongest possible appeal for your specific situation.",
    },
    {
      icon: <ZapIcon className="w-8 h-8 text-green-400" />,
      title: "Instant Draft Generation",
      description: "No more waiting or writer's block. Go from ticket to a professionally-written appeal draft in under 5 minutes.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-rose-400" />,
      title: "Expert-Level Compliance",
      description: "We focus on the technicalities and procedural errors that get fines cancelled. Contest with the confidence of an expert.",
    },
    {
        icon: <BarChartIcon className="w-8 h-8 text-sky-400" />,
        title: "Track Your Success",
        description: "Your personal dashboard tracks every appeal, its status, and your success rate, all tied to your vehicle registration.",
    }
  ];

  const steps = [
      {
          number: "01",
          title: "Tell Us The Details",
          description: "Snap a photo of your PCN or just tell our AI the details. We'll grab all the key information."
      },
      {
        number: "02",
        title: "Explain What Happened",
        description: "In a simple chat, tell our AI your side of the story. It will ask the right questions to build your case."
    },
    {
        number: "03",
        title: "Generate & Submit",
        description: "Receive a professionally drafted appeal. We give you the text and a direct link to the authority's appeal portal."
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Stop Paying Unfair Fines.
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              Received a PCN? Don't just pay it. PenaltyPal uses AI to find the winning legal argument and writes the perfect appeal for you. Turn your frustration into a successful challenge.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#pricing" className="bg-amber-500 text-black font-bold rounded-lg px-8 py-3 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                Contest My Fine Now
              </a>
              <a href="#features" className="bg-slate-800/50 border border-slate-700 text-slate-300 font-semibold rounded-lg px-8 py-3 hover:bg-slate-700 transition-all">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <MockAIChat />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-24 bg-slate-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">The AI Advantage in Your Corner</h2>
            <p className="mt-4 text-lg text-slate-400">
              PenaltyPal is more than a template generator. It's a smart system designed to maximize your chances of winning.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-slate-700/50 w-14 h-14 rounded-lg flex items-center justify-center">
                    {feature.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-24">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Win Your Appeal in 3 Simple Steps</h2>
                <p className="mt-4 text-lg text-slate-400">
                    We've simplified the entire process from start to finish.
                </p>
            </div>
            <div className="mt-16 relative">
                <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-slate-700/50 hidden md:block" aria-hidden="true"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-slate-800 border-2 border-amber-500/50 rounded-full mb-4 text-2xl font-bold text-amber-400">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                            <p className="mt-2 text-slate-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-24 bg-slate-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-400">Choose the plan that's right for you. Start for free, no credit card required.</p>
          </div>
          <div className="mt-16 flex justify-center">
            <PricingCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Ready to Reclaim Your Money?</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              It takes less than 5 minutes to start your first appeal. Join thousands of drivers who are fighting back against unfair fines.
            </p>
             <div className="mt-8">
              <a href="#pricing" className="bg-amber-500 text-black font-bold rounded-lg px-8 py-4 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 text-lg">
                Start My First Appeal for Free
              </a>
            </div>
         </div>
      </section>
    </div>
  );
}
